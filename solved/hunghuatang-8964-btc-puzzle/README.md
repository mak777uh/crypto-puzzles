# Hung-Hua Tang «8964» — puzzle with Bitcoin rewards (2025-08-25)

**Тип**: seed-фраза/BIP39-пазл с BTC-наградой (24 числа → 24 слова), автор — Hung-Hua Tang (@hunghuatang).
**Приз**: BTC (точная сумма и адрес **не подтверждены** — см. «Что нужно проверить»).
**Статус по нашим данным (2026-10-18)**: **нерешена** (публичных отчётов о решении не найдено), но и
**подтверждения фонда нет** — кандидатам в активную работу пока не является.

## Что зафиксировано из источников (дословно)
- Post на r/Bitcoin: «Half a month ago, a puzzle with Bitcoin rewards was released. Feel free to challenge
  yourself and enjoy it» → ссылка на пост автора в Threads: https://www.threads.com/@hunghuatang/post/DNwj6PxxHcd
  (created_utc 1nc5tt2 ≈ 2025-09, значит релиз ≈ 2025-08-25).
- Фрагмент профиля автора (из поисковой выдачи): «Puzzle designed for 8964, BTC reward … 08252025 (0825 / 2025).
  (1) A string of 24 numbers for finding the 24-word …» → механика: 24 числа кодируют 24 слова seed-фразы.
- «8964» — личный числовой бренд автора (используется в его постах о BTC-пазлах).

## Что нужно проверить (ось следующего прохода)
1. Открыть посты @hunghuatang в Threads (с этой машины Threads не отдаёт контент: WebFetch → fetch failed;
   нужен web.archive.org: `https://web.archive.org/web/2025*/threads.com/@hunghuatang`).
2. Найти **адрес приза** (BTC) → проверка баланса через https://blockstream.info/api/address/<addr> (бесплатно, read-only).
3. Проверить, не решён ли пазл (поиск по адресу + по «8964 puzzle solved»).
4. Если адрес жив и пазл не решён → добавить в `OPTIMAL_TARGETS` как кандидата; иначе — в `dead-ends-registry`
   с причиной `unfunded` или `solved`.

## Источники (открыты/собраны 2026-10-18)
- r/Bitcoin (текст поста получен через Arctic Shift API): https://www.reddit.com/r/Bitcoin/comments/1nc5tt2/a_puzzle_with_bitcoin_rewards/
- Профиль/посты автора: https://www.threads.com/@hunghuatang ; конкретный пост: https://www.threads.com/@hunghuatang/post/DNwj6PxxHcd
- API-выдача Arctic Shift (id поста 1nc5tt2, selftext с ссылкой): https://arctic-shift.photon-reddit.com/api/posts/ids?ids=1nc5tt2
  (локальная копия JSON: `data/arctic_shift_post_1nc5tt2.json`)

## Предварительный вердикт
Кандидат «требует проверки»: это **свежий (2025) пазл с BTC-наградой, отсутствовавший в базе**, но без
подтверждённого ончейн-оракула. Пока адрес не найден, в Tier-списки не включаем.

Хроника: см. LOG.md.

## Обновление (2026-10-18, Qoder) — ВЕРИФИКАЦИЯ: РЕШЁН
- Тип: решение (не нами).
- Суть: автор @hunghuatang в тредке r/Bitcoin 1tw7glw подтвердил: «This puzzle has just been solved —
  congratulations to @IndividualOk6204.» Приз 0.008964 BTC; механика — 6-bit/XOR на перфорированных картах.
- Проверено: да (Arctic Shift API, данные в `data/post_1tw7glw.json`, `data/comments_1tw7glw.json`).
- Влияние: **не нерешённая загадка** → перенесена в `solved/`. Хроника: см. LOG.md.
