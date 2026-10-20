# Проход 2026-10-19 11:21–11:34 UTC (Qoder Desktop): RushWallet #30 — аудио/сцена; GitHub-интейк 1000 BTC

## 1. RushWallet Contest #30 (1 000 000 сат, `13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj`)

Проверка он-чейн не перезапускалась (приз подтверждён ранее в этот же день; 29/30 адресов пусты).
Работа — только чтение и сертифицированный оффлайн-оракул `tools/ocp/oracle.py` (SHA-256 → несжатый P2PKH).

### 1.1 Восстановление источника
- Найден и клонирован `visalord/rushwallet-puzzle-30`: `findings.md`, кадры, и главное — **оригинальный архивный webm 2014 г.** (h264 1280×720, 29.97 fps, 3316 кадров, 110.6 с) — лучше YouTube 720p60.
- Артефакты: `puzzles/rushwallet-contest-30-1msats/data/visalord_repo/`, `data/visalord_README.md`.

### 1.2 Визуальные лиды visalord — отрицательно
- 16 монет у коронованной женщины (кадр ~1575): текста на монетах нет (покадровый high-pass/CLAHE, temporal residual, scene-average, сетки кропов). В окне видны только известные #9 `supercalifragilisticexpialidocious X3` и #1 `5784623964023 X2`.
- «Синий прямоугольник» — пустая градиентная рамка.
- QR по всем кадрам (шаг 3) — только tip-адрес `1JmBVdo5fpkwYiDzFHFPcaiWkihc6WhxdB`.
- Артефакты: `data/frames30/`, `data/arch_frames/`, `data/arch_sheet.jpg`, `data/frames30/qr_payloads.json`.

### 1.3 Ось A-16COINS (предрегистрация → прогон → негатив)
- 20 баз сцены («16 coins», «sixteen bitcoins», «dancing queen», «crowned woman» и т.п.) × 4 регистра × N=1..16 через пробел = **960 кандидатов**.
- `SELFTEST OK`; прогон 0.94 с; все `NO MATCH`. Ось закрыта.
- Артефакт: `data/a16coins_candidates.txt`.

### 1.4 Ось A-AUDIO (новый канал)
- Извлечён звук (110.6 с, моно 22050 Гц), построены спектрограммы (полная и по 20 с) — скрытого текста/тональной стеганографии нет.
- Транскрипт faster-whisper `small.en` (CPU, 31 с; 32 сегмента, `data/audio30/transcript.json`) совпал с известным сюжетом. Ключевая находка для сцены с монетами: «…maybe you want to buy Babushka a new coat» (79.75–84.21 с).
- Предрегистрация оси, затем 10 баз (фраза сцены и её варианты) × 4 регистра × N=1..16 = **576 кандидатов** → все `NO MATCH`. Ось закрыта.
- Артефакты: `data/audio30/` (audio.wav, audio16k.wav, spec_*.png, transcript.json, candidates.txt).

### 1.5 Вывод по #30
Новых данных нет: визуальные и аудио-каналы архивного источника исчерпаны, качественнее источника не существует. Статус — external-info; дальнейшее — только мониторинг новых публикаций/подсказок автора. Транзакций, трат, публикации ключей не было.

## 2. GitHub-интейк `1000-btc-challenge-bitcoin-puzzle-tx` (обязательный шлюз)
- Команда: `python tools/github_intake.py run 1000-btc-challenge-bitcoin-puzzle-tx --agent Qoder --take-claim`.
- Статус **PARTIAL**: 4 репо из 13 (roadhero/bitcoin-puzzle-info, ilkerccom/btcpuzzle, alexanderthurn/1000-btc-challenge, brichard19/bitcrack), 182 файла (7.4 МБ), issues 305, комментариев 507, API 25 (remaining 19), бесплатных транспортов 8.
- Дайджест: `puzzles/1000-btc-challenge-bitcoin-puzzle-tx/data/github/GITHUB_INTAKE.md`; LOG пазла дополнен, маркер README добавлен.
- Класс цели — классический ECDLP (ближайший #71: 2^70–2^71, просканировано 0,86%) + риск sniping. Для «быстрых денег» не подходит; прогонов не запускалось.

## 3. Прочее
- Watch-only монитор песочницы: 13 адресов, изменений 0 (`tools/sandbox/monitor.py --quiet`).
- Crypto Puzzles #2: в LOG добавлен статус перепроверки (720p60, P1-контроль, P2 только демо/обманки, OCP-клиппинг в силе) — без прогона, бронь Beam не трогалась.
- School of Bitcoin: статус не изменился (kdbx отсутствует; контакт запрещён).

## 4. Безопасность
Транзакций/подписей/свипов нет. Ключи и приватные материалы не публиковались. Брони `rushwallet-contest-30-1msats` и `1000-btc-challenge-bitcoin-puzzle-tx` сняты.
