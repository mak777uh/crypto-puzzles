# bitcointalk.org — UNREACHABLE (blocked at network layer)

`curl` to `bitcointalk.org` and `www.bitcointalk.org` fails with
`curl: (6) Could not resolve host` — DNS does not resolve for this domain in this
environment (other hosts like blockstream.info resolve fine). No HTML artifact could
be saved. The public search endpoints
(`index.php?action=search2;search=9vw04` / `gem+finder+puzzle` / `bc1qr5mssp6...`)
were therefore never actually executed.

Recommendation for manual work: run the bitcointalk search from a normal browser /
machine. Useful queries: `action=search2;search=9vw04`,
`...search=%22gem+finder%22+puzzle`, `...search=bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v`,
`...search=%22irrationallibs%22`. Note bitcointalk's classic search is GET-only and
does NOT require login for the results page.
