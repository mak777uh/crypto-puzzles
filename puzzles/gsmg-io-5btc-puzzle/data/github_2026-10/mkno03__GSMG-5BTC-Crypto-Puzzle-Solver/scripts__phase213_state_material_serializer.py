#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict, List, Set, Tuple

PHASE_NAME = "phase213_state_material_serializer"
DEFAULT_INPUT = "phase212_template_state_expander_results.json"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Serialize concrete phase212 template states into downstream-ready material packs."
    )
    p.add_argument("--input", type=str, default=DEFAULT_INPUT)
    p.add_argument("--top-states", type=int, default=6)
    p.add_argument("--save-json", action="store_true")
    p.add_argument("--save-txt", action="store_true")
    return p.parse_args()


def load_json(path: str) -> Dict[str, Any]:
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"File not found: {p}")
    return json.loads(p.read_text(encoding="utf-8"))


def uniq_keep_order(items: List[str]) -> List[str]:
    seen = set()
    out = []
    for x in items:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out


def detect_template_order(state_row: Dict[str, Any], locked_order: List[str]) -> List[str]:
    name = str(state_row.get("template_name", ""))
    if name == "identity":
        return list(locked_order)
    if name == "swap_matrixsumlist_enter":
        return ["matrixsumlist", "enter", "yourlastcommand", "fourforone"]
    if name == "chain_m_to_f_to_e_to_m":
        return ["matrixsumlist", "fourforone", "enter", "yourlastcommand"]
    if name == "chain_m_to_e_to_f_to_m":
        return ["matrixsumlist", "enter", "fourforone", "yourlastcommand"]
    if name == "h_island_injection_to_fourforone":
        return ["yourlastcommand", "fourforone", "enter", "matrixsumlist"]
    if name == "h_island_injection_to_enter":
        return ["yourlastcommand", "enter", "fourforone", "matrixsumlist"]
    return list(locked_order)


def trace_token_order(state_row: Dict[str, Any], locked_order: List[str]) -> List[str]:
    tokens: List[str] = []
    for op in state_row.get("applied_ops", []):
        src = op.get("src")
        dst = op.get("dst")
        if src is not None:
            tokens.append(str(src))
        if dst is not None:
            tokens.append(str(dst))
    tokens.extend(locked_order)
    return uniq_keep_order(tokens)


def slot_word_string(words: List[str], intra_sep: str) -> str:
    return intra_sep.join(words)


def flatten_state(
    final_state: Dict[str, List[str]],
    token_order: List[str],
    intra_sep: str,
    inter_sep: str,
) -> str:
    pieces = []
    for token in token_order:
        words = final_state.get(token, [])
        if words:
            pieces.append(intra_sep.join(words))
    return inter_sep.join(pieces)


def flatten_state_with_tokens(
    final_state: Dict[str, List[str]],
    token_order: List[str],
    intra_sep: str,
    inter_sep: str,
    kv_sep: str = "=",
) -> str:
    pieces = []
    for token in token_order:
        words = final_state.get(token, [])
        joined = intra_sep.join(words) if words else "-"
        pieces.append(f"{token}{kv_sep}{joined}")
    return inter_sep.join(pieces)


def build_orders(state_row: Dict[str, Any], locked_order: List[str]) -> Dict[str, List[str]]:
    nonempty_alpha = sorted([tok for tok, words in state_row["final_state"].items() if words])
    command_first = uniq_keep_order(["yourlastcommand", "enter", "matrixsumlist", "fourforone"] + locked_order)
    return {
        "locked_order": list(locked_order),
        "template_order": detect_template_order(state_row, locked_order),
        "trace_order": trace_token_order(state_row, locked_order),
        "command_first_order": command_first,
        "alpha_nonempty_order": nonempty_alpha,
    }


def build_serialization_bundle(state_row: Dict[str, Any], locked_order: List[str]) -> Dict[str, Any]:
    final_state = state_row["final_state"]
    orders = build_orders(state_row, locked_order)

    slot_strings = {
        token: {
            "space_join": slot_word_string(final_state.get(token, []), " "),
            "pipe_join": slot_word_string(final_state.get(token, []), "|"),
            "concat": slot_word_string(final_state.get(token, []), ""),
        }
        for token in locked_order
    }

    serializations: Dict[str, Dict[str, str]] = {}
    for order_name, order in orders.items():
        serializations[order_name] = {
            "space_words": flatten_state(final_state, order, " ", " "),
            "pipe_words": flatten_state(final_state, order, "|", " || "),
            "concat_words": flatten_state(final_state, order, "", ""),
            "token_equals_pipe": flatten_state_with_tokens(final_state, order, "|", " ; "),
            "token_equals_space": flatten_state_with_tokens(final_state, order, " ", " ; "),
        }

    move_strings = []
    for op in state_row.get("applied_ops", []):
        src = op.get("src")
        dst = op.get("dst")
        word = op.get("word")
        if src is None and dst is not None:
            move_strings.append(f"introduce:{word}->{dst}")
        elif src is not None and dst is None:
            move_strings.append(f"drop:{word}@{src}")
        else:
            move_strings.append(f"move:{word}:{src}->{dst}")

    token_multiset_signature = []
    for token in locked_order:
        words = final_state.get(token, [])
        token_multiset_signature.append(f"{token}[{','.join(words)}]")

    return {
        "template_name": state_row["template_name"],
        "support_weight": state_row["support_weight"],
        "exemplar_source_text": state_row["exemplar_source_text"],
        "orders": orders,
        "slot_strings": slot_strings,
        "serializations": serializations,
        "move_strings": move_strings,
        "token_multiset_signature": " ; ".join(token_multiset_signature),
    }


def select_active_probe_packs(
    bundles: List[Dict[str, Any]],
) -> List[Dict[str, Any]]:
    selected = []
    wanted = {
        "identity",
        "swap_matrixsumlist_enter",
        "chain_m_to_f_to_e_to_m",
        "chain_m_to_e_to_f_to_m",
        "h_island_injection_to_fourforone",
        "h_island_injection_to_enter",
    }
    for row in bundles:
        if row["template_name"] in wanted:
            selected.append(row)
    selected.sort(key=lambda r: (-float(r["support_weight"]), r["template_name"]))
    return selected


def build_report(
    locked_mapping: Dict[str, str],
    locked_order: List[str],
    bundles: List[Dict[str, Any]],
    active: List[Dict[str, Any]],
) -> str:
    lines: List[str] = []
    lines.append(PHASE_NAME)
    lines.append("")
    lines.append("LOCKED MAPPING")
    for token in locked_order:
        lines.append(f"- {token:16s} {locked_mapping[token]}")
    lines.append("")
    lines.append("ACTIVE PROBE PACKS")
    for row in active:
        lines.append(
            f"- {row['template_name']:32s} support={row['support_weight']:.6f} exemplar={row['exemplar_source_text']}"
        )
        lines.append(f"  token_multiset_signature : {row['token_multiset_signature']}")
        lines.append(f"  move_strings             : {row['move_strings'] if row['move_strings'] else '-'}")
        for order_name, order in row["orders"].items():
            lines.append(f"  {order_name:24s}: {order}")
            ser = row["serializations"][order_name]
            lines.append(f"    space_words      : {ser['space_words']}")
            lines.append(f"    pipe_words       : {ser['pipe_words']}")
            lines.append(f"    concat_words     : {ser['concat_words']}")
            lines.append(f"    token_equals_pipe: {ser['token_equals_pipe']}")
        lines.append("")

    lines.append("ALL TEMPLATE BUNDLES")
    for row in bundles:
        lines.append(
            f"- {row['template_name']:32s} support={row['support_weight']:.6f}"
        )
        lines.append(f"  signature : {row['token_multiset_signature']}")
    lines.append("")
    lines.append("WORKING READ")
    lines.append("- phase212 gave exact post-template states; this phase turns each state into reusable string/material serializations.")
    lines.append("- identity, swap, and the main chain now each have ready-to-use word-only and token-tagged probe strings.")
    lines.append("- h_island branches are serialized too, but should stay separate from clean-core runs.")
    return "\n".join(lines)


def main() -> None:
    args = parse_args()
    payload = load_json(args.input)

    locked_mapping = payload.get("locked_mapping", {})
    template_states = payload.get("template_states", [])
    if not isinstance(locked_mapping, dict) or not locked_mapping:
        raise ValueError("Missing locked_mapping")
    if not isinstance(template_states, list) or not template_states:
        raise ValueError("Missing template_states")

    locked_order = list(locked_mapping.keys())
    bundles = []
    for state_row in template_states[: args.top_states]:
        bundles.append(build_serialization_bundle(state_row, locked_order))
    bundles.sort(key=lambda r: (-float(r["support_weight"]), r["template_name"]))
    active = select_active_probe_packs(bundles)

    result = {
        "phase_name": PHASE_NAME,
        "locked_mapping": locked_mapping,
        "locked_order": locked_order,
        "serialization_bundles": bundles,
        "active_probe_packs": active,
    }

    report = build_report(
        locked_mapping=locked_mapping,
        locked_order=locked_order,
        bundles=bundles,
        active=active,
    )
    print(report)

    if args.save_json:
        out_json = Path(f"{PHASE_NAME}_results.json")
        out_json.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"\nsaved: {out_json}")

    if args.save_txt:
        out_txt = Path(f"{PHASE_NAME}_report.txt")
        out_txt.write_text(report, encoding="utf-8")
        print(f"saved: {out_txt}")


if __name__ == "__main__":
    main()