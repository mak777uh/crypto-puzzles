# GSMG — бинарный road-map создателя (Telegram msg id 8446) — декодирован

- Источник: экспорт Telegram-группы «GSMG Puzzle Solvers», сообщение id **8446**, автор **Jrk Bgrt**,
  дата 2023-02-24T02:20:03, 1448 символов `0`/`1` (= 161 байт).
- В корпусе сообщество называет этот объект `jrk_reveal.txt` (msg 23474, 33633).

## Метод декодирования (найден в этом проходе)

1. Собрать битовую строку (1448 бит, без пробелов) -> 161 байт.
2. **Побитовый реверс каждого байта** (`bitrev`) и **реверс порядка байт** (последовательности).
3. ASCII-декод.

## Результат

```
yellowblueprimesmatrixsumlistlastwordsbeforearchichoiceyinyangwewontgiveawaythepassworditsinfrontofyoureyesbutyourenotseeingitverylaststepisatruegiveawaypromised
```

В разбивке:

```
yellow blue primes matrixsumlist lastwordsbeforearchichoice yinyang
we wont give away the password its in front of your eyes but you're not seeing it
very last step is a true give away promised
```

Это официальный road-map финальной фазы (2023-02-24) и он совпадает с устными подсказками создателя
(«password is in front of your eyes», «true giveaway», «once you hit a ying yang...»).

Скрипт воспроизведения: `tools/gsmg_jrk_reveal_decode_2026-10-18.py`.

## Сырые данные (первые 240 симв.)

```
00100110 10100110 11001110 10010110 10110110 11110110 01001110 00001110 10011110 10000110 11101110 10000110 10100110 01101110 10010110 11100110 10100110 10101110 01001110 00101110 10000110 11001110 10010110 00001110 10100110 00101110 110011
```
