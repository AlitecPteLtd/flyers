#!/usr/bin/env python3
"""Generate EN/ZH index pages and index-zh.html flyers from zh-translations.json."""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
I18N_PATH = ROOT / "i18n" / "zh-translations.json"
PROJECTS_DIR = ROOT / "projects"

LANG_SWITCHER_CSS = """
    .lang-switcher {
      position: fixed;
      top: 14px;
      right: 14px;
      z-index: 10000;
      display: flex;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.96);
      border: 1px solid #cbd9ef;
      box-shadow: 0 8px 24px rgba(6, 42, 111, 0.12);
      font-family: "PingFang SC", "Microsoft YaHei", Arial, Helvetica, sans-serif;
      font-size: 13px;
      font-weight: 700;
    }

    .lang-switcher a {
      color: #062a6f;
      text-decoration: none;
      padding: 4px 10px;
      border-radius: 999px;
    }

    .lang-switcher a.is-active {
      background: #062a6f;
      color: #fff;
    }
"""

INDEX_CARD_TEMPLATE = """      <div class="card">
        <a class="card-main" href="{href}">
          <span class="tag">{tag}</span>
          <h2>{title}</h2>
          <p>{desc}</p>
        </a>
        <div class="lang-links"><a href="{en_href}">English</a><span>·</span><a href="{zh_href}">中文</a></div>
      </div>
"""

INDEX_PAGE_TEMPLATE = """<!doctype html>
<html lang="{lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <style>
    :root {{
      --navy: #062a6f;
      --blue: #2879e3;
      --gold: #f6aa17;
      --ink: #07194f;
      --line: #cbd9ef;
    }}

    * {{ box-sizing: border-box; }}

    body {{
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      font-family: {font_family};
      background:
        radial-gradient(circle at 82% 12%, rgba(40, 121, 227, .16), transparent 22%),
        radial-gradient(circle at 8% 86%, rgba(246, 170, 23, .16), transparent 24%),
        linear-gradient(180deg, #eef4ff 0%, #ffffff 56%, #eef4ff 100%);
    }}

    .page {{
      width: min(1120px, calc(100% - 40px));
      margin: 0 auto;
      padding: 52px 0 64px;
    }}

    .top-nav {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 18px;
    }}

    .top-nav a {{
      color: var(--navy);
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
    }}

    .hero {{
      display: grid;
      grid-template-columns: 116px 1fr;
      gap: 28px;
      align-items: center;
      margin-bottom: 34px;
      padding: 28px;
      border: 1px solid rgba(203, 217, 239, .9);
      border-radius: 24px;
      background: rgba(255,255,255,.88);
      box-shadow: 0 18px 46px rgba(6, 42, 111, .12);
    }}

    .logo {{ width: 116px; height: 116px; object-fit: contain; }}

    h1 {{
      margin: 0;
      color: var(--navy);
      font-size: clamp(34px, 5vw, 64px);
      line-height: .95;
      text-transform: uppercase;
      letter-spacing: -.03em;
    }}

    .subtitle {{
      margin: 14px 0 0;
      max-width: 760px;
      font-size: 18px;
      line-height: 1.45;
      color: #33476f;
    }}

    .bar {{
      width: 86px;
      height: 5px;
      margin-top: 18px;
      border-radius: 99px;
      background: var(--gold);
    }}

    .grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }}

    .card {{
      position: relative;
      min-height: 198px;
      padding: 22px;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: rgba(255,255,255,.95);
      box-shadow: 0 14px 34px rgba(6, 42, 111, .08);
      color: var(--ink);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }}

    .card::after {{
      content: "";
      position: absolute;
      right: -34px;
      bottom: -48px;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: rgba(40, 121, 227, .09);
      pointer-events: none;
    }}

    .card:hover {{
      transform: translateY(-2px);
      border-color: #8bb9ef;
      box-shadow: 0 18px 42px rgba(6, 42, 111, .14);
    }}

    .card-main {{
      position: relative;
      z-index: 1;
      display: block;
      flex: 1;
      text-decoration: none;
      color: inherit;
    }}

    .tag {{
      display: inline-block;
      margin-bottom: 16px;
      padding: 6px 10px;
      border-radius: 999px;
      background: #eef5ff;
      color: var(--blue);
      font-size: 12px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: .04em;
    }}

    .card h2 {{
      position: relative;
      z-index: 1;
      margin: 0 0 12px;
      color: var(--navy);
      font-size: 24px;
      line-height: 1.08;
    }}

    .card p {{
      position: relative;
      z-index: 1;
      margin: 0 0 14px;
      color: #33476f;
      font-size: 14px;
      line-height: 1.45;
      font-weight: 700;
    }}

    .lang-links {{
      position: relative;
      z-index: 1;
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: auto;
      font-size: 12px;
      font-weight: 800;
      color: #597094;
    }}

    .lang-links a {{
      color: var(--blue);
      text-decoration: none;
    }}

    .footer {{
      margin-top: 28px;
      color: #597094;
      font-size: 14px;
      text-align: center;
    }}

    @media (max-width: 860px) {{
      .hero {{ grid-template-columns: 1fr; gap: 18px; }}
      .grid {{ grid-template-columns: 1fr; }}
    }}
  </style>
</head>
<body>
  <main class="page">
    <div class="top-nav">
      <a href="../index.html">← {home_label}</a>
      <div>
        <a href="../en/index.html"{en_active}>English</a>
         ·
        <a href="../zh/index.html"{zh_active}>中文</a>
      </div>
    </div>
    <section class="hero">
      <img class="logo" src="../projects/positive/positive-assets/alitec-logo.jpeg" alt="Alitec" />
      <div>
        <h1>{heading}</h1>
        <p class="subtitle">{subheading}</p>
        <div class="bar"></div>
      </div>
    </section>

    <section class="grid" aria-label="Flyer links">
{cards}
    </section>

    <div class="footer">{footer}</div>
  </main>
</body>
</html>
"""

HUB_PATH = Path(__file__).resolve().parents[1] / "index.html"


def write_hub_page() -> None:
    hub = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Alitec Odoo Flyers</title>
  <style>
    :root {
      --navy: #062a6f;
      --blue: #2879e3;
      --gold: #f6aa17;
      --ink: #07194f;
      --line: #cbd9ef;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      font-family: "PingFang SC", "Microsoft YaHei", Arial, Helvetica, sans-serif;
      background:
        radial-gradient(circle at 82% 12%, rgba(40, 121, 227, .16), transparent 22%),
        radial-gradient(circle at 8% 86%, rgba(246, 170, 23, .16), transparent 24%),
        linear-gradient(180deg, #eef4ff 0%, #ffffff 56%, #eef4ff 100%);
    }

    .page {
      width: min(920px, calc(100% - 40px));
      margin: 0 auto;
      padding: 72px 0 80px;
      text-align: center;
    }

    .logo {
      width: 116px;
      height: 116px;
      object-fit: contain;
      margin-bottom: 24px;
    }

    h1 {
      margin: 0;
      color: var(--navy);
      font-size: clamp(38px, 6vw, 68px);
      line-height: .95;
      text-transform: uppercase;
      letter-spacing: -.03em;
    }

    .subtitle {
      margin: 18px auto 0;
      max-width: 680px;
      font-size: 18px;
      line-height: 1.5;
      color: #33476f;
    }

    .bar {
      width: 86px;
      height: 5px;
      margin: 22px auto 34px;
      border-radius: 99px;
      background: var(--gold);
    }

    .lang-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      margin-top: 10px;
    }

    .lang-card {
      display: block;
      padding: 34px 28px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background: rgba(255,255,255,.95);
      box-shadow: 0 18px 42px rgba(6, 42, 111, .1);
      text-decoration: none;
      color: var(--ink);
    }

    .lang-card:hover {
      transform: translateY(-2px);
      border-color: #8bb9ef;
    }

    .lang-card h2 {
      margin: 0 0 10px;
      color: var(--navy);
      font-size: 34px;
    }

    .lang-card p {
      margin: 0;
      color: #33476f;
      font-size: 15px;
      line-height: 1.45;
      font-weight: 700;
    }

    .footer {
      margin-top: 30px;
      color: #597094;
      font-size: 14px;
    }

    @media (max-width: 720px) {
      .lang-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <main class="page">
    <img class="logo" src="projects/positive/positive-assets/alitec-logo.jpeg" alt="Alitec" />
    <h1>Alitec Odoo Flyers</h1>
    <p class="subtitle">Choose a language to browse all industry solution flyers. Each page supports editing, draft saving, HTML download, A4 PDF export, and print PNG export.</p>
    <p class="subtitle">选择语言浏览全部行业方案宣传单。每个页面均支持编辑、草稿保存、HTML 下载、A4 PDF 导出与打印 PNG 导出。</p>
    <div class="bar"></div>
    <section class="lang-grid" aria-label="Language selection">
      <a class="lang-card" href="en/index.html">
        <h2>English</h2>
        <p>Browse all 19 industry solution flyers in English.</p>
      </a>
      <a class="lang-card" href="zh/index.html">
        <h2>中文</h2>
        <p>浏览全部 19 个行业方案中文宣传单。</p>
      </a>
    </section>
    <div class="footer">Published at https://alitecpteltd.github.io/flyers/</div>
  </main>
</body>
</html>
"""
    HUB_PATH.write_text(hub, encoding="utf-8")


def load_data() -> dict:
    with I18N_PATH.open(encoding="utf-8") as fh:
        return json.load(fh)


def sort_pairs(pairs: list[list[str]]) -> list[list[str]]:
    return sorted(pairs, key=lambda item: len(item[0]), reverse=True)


def apply_replacements(content: str, pairs: list[list[str]]) -> str:
    for source, target in pairs:
        if source:
            content = content.replace(source, target)
    return content


def inject_en_lang_switcher(content: str) -> str:
    switcher = (
        '<nav class="lang-switcher" aria-label="Language">'
        '<a class="is-active" href="index.html">English</a>'
        '<a href="index-zh.html">中文</a>'
        "</nav>"
    )
    if "lang-switcher" not in content:
        content = content.replace("</style>", LANG_SWITCHER_CSS + "\n  </style>", 1)
        content = content.replace("<body>", "<body>\n  " + switcher, 1)
    return content


def inject_lang_switcher(content: str, slug: str) -> str:
    switcher = (
        f'<nav class="lang-switcher" aria-label="Language">'
        f'<a href="index.html">English</a>'
        f'<a class="is-active" href="index-zh.html">中文</a>'
        f"</nav>"
    )
    if "lang-switcher" not in content:
        content = content.replace("</style>", LANG_SWITCHER_CSS + "\n  </style>", 1)
        content = content.replace("<body>", "<body>\n  " + switcher, 1)
    content = re.sub(r'<html lang="[^"]*">', '<html lang="zh-Hans">', content, count=1)
    content = content.replace(
        "font-family: Arial, Helvetica, sans-serif;",
        'font-family: "PingFang SC", "Microsoft YaHei", Arial, Helvetica, sans-serif;',
    )
    if "Solution Flyer" in content and "<title>" in content:
        content = re.sub(
            r"<title>([^<]+)</title>",
            lambda m: f"<title>{html.unescape(m.group(1)).replace('Flyer', '宣传单')}</title>",
            content,
            count=1,
        )
    content = re.sub(
        r'data-flyer-version="([^"]+)"',
        lambda m: f'data-flyer-version="{m.group(1)}-zh"',
        content,
        count=1,
    )
    return content


def build_index_page(lang: str, data: dict) -> str:
    cards = data["index_cards"]
    order = data.get("index_order") or list(cards.keys())
    rendered_cards = []
    for slug in order:
        if slug not in cards:
            continue
        card = cards[slug]
        if lang == "zh":
            rendered_cards.append(
                INDEX_CARD_TEMPLATE.format(
                    href=f"../projects/{slug}/index-zh.html",
                    tag=card["tag_zh"],
                    title=card["title_zh"],
                    desc=card["desc_zh"],
                    en_href=f"../projects/{slug}/index.html",
                    zh_href=f"../projects/{slug}/index-zh.html",
                )
            )
        else:
            rendered_cards.append(
                INDEX_CARD_TEMPLATE.format(
                    href=f"../projects/{slug}/",
                    tag=card["tag_en"],
                    title=card["title_en"],
                    desc=card["desc_en"],
                    en_href=f"../projects/{slug}/index.html",
                    zh_href=f"../projects/{slug}/index-zh.html",
                )
            )

    if lang == "zh":
        return INDEX_PAGE_TEMPLATE.format(
            lang="zh-Hans",
            title="Alitec Odoo 宣传单",
            font_family='"PingFang SC", "Microsoft YaHei", Arial, Helvetica, sans-serif',
            home_label="语言选择",
            en_active="",
            zh_active=' style="font-weight:900;color:#062a6f"',
            heading="Alitec Odoo 宣传单",
            subheading="浏览全部行业方案中文宣传单。每个页面均支持编辑、草稿保存、HTML 下载、A4 PDF 导出与打印 PNG 导出。",
            cards="\n".join(rendered_cards),
            footer="发布地址：https://alitecpteltd.github.io/flyers/",
        )

    return INDEX_PAGE_TEMPLATE.format(
        lang="en",
        title="Alitec Odoo Flyers",
        font_family="Arial, Helvetica, sans-serif",
        home_label="Language",
        en_active=' style="font-weight:900;color:#062a6f"',
        zh_active="",
        heading="Alitec Odoo Flyers",
        subheading="Browse all industry solution flyers. Each page includes editable text, draft saving, HTML download, A4 PDF export, and print PNG export.",
        cards="\n".join(rendered_cards),
        footer="Published at https://alitecpteltd.github.io/flyers/",
    )


def generate_zh_flyer(slug: str, data: dict) -> None:
    src = PROJECTS_DIR / slug / "index.html"
    dst = PROJECTS_DIR / slug / "index-zh.html"
    if not src.exists():
        print(f"skip missing: {slug}")
        return
    content = src.read_text(encoding="utf-8")
    pairs = sort_pairs(data.get("common", []) + data.get("projects", {}).get(slug, []))
    content = apply_replacements(content, pairs)
    content = inject_lang_switcher(content, slug)
    dst.write_text(content, encoding="utf-8")
    print(f"generated {dst.relative_to(ROOT)}")


def patch_en_flyer(slug: str) -> None:
    path = PROJECTS_DIR / slug / "index.html"
    if not path.exists():
        return
    content = path.read_text(encoding="utf-8")
    updated = inject_en_lang_switcher(content)
    if updated != content:
        path.write_text(updated, encoding="utf-8")
        print(f"patched {path.relative_to(ROOT)}")


def main() -> None:
    data = load_data()
    (ROOT / "en").mkdir(exist_ok=True)
    (ROOT / "zh").mkdir(exist_ok=True)
    write_hub_page()
    (ROOT / "en" / "index.html").write_text(build_index_page("en", data), encoding="utf-8")
    (ROOT / "zh" / "index.html").write_text(build_index_page("zh", data), encoding="utf-8")
    print("generated index hub + en/zh sub-index pages")

    for slug in data.get("index_order") or data.get("index_cards", {}):
        patch_en_flyer(slug)
        generate_zh_flyer(slug, data)


if __name__ == "__main__":
    main()
