#!/usr/bin/env python3
"""Create i18n/zh-translations.json with complete bilingual mappings for all 19 flyers."""

from __future__ import annotations

import ast
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "i18n" / "zh-translations.json"
STRINGS = Path("/tmp/flyer_all_strings.json")
BUILD = Path(__file__).parent / "build-zh-translations.py"
GEN = Path(__file__).parent / "generate_zh_data.py"

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


def load_common_and_cards() -> tuple[list[list[str]], dict, set[str]]:
    src = GEN.read_text(encoding="utf-8")
    ns: dict = {}
    exec(src[src.index("COMMON = [") : src.index("# Per-project")], ns)  # noqa: S102
    common = ns["COMMON"]
    index_cards = ns["INDEX_CARDS"]
    return common, index_cards, {pair[0] for pair in common}


def load_partial_projects() -> dict[str, dict[str, str]]:
    src = BUILD.read_text(encoding="utf-8")
    block = src[src.index("PROJECT_TRANSLATIONS = {") + len("PROJECT_TRANSLATIONS = ") :]
    block = block[: block.index("\n# Continue with remaining")]
    return ast.literal_eval(block)


def load_remaining() -> dict[str, dict[str, str]]:
    path = Path(__file__).parent / "remaining_project_translations.json"
    with path.open(encoding="utf-8") as fh:
        return json.load(fh)


def main() -> None:
    with STRINGS.open(encoding="utf-8") as fh:
        all_strings = json.load(fh)

    common, index_cards, common_en = load_common_and_cards()
    partial = load_partial_projects()
    remaining = load_remaining()
    all_projects = {**partial, **remaining}

    projects_out: dict[str, list[list[str]]] = {}
    missing: dict[str, list[str]] = {}

    for slug in INDEX_ORDER:
        pairs: list[list[str]] = []
        mapping = all_projects.get(slug, {})
        for en in all_strings.get(slug, []):
            if en in FOOTER or en in common_en:
                continue
            zh = mapping.get(en)
            if zh:
                pairs.append([en, zh])
            else:
                missing.setdefault(slug, []).append(en)
        projects_out[slug] = sort_pairs(pairs)

    if missing:
        report = Path(__file__).parent / "zh_missing_report.json"
        report.write_text(json.dumps(missing, ensure_ascii=False, indent=2), encoding="utf-8")
        total = sum(len(v) for v in missing.values())
        raise SystemExit(f"Missing {total} translations — see {report.name}")

    result = {
        "index_order": INDEX_ORDER,
        "common": sort_pairs(common),
        "projects": projects_out,
        "index_cards": index_cards,
    }
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Wrote {OUT}")
    print("common:", len(result["common"]))
    for slug in INDEX_ORDER:
        print(f"  {slug}: {len(projects_out[slug])}")


if __name__ == "__main__":
    main()
