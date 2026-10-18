# DeepWiki-снимок репозитория `puzzlehunt/gsmgio-5btc-puzzle` — ПРОИЗВОДНЫЙ ДУБЛИКАТ (не источник)

Дата разбора: 2026-10-18 · агент: Big Pickle

## Что это

12 markdown-страниц с `deepwiki.com` (автор «DeepWiki», published **2025-08-25**), сохранённые из Obsidian
(created 2026-10-18). Источник данных — `README.md` коммита **`fb92dd15`** (ссылки вида
`README.md123-149@fb92dd15`). Общий объём: 12 страниц, 493377 байт.

Страницы: Overview, Getting Started, Puzzle Phases, Phase 1, Phase 2, Phase 3,
Alternative Path (SalPhaseIon/Cosmic Duality), Technical Architecture, Cryptographic Systems,
Password Construction Methods, External Tool Integrations, Visual Assets and Documentation.

## Проверка на новизну — пусто

Машинная проверка всех 12 файлов (линтер `tools/`-независимый, см. отчёт):

- **Ни одной новой 40–64-hex строки** кроме уже известной `1a57c572…` (пароль Phase 3).
- Нет `4f7a1e4e…`, `cd3fea3d…`, солей `3ab58534`/`b45a5e3d`, адреса `17ucy…`, WIF, мнемоник/BIP39.
- Все base64-подобные токены = знакомые строки README: `theflowerblossomsthroughwhatseemstobeaconcretesurface`
  (Phase-1 пароль), `causality…`, `jacquefresco…heisenbergsuncertaintyprinciple`, `matrixsumlist…thispassword`,
  `HASHTHETEXT`, `89727c59…`, `1GSMG1JC9…`.
- Остальное — HTML/CSS «mermaid»-диаграмм (шум) и пересказ README.

## Вывод

Это **LLM-пересказ того же README, который у нас уже есть** (`data/puzzlehunt/README.md`, sha256 `442270a1…`).
Новой информации о пазле нет. Использовать можно только как подтверждение состава README и как фиксацию
коммита `fb92dd15` (снимок на 2025-08-25). Повторно не разбирать.
