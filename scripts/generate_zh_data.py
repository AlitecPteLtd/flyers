#!/usr/bin/env python3
"""Generate scripts/zh_data.json with all EN->ZH translation mappings."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).parent / "zh_data.json"

with (Path("/tmp/flyer_all_strings.json")).open(encoding="utf-8") as fh:
    ALL_STRINGS = json.load(fh)

FOOTER = {
    "sales@alitec.asia", "www.alitec.asia", "Singapore", "Malaysia",
    "sales@alitec.sg", "www.alitec.sg",
}

COMMON = [
    ["SEAMLESS INTEGRATION WITH ODOO APPS", "与 ODOO 应用无缝集成"],
    ["KEY CAPABILITIES", "核心功能"],
    ["Key Capabilities", "核心功能"],
    ["Business<br />Benefits", "商业<br />效益"],
    ["Management Visibility", "管理可视化"],
    ["Operations Visibility", "运营可视化"],
    ["Shop Floor Visibility", "车间可视化"],
    ["Project Visibility", "项目可视化"],
    ["Trading Visibility", "贸易可视化"],
    ["Fulfilment Visibility", "履约可视化"],
    ["Bakery Visibility", "烘焙可视化"],
    ["Lab Visibility", "实验室可视化"],
    ["Real-Time Dashboard", "实时仪表盘"],
    ["Operational Dashboard", "运营仪表盘"],
    ["Control Modes", "管控模式"],
    ["Additional Features", "附加功能"],
    ["Flexible Booking Modes", "灵活预约模式"],
    ["Flexible Fulfilment Modes", "灵活履约模式"],
    ["Fire Safety Operation Areas", "消防安全作业区域"],
    ["Operational Controls", "运营管控"],
    ["Control Area", "管控领域"],
    ["Operation Area", "作业区域"],
    ["Product Group", "产品分组"],
    ["Service Type", "服务类型"],
    ["On Track", "进展顺利"],
    ["In Progress", "进行中"],
    ["Pending", "待处理"],
    ["Active", "活跃"],
    ["Open", "开放"],
    ["Live", "运行中"],
    ["Ready", "就绪"],
    ["Plan", "计划"],
    ["Review", "审核"],
    ["Watch", "关注"],
    ["Due", "到期"],
    ["Today", "今日"],
    ["Tomorrow", "明日"],
    ["Scheduled", "已排程"],
    ["Planned", "已计划"],
    ["Tracked", "已跟踪"],
    ["Checked", "已核对"],
    ["Stable", "稳定"],
    ["Approve", "审批"],
    ["Alert", "预警"],
    ["Queue", "队列"],
    ["Full", "已满"],
    ["Reg", "报名"],
    ["Recv", "收货"],
    ["Ship", "发货"],
    ["Inv", "开票"],
    ["Run", "运行"],
    ["QC", "质检"],
    ["Maint", "维保"],
    ["Repair", "维修"],
    ["Install", "安装"],
    ["Deep", "深度"],
    ["Move", "搬迁"],
    ["Retail", "零售"],
    ["Office", "办公"],
    ["Industrial", "工业"],
    ["Residential", "住宅"],
    ["Ad-hoc", "临时"],
    ["Any", "任意"],
    ["Morning", "上午"],
    ["Afternoon", "下午"],
    ["Flexible", "灵活"],
    ["Named", "指定"],
    ["Repeat", "重复"],
    ["Team", "团队"],
    ["Custom", "定制"],
    ["Both", "双渠道"],
    ["Bulk", "批量"],
    ["Web", "网站"],
    ["Online", "在线"],
    ["Counter", "柜台"],
    ["Multi", "多地址"],
    ["Gift", "礼品"],
    ["Food", "食品"],
    ["Bundle", "套装"],
    ["Collect", "自提"],
    ["Delivery", "配送"],
    ["Set", "设置"],
    ["New", "新增"],
    ["Growth", "增长"],
    ["Picking", "拣货"],
    ["Finished", "成品"],
    ["WIP", "在制品"],
    ["Pack", "包装"],
    ["Slots", "时段"],
    ["Window", "窗口"],
    ["Volume", "数量"],
    ["Source", "来源"],
    ["Module", "模块"],
    ["Output", "产出"],
    ["Claims", "索赔"],
    ["Serials", "序列号"],
    ["Worksheet", "工单"],
    ["Channel", "渠道"],
    ["Location", "库位"],
    ["Stock", "库存"],
    ["School", "学校"],
    ["Supplier", "供应商"],
    ["Shop", "门店"],
    ["Main WH", "主仓"],
    ["Size", "尺码"],
    ["Mixed", "混合"],
    ["Owner", "负责人"],
    ["Status", "状态"],
    ["Count", "数量"],
    ["Order", "订单"],
    ["Type", "类型"],
    ["Date", "日期"],
    ["Customer", "客户"],
    ["Venue", "场地"],
    ["Event", "活动"],
    ["Project", "项目"],
    ["Client", "客户"],
    ["Stage", "阶段"],
    ["Site", "现场"],
    ["Time", "时间"],
    ["Job", "工单"],
    ["Part", "零件"],
    ["Product", "产品"],
    ["Slot", "时段"],
    ["Mode", "模式"],
    ["Farm", "养殖场"],
    ["Batch", "批次"],
    ["Water", "水质"],
    ["Soil", "土壤"],
    ["Plankton", "浮游生物"],
    ["Mon", "周一"],
    ["Tue", "周二"],
    ["Wed", "周三"],
    ["Thu", "周四"],
    ["Fri", "周五"],
    ["Sat", "周六"],
    ["Sun", "周日"],
    ["Jan", "1月"],
    ["Feb", "2月"],
    ["Mar", "3月"],
    ["Apr", "4月"],
    ["May", "5月"],
    ["Jun", "6月"],
    ["Jul", "7月"],
    ["Aug", "8月"],
    ["Business", "商业"],
    ["Benefits", "效益"],
    ["Ops", "运营"],
    ["Admin", "行政"],
    ["Finance", "财务"],
    ["Sales", "销售"],
    ["Production", "生产"],
    ["Quality", "质量"],
    ["Warehouse", "仓库"],
    ["Logistics", "物流"],
    ["Marketing", "市场"],
    ["eCommerce", "eCommerce"],
    ["Accounting", "Accounting"],
    ["Inventory", "Inventory"],
    ["Purchase", "Purchase"],
    ["Reporting", "Reporting"],
    ["Website", "Website"],
    ["POS", "POS"],
    ["CRM", "CRM"],
    ["Portal", "Portal"],
    ["Invoicing", "Invoicing"],
    ["Documents", "Documents"],
    ["Payments", "Payments"],
    ["Approvals", "Approvals"],
    ["Helpdesk", "Helpdesk"],
    ["Appointments", "Appointments"],
    ["Subscriptions", "Subscriptions"],
    ["Shipping", "Shipping"],
    ["Contacts", "Contacts"],
    ["Membership", "Membership"],
    ["Expiry", "Expiry"],
    ["Analytic", "Analytic"],
    ["Dashboards", "Dashboards"],
    ["Operating Units", "Operating Units"],
    ["Work Orders", "Work Orders"],
    ["Manufacturing", "Manufacturing"],
    ["Field Service", "Field Service"],
    ["Shop Floor", "Shop Floor"],
    ["API Sync", "API Sync"],
    ["Import Tools", "Import Tools"],
    ["Employees", "Employees"],
    ["Payroll", "Payroll"],
    ["Projects", "Projects"],
    ["Loyalty", "Loyalty"],
    ["MRP", "MRP"],
]

INDEX_CARDS = {
    "temple-ngo-religious-operations": {
        "tag_en": "Temple / NGO", "tag_zh": "寺庙 / 非营利",
        "title_en": "Temple & Religious Organization", "title_zh": "寺庙与宗教组织",
        "desc_en": "Online merit offerings, ceremony scheduling, memorial dedications, donor CRM, subscriptions, and temple accounting.",
        "desc_zh": "在线功德供奉、法会排期、追思牌位、捐赠人 CRM、订阅续费与寺庙财务一体化管理。",
    },
    "industrial-equipment-wholesale": {
        "tag_en": "Wholesale", "tag_zh": "批发分销",
        "title_en": "Industrial Equipment Wholesale", "title_zh": "工业设备批发",
        "desc_en": "Portal order sync, part-number catalog, SO-to-PO procurement, delivery modes, and package GST invoicing.",
        "desc_zh": "门户订单同步、料号目录、SO 转 PO 采购、交付模式与分组 GST 开票。",
    },
    "social-recreational-club": {
        "tag_en": "Club", "tag_zh": "俱乐部",
        "title_en": "Social/Recreational Club", "title_zh": "社交/休闲俱乐部",
        "desc_en": "Membership enrolment, facility booking, events and banquets, restaurant POS, MSL billing, and member portal.",
        "desc_zh": "会员入会、设施预约、活动与宴会、餐厅 POS、MSL 账单与会员门户。",
    },
    "precision-cnc-manufacturing": {
        "tag_en": "Manufacturing", "tag_zh": "制造",
        "title_en": "Precision CNC Manufacturing", "title_zh": "精密 CNC 制造",
        "desc_en": "High-mix job shop — operation routing, material tracking, multi-level MRP, shop-floor QC, CoC, and billing with Odoo.",
        "desc_zh": "多品种小批量机加工 — 工艺路线、物料跟踪、多级 MRP、车间质检、CoC 与 Odoo 一体化开票。",
    },
    "positive": {
        "tag_en": "Renovation", "tag_zh": "装修",
        "title_en": "Renovation Company", "title_zh": "装修公司",
        "desc_en": "Project operations, quotation detail, purchasing continuity, approvals, and billing visibility.",
        "desc_zh": "项目运营、报价明细、采购延续、审批流程与开票可视化。",
    },
    "cleantric": {
        "tag_en": "Cleaning", "tag_zh": "清洁服务",
        "title_en": "Cleaning Service Company", "title_zh": "清洁服务公司",
        "desc_en": "Online booking, cleaner selection, scheduling, address capture, order follow-through, and payment flow.",
        "desc_zh": "在线预约、保洁员选择、排班调度、地址采集、订单跟进与支付流程。",
    },
    "public-safety": {
        "tag_en": "Manufacturing", "tag_zh": "制造",
        "title_en": "Public Safety Equipment", "title_zh": "公共安全设备",
        "desc_en": "Firefighting equipment manufacturing, BOM planning, production, QC, serial traceability, and service.",
        "desc_zh": "消防设备制造、BOM 计划、生产、质检、序列号追溯与现场服务。",
    },
    "secondary-process-manufacturing": {
        "tag_en": "Manufacturing", "tag_zh": "制造",
        "title_en": "Secondary Process Manufacturing", "title_zh": "二次加工制造",
        "desc_en": "Customer-supplied material control, traveler-based routing, IQC/OQC, split and rework handling, and return documentation.",
        "desc_zh": "客供料管控、流转单工艺路线、IQC/OQC、拆批返工处理与退货文档。",
    },
    "food-manufacturing-operations": {
        "tag_en": "Food Manufacturing", "tag_zh": "食品制造",
        "title_en": "Food Manufacturing Operations", "title_zh": "食品制造运营",
        "desc_en": "Fresh food and sushi production, kitchen-to-outlet planning, traceability, replenishment, and reporting.",
        "desc_zh": "鲜食与寿司生产、中央厨房到门店计划、追溯、补货与报表。",
    },
    "attendance-timesheet-hardware": {
        "tag_en": "Attendance", "tag_zh": "考勤",
        "title_en": "Attendance & Hardware Integration", "title_zh": "考勤与硬件集成",
        "desc_en": "Biometric device connectivity, punch logs, shift control, Excel payroll exports, and timesheet review.",
        "desc_zh": "生物识别设备对接、打卡日志、班次管控、Excel 薪资导出与工时表审核。",
    },
    "translation-service-operations": {
        "tag_en": "Translation", "tag_zh": "翻译",
        "title_en": "Translation Service Operations", "title_zh": "翻译服务运营",
        "desc_en": "Language project quoting, job control, delivery tracking, reviewer coordination, invoicing, and customer follow-through.",
        "desc_zh": "语言项目报价、作业管控、交付跟踪、审校协调、开票与客户跟进。",
    },
    "gym-equipment-sales-service": {
        "tag_en": "Gym Equipment", "tag_zh": "健身器材",
        "title_en": "Gym Equipment Sales & Service", "title_zh": "健身器材销售与服务",
        "desc_en": "B2B and B2C equipment sales, delivery coordination, maintenance service, warranty tracking, and customer support.",
        "desc_zh": "B2B 与 B2C 设备销售、交付协调、维保服务、保修跟踪与客户支持。",
    },
    "specialty-chemical-trading": {
        "tag_en": "Chemical Trading", "tag_zh": "化工贸易",
        "title_en": "Specialty Chemical Trading", "title_zh": "特种化学品贸易",
        "desc_en": "Chemical sales, procurement, stock visibility, compliance documents, delivery follow-up, and customer account control.",
        "desc_zh": "化学品销售、采购、库存可视化、合规文档、交付跟进与客户账期管控。",
    },
    "school-uniform-seller": {
        "tag_en": "Retail", "tag_zh": "零售",
        "title_en": "School Uniform Seller", "title_zh": "校服销售",
        "desc_en": "Uniform sales, product sizing, school-linked ordering, inventory control, and customer fulfilment.",
        "desc_zh": "校服销售、尺码管理、学校关联订购、库存管控与客户履约。",
    },
    "corporate-hamper-gifting": {
        "tag_en": "Gifting", "tag_zh": "礼品",
        "title_en": "Corporate Hamper Gifting", "title_zh": "企业礼盒馈赠",
        "desc_en": "Multi-recipient hamper ordering, eCommerce and counter sales, delivery control, gifting messages, and follow-up.",
        "desc_zh": "多收件人礼盒订购、eCommerce 与柜台销售、配送管控、贺卡留言与跟进。",
    },
    "pet-food-accessories-ecommerce": {
        "tag_en": "Pet Retail", "tag_zh": "宠物零售",
        "title_en": "Pet Food & Accessories eCommerce", "title_zh": "宠物食品与用品电商",
        "desc_en": "Premium online retail, product bundles, loyalty, fulfilment, delivery tracking, and customer account follow-up.",
        "desc_zh": "高端在线零售、产品套装、会员积分、履约配送、物流跟踪与客户跟进。",
    },
    "scaffolding": {
        "tag_en": "Rental", "tag_zh": "租赁",
        "title_en": "Scaffolding Rental & Project Claims", "title_zh": "脚手架租赁与项目索赔",
        "desc_en": "Rental orders, site deliveries, returns, claims, warehouse movement, billing, and project visibility.",
        "desc_zh": "租赁订单、现场交付、归还、索赔、仓库调拨、开票与项目可视化。",
    },
    "bakery-ecommerce-operations": {
        "tag_en": "Bakery", "tag_zh": "烘焙",
        "title_en": "Bakery E-Commerce & Production Control", "title_zh": "烘焙电商与生产管控",
        "desc_en": "Online cake ordering, delivery or collection slots, kitchen capacity control, memberships, and loyalty.",
        "desc_zh": "在线蛋糕订购、配送或自提时段、厨房产能管控、会员与积分忠诚计划。",
    },
    "lab-testing-process": {
        "tag_en": "Lab Testing", "tag_zh": "实验室检测",
        "title_en": "Lab Testing Process", "title_zh": "实验室检测流程",
        "desc_en": "Lab testing workflow, sample tracking, quality checks, result reporting, and operational follow-through.",
        "desc_zh": "检测工作流、样品跟踪、质量检查、结果报告与运营跟进。",
    },
}

# Per-project translations loaded from companion module
from zh_project_translations import PROJECTS  # noqa: E402

COMMON_EN = {pair[0] for pair in COMMON}

def build_projects() -> dict[str, dict[str, str]]:
    result: dict[str, dict[str, str]] = {}
    missing: dict[str, list[str]] = {}
    for slug, strings in ALL_STRINGS.items():
        mapping = dict(PROJECTS.get(slug, {}))
        for en in strings:
            if en in FOOTER or en in COMMON_EN:
                continue
            if en not in mapping:
                missing.setdefault(slug, []).append(en)
        result[slug] = mapping
    if missing:
        report = Path(__file__).parent / "zh_missing.json"
        report.write_text(json.dumps(missing, ensure_ascii=False, indent=2), encoding="utf-8")
        total = sum(len(v) for v in missing.values())
        print(f"WARNING: {total} missing translations written to {report.name}")
    return result


def main() -> None:
    payload = {
        "common": COMMON,
        "index_cards": INDEX_CARDS,
        "projects": build_projects(),
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
