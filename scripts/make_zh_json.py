#!/usr/bin/env python3
"""Generate zh-translations.json with complete bilingual flyer mappings."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "i18n" / "zh-translations.json"
with open("/tmp/flyer_all_strings.json", encoding="utf-8") as f:
    ALL_STRINGS = json.load(f)

FOOTER = {"sales@alitec.asia","www.alitec.asia","Singapore","Malaysia","sales@alitec.sg","www.alitec.sg"}

INDEX_ORDER = [
    "temple-ngo-religious-operations","industrial-equipment-wholesale","social-recreational-club",
    "precision-cnc-manufacturing","positive","cleantric","public-safety","secondary-process-manufacturing",
    "food-manufacturing-operations","attendance-timesheet-hardware","translation-service-operations",
    "gym-equipment-sales-service","specialty-chemical-trading","school-uniform-seller",
    "corporate-hamper-gifting","pet-food-accessories-ecommerce","scaffolding",
    "bakery-ecommerce-operations","lab-testing-process",
]

def sp(pairs):
    return sorted(pairs, key=lambda x: len(x[0]), reverse=True)

# Load project translation data
DATA_PATH = Path(__file__).parent / "zh_data.json"
with DATA_PATH.open(encoding="utf-8") as f:
    DATA = json.load(f)

COMMON = sp(DATA["common"])
INDEX_CARDS = DATA["index_cards"]
COMMON_EN = {p[0] for p in COMMON}

projects = {}
for slug in INDEX_ORDER:
    pairs = []
    for en in ALL_STRINGS.get(slug, []):
        if en in FOOTER or en in COMMON_EN:
            continue
        zh = DATA["projects"].get(slug, {}).get(en)
        if zh:
            pairs.append([en, zh])
    projects[slug] = sp(pairs)

result = {"index_order": INDEX_ORDER, "common": COMMON, "projects": projects, "index_cards": INDEX_CARDS}
OUT.parent.mkdir(exist_ok=True)
with OUT.open("w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("Wrote", OUT)
print("common:", len(COMMON))
for slug in INDEX_ORDER:
    print(f"  {slug}: {len(projects[slug])}")

