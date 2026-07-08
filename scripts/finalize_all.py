#!/usr/bin/env python3
"""Merge all project translations and write i18n/zh-translations.json."""

from __future__ import annotations

import ast
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).parent
OUT = ROOT / "i18n" / "zh-translations.json"
STRINGS = Path("/tmp/flyer_all_strings.json")

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


def load_common_and_cards():
    src = (SCRIPTS / "generate_zh_data.py").read_text(encoding="utf-8")
    ns: dict = {}
    exec(src[src.index("COMMON = [") : src.index("# Per-project")], ns)  # noqa: S102
    return ns["COMMON"], ns["INDEX_CARDS"], {p[0] for p in ns["COMMON"]}


def load_partial():
    src = (SCRIPTS / "build-zh-translations.py").read_text(encoding="utf-8")
    block = src[src.index("PROJECT_TRANSLATIONS = {") + len("PROJECT_TRANSLATIONS = ") :]
    block = block[: block.index("\n# Continue with remaining")]
    return ast.literal_eval(block)


def load_remaining_modules() -> dict[str, dict[str, str]]:
    merged: dict[str, dict[str, str]] = {}
    for name in ("remaining_translations_data", "remaining_translations_part2"):
        path = SCRIPTS / f"{name}.py"
        if not path.exists():
            continue
        spec = importlib.util.spec_from_file_location(name, path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)  # type: ignore[union-attr]
        for slug, mapping in mod.REMAINING.items():
            merged.setdefault(slug, {}).update(mapping)
    # Gap-fill pairs discovered during validation
    patch: dict[str, dict[str, str]] = {
        "social-recreational-club": {"Events": "活动"},
        "precision-cnc-manufacturing": {"Bill": "开票", "Procurement": "采购"},
        "positive": {"Pending Approvals": "待审批"},
        "cleantric": {
            "Company": "公司",
            "09:00": "09:00",
            "11:30": "11:30",
            "14:00": "14:00",
            "16:00": "16:00",
        },
        "public-safety": {"Service": "服务", "Reports": "Reports"},
        "secondary-process-manufacturing": {
            "Active MOs": "活跃 MO",
            "QC Team": "质检团队",
            "MO": "MO",
            "Process": "加工",
        },
        "food-manufacturing-operations": {
            "MOs Due This Week": "本周到期 MO",
            "Production Workflow": "生产工作流",
            "Deliveries": "交付",
            "QC Hold": "质检冻结",
            "MO": "MO",
            "MO-2842": "MO-2842",
            "MO-2847": "MO-2847",
            "MO-2851": "MO-2851",
            "MO-2854": "MO-2854",
        },
        "translation-service-operations": {
            "Service Types": "服务类型",
            "Analytics": "分析",
            "Due This Week": "本周到期",
            "Project Workflow": "项目工作流",
            "Operations": "运营",
            "Create": "创建",
            "Invoice": "开票",
            "Mon 09:00": "周一 09:00",
        },
        "gym-equipment-sales-service": {
            "Due This Week": "本周到期",
            "Quote": "报价",
            "Deliver &amp;": "交付与",
            "Maintenance": "维保",
            "Service Team": "服务团队",
        },
        "specialty-chemical-trading": {
            "Analytics": "分析",
            "Invoice": "开票",
            "Quote": "报价",
        },
        "school-uniform-seller": {
            "SO-1847": "SO-1847",
            "SO-1851": "SO-1851",
            "SO-1854": "SO-1854",
        },
        "corporate-hamper-gifting": {
            "Pick &amp;<br />Pack": "拣货与<br />包装",
            "Branded Documents": "品牌文档",
            "Custom sales, invoice, and delivery print layouts.": "定制销售、发票与交付打印版式。",
            "Pick &amp;": "拣货与",
            "Greeting details flow to warehouse moves and delivery slips": "贺卡信息延续至仓库移动与送货单",
        },
        "pet-food-accessories-ecommerce": {
            "Pay<br />Securely": "安全<br />支付",
            "Register": "注册",
            "Pick &amp;": "拣货与",
            "Warehouse fulfilment with bundle lines and delivery order creation": "仓库履约含套装行与交付单创建",
        },
        "bakery-ecommerce-operations": {
            "Pay<br />Securely": "安全<br />支付",
            "Collection": "自提",
            "Active Members": "活跃会员",
            "Operations": "运营",
            "Shop &amp;": "选购与",
            "Schedule": "排程",
            "Pay": "支付",
            "Securely": "安全",
            "Produce &amp;": "生产与",
            "Retain": "留住",
        },
        "lab-testing-process": {"Bill": "开票", "Supervisors": "主管"},
    }
    for slug, mapping in patch.items():
        merged.setdefault(slug, {}).update(mapping)
    return merged


def main() -> None:
    with STRINGS.open(encoding="utf-8") as fh:
        all_strings = json.load(fh)

    common, index_cards, common_en = load_common_and_cards()
    all_projects = {**load_partial(), **load_remaining_modules()}

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
        report = SCRIPTS / "zh_missing_report.json"
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
