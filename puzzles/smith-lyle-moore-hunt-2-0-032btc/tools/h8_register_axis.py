"""Предрегистрация оси H8 (SLM Glimmer) в LOG.md — ДО прогона, по правилу каталога."""
import io
import os
import tempfile
from pathlib import Path

F = Path(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc")
LOG = F / "LOG.md"
MARK = "### H8 — ПРЕДРЕГИСТРАЦИЯ (не скачанные ассеты сайта, 24 из 28)"

TEXT = (
    "\n" + MARK + " — 2026-10-19 14:47 UTC — Qoder\n"
    "- Находка из локального разбора (не из сводок): из 28 media-ассетов, на которые ссылаются\n"
    "  дампы страниц (`data/h2d_public/*.json`, `data/jetkc_page.json`, `data/c2ozw_page.json`),\n"
    "  физически в `data/` лежат только 5 (видео, скачанные под своими именами). 24 ассета за всю\n"
    "  историю ханта **ни разу не скачивались и не анализировались**. В их числе — единственный\n"
    "  медиа-объект страницы `jetkc / Tropical Island` — `desertedisland.gif`\n"
    "  (`144728_82cfb8b67a4a428994704ffc7fca494f~mv2.gif`). jetkc — единственный родитель двух\n"
    "  незакрытых замков (`zhgsm` raft, `jcl9c` fire), и печатной подсказки на ней нет\n"
    "  (проверено по 267 строковым полям JSON, см. `data/jetkc_report.txt`).\n"
    "- Почему это содержательная гипотеза, а не «перебор»: у автора есть задокументированный\n"
    "  приём — спрятать текст **дописанными байтами после конца файла** (Hunt #1: у PNG-обложки\n"
    "  после trailer было 233 байта с первой подсказкой, см. раздел «Born to Be Wild» в README\n"
    "  и реестр agntn). Значит каждый непроверенный оригинал файла — потенциальный носитель,\n"
    "  и проверка не сводится к угадыванию паролей.\n"
    "- План прогона (офлайн + только GET статики, транзакций/писем/публикаций нет): скачать 24\n"
    "  оригинала через `static.wixstatic.com/media/<hash>~mv2.<ext>` (без трансформ-префиксов,\n"
    "  иначе дописанные байты теряются), затем для каждого: позиция trailer (GIF 0x3B / PNG IEND /\n"
    "  JPEG EOI) и всё, что после него; чанки и метаданные (GIF Comment/Application extension,\n"
    "  PNG tEXt/zTXt/iTXt, EXIF/XMP, ID3); число и задержки кадров; пофреймовые различия;\n"
    "  ASCII-строки; LSB-плоскость. Объём: ~24 запроса и 24 файла, время < 5 минут CPU.\n"
    "- Критерий успеха: читаемая строка-подсказка или кандидат пароля. Если носителя нет —\n"
    "  фиксируем честный негатив по всему классу «не скачанные ассеты», и этот класс больше\n"
    "  никто не будет перепроверять. Оракул Wix на этом шаге не трогаем (без HIT-контроля не\n"
    "  запускаем); если появится кандидат — отдельная предрегистрированная проба.\n"
    "- Инструменты: `tools/h8_missing_assets2.py` (реестр), `tools/h8_fetch_and_probe_assets.py`\n"
    "  (скачивание + анализ). Артефакты: `data/h8_assets/`, `data/h8_assets_probe.log`.\n"
)


def main():
    txt = io.open(LOG, encoding="utf-8", errors="ignore").read()
    if "H8 — ПРЕДРЕГИСТРАЦИЯ" in txt:
        print("уже зарегистрировано, пропускаю")
        return
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), suffix=".tmp")
    with os.fdopen(fd, "w", encoding="utf-8", newline="") as fh:
        fh.write(txt.rstrip("\n") + "\n" + TEXT)
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, LOG)
    print("H8 зарегистрирована в LOG.md; размер", os.path.getsize(LOG))


if __name__ == "__main__":
    main()
