#!/usr/bin/env python3
"""Write complete i18n/zh-translations.json."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "i18n" / "zh-translations.json"
MAP = Path(__file__).parent / "en_zh_map.json"

with (Path("/tmp/flyer_all_strings.json")).open(encoding="utf-8") as fh:
    ALL_STRINGS = json.load(fh)

FOOTER = {
    "sales@alitec.asia", "www.alitec.asia", "Singapore", "Malaysia",
    "sales@alitec.sg", "www.alitec.sg",
}

INDEX_ORDER = [
    "temple-ngo-religious-operations", "industrial-equipment-wholesale", "social-recreational-club",
    "precision-cnc-manufacturing", "positive", "cleantric", "public-safety",
    "secondary-process-manufacturing", "food-manufacturing-operations", "attendance-timesheet-hardware",
    "translation-service-operations", "gym-equipment-sales-service", "specialty-chemical-trading",
    "school-uniform-seller", "corporate-hamper-gifting", "pet-food-accessories-ecommerce",
    "scaffolding", "bakery-ecommerce-operations", "lab-testing-process",
]


def sort_pairs(pairs: list[list[str]]) -> list[list[str]]:
    return sorted(pairs, key=lambda item: len(item[0]), reverse=True)


def main() -> None:
    with MAP.open(encoding="utf-8") as fh:
        data = json.load(fh)

    common = sort_pairs(data["common"])
    common_en = {pair[0] for pair in common}
    index_cards = data["index_cards"]
    per_slug: dict[str, dict[str, str]] = data["projects"]

    projects_out: dict[str, list[list[str]]] = {}
    missing: dict[str, list[str]] = {}

    for slug in INDEX_ORDER:
        pairs: list[list[str]] = []
        for en in ALL_STRINGS.get(slug, []):
            if en in FOOTER or en in common_en:
                continue
            zh = per_slug.get(slug, {}).get(en)
            if zh:
                pairs.append([en, zh])
            else:
                missing.setdefault(slug, []).append(en)
        projects_out[slug] = sort_pairs(pairs)

    if missing:
        miss_path = Path(__file__).parent / "zh_missing_report.json"
        miss_path.write_text(json.dumps(missing, ensure_ascii=False, indent=2), encoding="utf-8")
        total = sum(len(v) for v in missing.values())
        raise SystemExit(f"Missing {total} translations — see {miss_path.name}")

    result = {
        "index_order": INDEX_ORDER,
        "common": common,
        "projects": projects_out,
        "index_cards": index_cards,
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Wrote {OUT}")
    print("common:", len(common))
    for slug in INDEX_ORDER:
        print(f"  {slug}: {len(projects_out[slug])}")


if __name__ == "__main__":
    main()
