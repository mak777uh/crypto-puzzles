#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple

PHASE_NAME = "phase214_probe_combo_catalog"
DEFAULT_INPUT = "phase213_state_material_serializer_results.json"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Build a ranked downstream probe-string catalog from phase213 serialization bundles."
    )
    p.add_argument("--input", type=str, default=DEFAULT_INPUT)
    p.add_argument("--max-per-template", type=int, default=20)
    p.add_argument("--save-json", action="store_true")
    p.add_argument("--save-txt", action="store_true")
    return p.parse_args()


def load_json(path: str) -> Dict[str, Any]:
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"File not found: {p}")
    return json.loads(p.read_text(encoding="utf-8"))


def safe_float(x: Any) -> float:
    try:
        return float(x)
    except Exception:
        return 0.0


def choose_template_bucket(template_name: str) -> str:
    if template_name == "identity":
        return "clean_baseline"
    if template_name == "swap_matrixsumlist_enter":
        return "clean_perturbation"
    if template_name in {"chain_m_to_f_to_e_to_m", "chain_m_to_e_to_f_to_m"}:
        return "rotator_chain"
    if template_name.startswith("h_island_injection"):
        return "h_island_branch"
    return "other"


def serialization_priority(serialization_name: str) -> int:
    order = {
        "token_equals_pipe": 0,
        "token_equals_space": 1,
        "pipe_words": 2,
        "space_words": 3,
        "concat_words": 4,
    }
    return order.get(serialization_name, 99)


def order_priority(order_name: str) -> int:
    order = {
        "locked_order": 0,
        "template_order": 1,
        "trace_order": 2,
        "command_first_order": 3,
        "alpha_nonempty_order": 4,
    }
    return order.get(order_name, 99)


def combo_penalty(order_name: str, serialization_name: str) -> float:
    penalty = 0.0
    penalty += order_priority(order_name) * 0.02
    penalty += serialization_priority(serialization_name) * 0.01
    return penalty


def build_combo_rows(
    bundles: List[Dict[str, Any]],
    max_per_template: int,
) -> List[Dict[str, Any]]:
    rows: List[Dict[str, Any]] = []

    for bundle in bundles:
        template_name = str(bundle.get("template_name", ""))
        support_weight = safe_float(bundle.get("support_weight", 0.0))
        exemplar = str(bundle.get("exemplar_source_text", ""))
        token_signature = str(bundle.get("token_multiset_signature", ""))
        move_strings = list(bundle.get("move_strings", []))
        serializations = bundle.get("serializations", {})
        orders = bundle.get("orders", {})

        local_rows: List[Dict[str, Any]] = []
        for order_name, ser_map in serializations.items():
            order_list = orders.get(order_name, [])
            if not isinstance(ser_map, dict):
                continue
            for serialization_name, probe_string in ser_map.items():
                if not isinstance(probe_string, str) or not probe_string.strip():
                    continue
                score = support_weight - combo_penalty(order_name, serialization_name)

                local_rows.append(
                    {
                        "template_name": template_name,
                        "bucket": choose_template_bucket(template_name),
                        "support_weight": support_weight,
                        "combo_score": score,
                        "order_name": order_name,
                        "order_tokens": list(order_list) if isinstance(order_list, list) else [],
                        "serialization_name": serialization_name,
                        "probe_string": probe_string,
                        "exemplar_source_text": exemplar,
                        "token_multiset_signature": token_signature,
                        "move_strings": move_strings,
                    }
                )

        local_rows.sort(
            key=lambda r: (
                -r["combo_score"],
                order_priority(r["order_name"]),
                serialization_priority(r["serialization_name"]),
                r["probe_string"],
            )
        )
        rows.extend(local_rows[:max_per_template])

    rows.sort(
        key=lambda r: (
            -r["combo_score"],
            -r["support_weight"],
            r["template_name"],
            r["order_name"],
            r["serialization_name"],
        )
    )
    return rows


def dedupe_probe_rows(rows: List[Dict[str, Any]]) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
    seen: Dict[str, Dict[str, Any]] = {}
    dupes: List[Dict[str, Any]] = []

    for row in rows:
        key = row["probe_string"]
        best = seen.get(key)
        if best is None:
            seen[key] = row
            continue

        current_rank = (
            row["combo_score"],
            row["support_weight"],
            -order_priority(row["order_name"]),
            -serialization_priority(row["serialization_name"]),
        )
        best_rank = (
            best["combo_score"],
            best["support_weight"],
            -order_priority(best["order_name"]),
            -serialization_priority(best["serialization_name"]),
        )
        if current_rank > best_rank:
            dupes.append(best)
            seen[key] = row
        else:
            dupes.append(row)

    unique_rows = list(seen.values())
    unique_rows.sort(
        key=lambda r: (
            -r["combo_score"],
            -r["support_weight"],
            r["template_name"],
            r["order_name"],
            r["serialization_name"],
        )
    )
    dupes.sort(
        key=lambda r: (
            -r["combo_score"],
            -r["support_weight"],
            r["template_name"],
            r["probe_string"],
        )
    )
    return unique_rows, dupes


def build_bucket_summary(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    agg: Dict[str, Dict[str, Any]] = {}
    for row in rows:
        bucket = row["bucket"]
        rec = agg.setdefault(
            bucket,
            {
                "bucket": bucket,
                "count": 0,
                "support_sum": 0.0,
                "best_combo_score": 0.0,
                "templates": set(),
            },
        )
        rec["count"] += 1
        rec["support_sum"] += safe_float(row["support_weight"])
        rec["best_combo_score"] = max(rec["best_combo_score"], safe_float(row["combo_score"]))
        rec["templates"].add(row["template_name"])

    out = []
    for rec in agg.values():
        out.append(
            {
                "bucket": rec["bucket"],
                "count": rec["count"],
                "support_sum": rec["support_sum"],
                "best_combo_score": rec["best_combo_score"],
                "templates": sorted(rec["templates"]),
            }
        )
    out.sort(key=lambda r: (-r["support_sum"], -r["best_combo_score"], r["bucket"]))
    return out


def build_template_summary(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    agg: Dict[str, Dict[str, Any]] = {}
    for row in rows:
        t = row["template_name"]
        rec = agg.setdefault(
            t,
            {
                "template_name": t,
                "bucket": row["bucket"],
                "count": 0,
                "support_weight": safe_float(row["support_weight"]),
                "best_combo_score": 0.0,
                "best_probe": None,
            },
        )
        rec["count"] += 1
        score = safe_float(row["combo_score"])
        if score > rec["best_combo_score"]:
            rec["best_combo_score"] = score
            rec["best_probe"] = {
                "order_name": row["order_name"],
                "serialization_name": row["serialization_name"],
                "probe_string": row["probe_string"],
            }

    out = list(agg.values())
    out.sort(key=lambda r: (-r["support_weight"], -r["best_combo_score"], r["template_name"]))
    return out


def build_active_probe_pack(unique_rows: List[Dict[str, Any]]) -> Dict[str, List[Dict[str, Any]]]:
    pack: Dict[str, List[Dict[str, Any]]] = {}
    by_template: Dict[str, List[Dict[str, Any]]] = {}

    for row in unique_rows:
        by_template.setdefault(row["template_name"], []).append(row)

    for template_name, rows in by_template.items():
        rows.sort(
            key=lambda r: (
                -r["combo_score"],
                order_priority(r["order_name"]),
                serialization_priority(r["serialization_name"]),
                r["probe_string"],
            )
        )
        pack[template_name] = rows[:5]
    return pack


def build_report(
    bucket_summary: List[Dict[str, Any]],
    template_summary: List[Dict[str, Any]],
    unique_rows: List[Dict[str, Any]],
    dupes: List[Dict[str, Any]],
    active_pack: Dict[str, List[Dict[str, Any]]],
) -> str:
    lines: List[str] = []
    lines.append(PHASE_NAME)
    lines.append("")

    lines.append("BUCKET SUMMARY")
    for row in bucket_summary:
        lines.append(
            f"- {row['bucket']:20s} count={row['count']:3d} support_sum={row['support_sum']:.6f} "
            f"best_combo={row['best_combo_score']:.6f} templates={row['templates']}"
        )
    lines.append("")

    lines.append("TEMPLATE SUMMARY")
    for row in template_summary:
        best = row["best_probe"] or {}
        lines.append(
            f"- {row['template_name']:32s} bucket={row['bucket']:18s} count={row['count']:2d} "
            f"support={row['support_weight']:.6f} best_combo={row['best_combo_score']:.6f}"
        )
        if best:
            lines.append(
                f"  best_probe: order={best['order_name']} serialization={best['serialization_name']}"
            )
            lines.append(f"  probe     : {best['probe_string']}")
    lines.append("")

    lines.append("TOP UNIQUE PROBES")
    for idx, row in enumerate(unique_rows[:40], 1):
        lines.append(
            f"{idx:02d}. combo={row['combo_score']:.6f} support={row['support_weight']:.6f} "
            f"{row['template_name']} :: {row['order_name']} :: {row['serialization_name']}"
        )
        lines.append(f"    {row['probe_string']}")
    lines.append("")

    lines.append("ACTIVE PROBE PACK")
    for template_name, rows in active_pack.items():
        lines.append(f"- {template_name}")
        for row in rows:
            lines.append(
                f"  * combo={row['combo_score']:.6f} order={row['order_name']} serialization={row['serialization_name']}"
            )
            lines.append(f"    {row['probe_string']}")
    lines.append("")

    lines.append("DEDUPED-AWAY PROBES")
    for idx, row in enumerate(dupes[:20], 1):
        lines.append(
            f"{idx:02d}. combo={row['combo_score']:.6f} support={row['support_weight']:.6f} "
            f"{row['template_name']} :: {row['order_name']} :: {row['serialization_name']}"
        )
        lines.append(f"    {row['probe_string']}")
    lines.append("")

    lines.append("WORKING READ")
    lines.append("- identity stays the highest-priority clean baseline probe family.")
    lines.append("- chain_m_to_f_to_e_to_m is the main nonh fourforone perturbation family.")
    lines.append("- swap_matrixsumlist_enter is the smallest clean perturbation and should be tested early.")
    lines.append("- h_island branches remain separate probe families and should not be mixed into clean-core runs.")
    return "\n".join(lines)


def main() -> None:
    args = parse_args()
    payload = load_json(args.input)

    bundles = payload.get("serialization_bundles", [])
    if not isinstance(bundles, list) or not bundles:
        raise ValueError("Missing serialization_bundles")

    all_rows = build_combo_rows(bundles, args.max_per_template)
    unique_rows, dupes = dedupe_probe_rows(all_rows)
    bucket_summary = build_bucket_summary(unique_rows)
    template_summary = build_template_summary(unique_rows)
    active_pack = build_active_probe_pack(unique_rows)

    result = {
        "phase_name": PHASE_NAME,
        "bucket_summary": bucket_summary,
        "template_summary": template_summary,
        "unique_probe_rows": unique_rows,
        "deduped_probe_rows": dupes,
        "active_probe_pack": active_pack,
    }

    report = build_report(
        bucket_summary=bucket_summary,
        template_summary=template_summary,
        unique_rows=unique_rows,
        dupes=dupes,
        active_pack=active_pack,
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