var e=`//! Actions JSON shape shared with the TypeScript SDK:
//!
//! \`\`\`json
//! [{"kind":"transferSol","to":"<base58>","lamports":"<decimal>"},
//!  {"kind":"transferToken","mint":"…","tokenProgram":"…","destination":"…","amount":"<decimal>"},
//!  {"kind":"closeTokenAccount","mint":"…","tokenProgram":"…","rentTo":"…"},
//!  {"kind":"setHeir","heir":"…","inactivityDays":365},
//!  {"kind":"checkIn","heir":"…","inactivityDays":365},
//!  {"kind":"clearHeir","heir":"…"}]
//! \`\`\`
//!
//! The top level is an array of objects (serde's positional form of a tagged enum,
//! \`["transferSol","<to>","<lamports>"]\`, is rejected). Pubkeys are base58 strings of at most 44
//! characters encoding exactly 32 bytes; u64 values are decimal strings (digits only, no sign, no
//! leading zeros); \`inactivityDays\` is a JSON integer (a u16: no fraction, sign or string; the
//! encoder then requires 30..=3650). Unknown fields are rejected.

use bunker_core::Action;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "camelCase", deny_unknown_fields)]
enum JsonAction {
    #[serde(rename_all = "camelCase")]
    TransferSol { to: String, lamports: String },
    #[serde(rename_all = "camelCase")]
    TransferToken {
        mint: String,
        token_program: String,
        destination: String,
        amount: String,
    },
    #[serde(rename_all = "camelCase")]
    CloseTokenAccount {
        mint: String,
        token_program: String,
        rent_to: String,
    },
    #[serde(rename_all = "camelCase")]
    SetHeir { heir: String, inactivity_days: u16 },
    #[serde(rename_all = "camelCase")]
    CheckIn { heir: String, inactivity_days: u16 },
    #[serde(rename_all = "camelCase")]
    ClearHeir { heir: String },
}

/// Longest base58 encoding of 32 bytes (\`ceil(32 · log(256) / log(58))\`).
const MAX_PUBKEY_B58_LEN: usize = 44;

fn pubkey(s: &str, field: &str) -> Result<[u8; 32], String> {
    // Checked before decoding: base58 decoding is quadratic in the input length.
    if s.len() > MAX_PUBKEY_B58_LEN {
        return Err(format!(
            "{field}: base58 pubkey longer than {MAX_PUBKEY_B58_LEN} characters"
        ));
    }
    let v = bs58::decode(s)
        .into_vec()
        .map_err(|e| format!("{field}: invalid base58 ({e})"))?;
    v.as_slice().try_into().map_err(|_| {
        format!(
            "{field}: expected a 32-byte base58 pubkey, got {} bytes",
            v.len()
        )
    })
}

fn u64_dec(s: &str, field: &str) -> Result<u64, String> {
    let ok =
        !s.is_empty() && s.bytes().all(|b| b.is_ascii_digit()) && (s == "0" || !s.starts_with('0'));
    if !ok {
        return Err(format!(
            "{field}: expected a decimal integer string, got {s:?}"
        ));
    }
    s.parse::<u64>()
        .map_err(|_| format!("{field}: {s} does not fit in a u64"))
}

pub fn actions_from_json(json: &str) -> Result<Vec<Action>, String> {
    let bad = |e: serde_json::Error| format!("invalid actions JSON: {e}");
    let list: Vec<serde_json::Value> = serde_json::from_str(json).map_err(bad)?;
    list.into_iter()
        .enumerate()
        .map(|(i, v)| {
            let at = |f: &str| format!("actions[{i}].{f}");
            // Objects only: a serde tagged enum would also accept a positional array.
            if !v.is_object() {
                return Err(format!(
                    "invalid actions JSON: actions[{i}] must be an object"
                ));
            }
            let a: JsonAction = serde_json::from_value(v).map_err(bad)?;
            Ok(match a {
                JsonAction::TransferSol { to, lamports } => Action::TransferSol {
                    to: pubkey(&to, &at("to"))?,
                    lamports: u64_dec(&lamports, &at("lamports"))?,
                },
                JsonAction::TransferToken {
                    mint,
                    token_program,
                    destination,
                    amount,
                } => Action::TransferToken {
                    mint: pubkey(&mint, &at("mint"))?,
                    token_program: pubkey(&token_program, &at("tokenProgram"))?,
                    destination: pubkey(&destination, &at("destination"))?,
                    amount: u64_dec(&amount, &at("amount"))?,
                },
                JsonAction::CloseTokenAccount {
                    mint,
                    token_program,
                    rent_to,
                } => Action::CloseTokenAccount {
                    mint: pubkey(&mint, &at("mint"))?,
                    token_program: pubkey(&token_program, &at("tokenProgram"))?,
                    rent_to: pubkey(&rent_to, &at("rentTo"))?,
                },
                JsonAction::SetHeir {
                    heir,
                    inactivity_days,
                } => Action::SetHeir {
                    heir: pubkey(&heir, &at("heir"))?,
                    inactivity_days,
                },
                JsonAction::CheckIn {
                    heir,
                    inactivity_days,
                } => Action::CheckIn {
                    heir: pubkey(&heir, &at("heir"))?,
                    inactivity_days,
                },
                JsonAction::ClearHeir { heir } => Action::ClearHeir {
                    heir: pubkey(&heir, &at("heir"))?,
                },
            })
        })
        .collect()
}

fn b58(k: &[u8; 32]) -> String {
    bs58::encode(k).into_string()
}

pub fn actions_to_json(actions: &[Action]) -> String {
    let list: Vec<JsonAction> = actions
        .iter()
        .map(|a| match a {
            Action::TransferSol { to, lamports } => JsonAction::TransferSol {
                to: b58(to),
                lamports: lamports.to_string(),
            },
            Action::TransferToken {
                mint,
                token_program,
                destination,
                amount,
            } => JsonAction::TransferToken {
                mint: b58(mint),
                token_program: b58(token_program),
                destination: b58(destination),
                amount: amount.to_string(),
            },
            Action::CloseTokenAccount {
                mint,
                token_program,
                rent_to,
            } => JsonAction::CloseTokenAccount {
                mint: b58(mint),
                token_program: b58(token_program),
                rent_to: b58(rent_to),
            },
            Action::SetHeir {
                heir,
                inactivity_days,
            } => JsonAction::SetHeir {
                heir: b58(heir),
                inactivity_days: *inactivity_days,
            },
            Action::CheckIn {
                heir,
                inactivity_days,
            } => JsonAction::CheckIn {
                heir: b58(heir),
                inactivity_days: *inactivity_days,
            },
            Action::ClearHeir { heir } => JsonAction::ClearHeir { heir: b58(heir) },
        })
        .collect();
    serde_json::to_string(&list).expect("serializing plain strings cannot fail")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn round_trip_and_strictness() {
        let j = r#"[{"kind":"transferSol","to":"11111111111111111111111111111112","lamports":"1000"},
                   {"kind":"transferToken","mint":"So11111111111111111111111111111111111111112","tokenProgram":"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA","destination":"11111111111111111111111111111112","amount":"18446744073709551615"},
                   {"kind":"closeTokenAccount","mint":"So11111111111111111111111111111111111111112","tokenProgram":"TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb","rentTo":"11111111111111111111111111111112"}]"#;
        let a = actions_from_json(j).unwrap();
        assert_eq!(a.len(), 3);
        let back = actions_to_json(&a);
        assert_eq!(actions_from_json(&back).unwrap(), a);

        for bad in [
            r#"[{"kind":"transferSol","to":"11111111111111111111111111111112","lamports":1000}]"#,
            r#"[{"kind":"transferSol","to":"11111111111111111111111111111112","lamports":"+1"}]"#,
            r#"[{"kind":"transferSol","to":"11111111111111111111111111111112","lamports":"01"}]"#,
            r#"[{"kind":"transferSol","to":"11111111111111111111111111111112","lamports":"18446744073709551616"}]"#,
            r#"[{"kind":"transferSol","to":"1111","lamports":"1"}]"#,
            r#"[{"kind":"transferSol","to":"11111111111111111111111111111112","lamports":"1","x":1}]"#,
            r#"[{"kind":"burn","to":"11111111111111111111111111111112"}]"#,
            r#"{"kind":"transferSol"}"#,
        ] {
            assert!(actions_from_json(bad).is_err(), "{bad}");
        }
    }

    #[test]
    fn heir_actions_round_trip_and_are_strict() {
        let heir = "5ee7kWKbMq2R9KRwcfBK1REFmV2MghVHFyJPqLiQ8kZ8";
        let j = format!(
            r#"[{{"kind":"setHeir","heir":"{heir}","inactivityDays":365}},
               {{"kind":"transferSol","to":"11111111111111111111111111111112","lamports":"1"}}]"#
        );
        let a = actions_from_json(&j).unwrap();
        assert!(matches!(a[0], Action::SetHeir { inactivity_days: 365, .. }));
        assert_eq!(actions_from_json(&actions_to_json(&a)).unwrap(), a);
        for kind in ["checkIn", "setHeir"] {
            let ok = format!(r#"[{{"kind":"{kind}","heir":"{heir}","inactivityDays":30}}]"#);
            let back = actions_to_json(&actions_from_json(&ok).unwrap());
            assert_eq!(back, format!(r#"[{{"kind":"{kind}","heir":"{heir}","inactivityDays":30}}]"#));
        }
        let clear = format!(r#"[{{"kind":"clearHeir","heir":"{heir}"}}]"#);
        assert_eq!(actions_to_json(&actions_from_json(&clear).unwrap()), clear);

        // The period is a JSON integer that fits a u16: no string, fraction, sign or overflow.
        // (Its 30..=3650 range is the encoder's rule, checked by encode_actions.)
        for days in [r#""365""#, "365.5", "-1", "65536", "null"] {
            let bad = format!(r#"[{{"kind":"setHeir","heir":"{heir}","inactivityDays":{days}}}]"#);
            assert!(actions_from_json(&bad).is_err(), "{bad}");
        }
        for bad in [
            format!(r#"[{{"kind":"setHeir","heir":"{heir}"}}]"#),
            format!(r#"[{{"kind":"clearHeir","heir":"{heir}","inactivityDays":30}}]"#),
            format!(r#"[{{"kind":"checkIn","heir":"abc","inactivityDays":30}}]"#),
            format!(r#"[{{"kind":"setHeir","heir":"{heir}","inactivityDays":30,"x":1}}]"#),
        ] {
            assert!(actions_from_json(&bad).is_err(), "{bad}");
        }
    }

    /// Regression for "Actions JSON parser accepts a positional array form": serde's
    /// internally-tagged enum also deserializes \`["transferSol", to, lamports]\`, which a JS
    /// consumer reading \`a.kind\` / \`a.to\` would see as an array, not a transfer.
    #[test]
    fn positional_array_form_is_rejected() {
        let to = "11111111111111111111111111111112";
        let mint = "So11111111111111111111111111111111111111112";
        let spl = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        for bad in [
            format!(r#"[["transferSol","{to}","1000"]]"#),
            format!(r#"[["transferToken","{mint}","{spl}","{to}","5"]]"#),
            format!(r#"[["closeTokenAccount","{mint}","{spl}","{to}"]]"#),
            format!(
                r#"[{{"kind":"transferSol","to":"{to}","lamports":"1"}},["transferSol","{to}","2"]]"#
            ),
            r#"["transferSol"]"#.into(),
            "[1]".into(),
            "[null]".into(),
        ] {
            let e = actions_from_json(&bad).unwrap_err();
            assert!(e.starts_with("invalid actions JSON"), "{bad}: {e}");
        }
        // The object form is still accepted.
        let ok = format!(r#"[{{"kind":"transferSol","to":"{to}","lamports":"1000"}}]"#);
        assert_eq!(actions_from_json(&ok).unwrap().len(), 1);
    }

    /// Regression for "base58 fields have no length cap": a long \`to\` is rejected before the
    /// quadratic base58 decode (previously 60,000 characters took seconds to reject).
    #[test]
    fn overlong_base58_is_rejected_before_decoding() {
        for n in [45usize, 1_000, 200_000] {
            let j = format!(
                r#"[{{"kind":"transferSol","to":"{}","lamports":"1"}}]"#,
                "2".repeat(n)
            );
            let e = actions_from_json(&j).unwrap_err();
            assert_eq!(e, "actions[0].to: base58 pubkey longer than 44 characters");
        }
        // 44 characters is the longest valid encoding (the all-0xff key) and still decodes.
        let max = bs58::encode([0xffu8; 32]).into_string();
        assert_eq!(max.len(), 44);
        let j = format!(r#"[{{"kind":"transferSol","to":"{max}","lamports":"1"}}]"#);
        assert!(actions_from_json(&j).is_ok());
    }
}
`;export{e as default};