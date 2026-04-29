#!/usr/bin/env python3
"""Regenerate ../assets/articles-data.js from ../data/github-articles.json (offline)."""
import hashlib
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
DIMS = [
    ("DOCS", "Docs & onboarding", "文档与上手", "README / examples / changelog visibility (proxy)."),
    ("SEC", "Safety & supply chain", "安全与供应链", "License clarity + dependency risk posture (proxy)."),
    ("COM", "Community health", "社区健康", "Stars/discussions/contributor signals (proxy)."),
    ("MTN", "Maintenance & momentum", "维护与活力", "Recent activity + release cadence (proxy)."),
    ("TST", "Tests & CI", "测试与 CI", "CI visibility + engineering hygiene (proxy)."),
    ("PERF", "Performance & footprint", "性能与体量", "Runtime/resource expectations for the category (proxy)."),
]


def hue_scores(full_name: str, stars: int) -> dict:
    h = int(hashlib.sha256(full_name.encode()).hexdigest(), 16)
    out = {}
    for i, (k, *_rest) in enumerate(DIMS):
        base_s = 55 + ((h >> (i * 7)) & 28)
        bump = min(8, max(0, (stars or 0) // 30000))
        out[k] = min(92, base_s + bump)
    return out


def note_en(score: int) -> str:
    if score >= 82:
        return "Strong for this scale (demo)."
    if score >= 68:
        return "Mid-field; verify in your context."
    return "Double-check before committing."


def note_zh(score: int) -> str:
    if score >= 82:
        return "该体量下偏强（演示）。"
    if score >= 68:
        return "中等偏上，请结合场景复核。"
    return "建议重点人工核对。"


def table_html(scores: dict, lang: str) -> str:
    rows_html = []
    for k, en_l, zh_l, desc in DIMS:
        s = scores[k]
        note = note_en(s) if lang == "en" else note_zh(s)
        label = en_l if lang == "en" else zh_l
        d2 = desc if lang == "en" else "定义见 docs/HUES-scoring-dimensions.md。"
        rows_html.append(
            f"<tr><td><strong>{k}</strong><br/><span class='hues-dim'>{label}</span></td>"
            f"<td class='hues-score'>{s}</td><td class='hues-note'>{note}<br/><span class='hues-desc'>{d2}</span></td></tr>"
        )
    cap = "Hues snapshot (0–100, demo — not GitHub official)" if lang == "en" else "Hues 快照（0–100，演示分 — 非 GitHub 官方）"
    th = ("Dimension", "Score", "Note") if lang == "en" else ("维度", "分", "说明")
    disc = (
        "Reproducible placeholders from public-metadata heuristics. Production replaces with audited pipelines (see docs/HUES-scoring-dimensions.md)."
        if lang == "en"
        else "可复现占位分；上线后由审计管线替换，见 docs/HUES-scoring-dimensions.md。"
    )
    return (
        f"<div class='hues-wrap'><h3 class='hues-h'>{cap}</h3><table class='hues-table'><thead><tr>"
        f"<th>{th[0]}</th><th>{th[1]}</th><th>{th[2]}</th></tr></thead><tbody>"
        + "".join(rows_html)
        + f"</tbody></table><p class='hues-disc'>{disc}</p></div>"
    )


def main() -> None:
    rows = json.load(open(ROOT / "data" / "github-articles.json"))
    articles = []
    for i, r in enumerate(rows):
        fn = r["full_name"]
        desc = (r.get("description") or "No one-line description on GitHub.").replace('"', "'")
        stars = r.get("stargazers_count") or 0
        lang_g = r.get("language") or "—"
        topics = r.get("topics") or []
        lic = r.get("license") or "—"
        url = r["html_url"]
        scores = hue_scores(fn, stars)
        tag = ", ".join(topics[:4]) if topics else (lang_g or "general")

        tldr_en = f"**TL;DR:** If your goal involves “{desc}”, {fn} is a frequent ecosystem default. Use the **Hues** table as first-pass triage—then validate in your own stack."
        tldr_zh = f"**摘要：** 若目标与「{desc}」相关，{fn} 在生态里常被默认考虑。请用 **Hues 六维** 做首轮筛选，再在你自己的栈里验证。"
        when_en = "**When to dig deeper:** run your own SCA/CVE tooling for SEC; read benchmarks/issues for PERF if latency or cost dominates."
        when_zh = "**何时深挖：** SEC 请跑自有 SCA/CVE 工具；若延迟/成本敏感请直接看 PERF 相关 benchmark 与 issue。"

        body_en = "\n\n".join(
            [
                tldr_en,
                f"**Hue · domain (categorical):** `{tag}` — map placement only, not a 0–100 score.",
                f"**Repository:** [{fn}]({url})",
                f"**One-liner (GitHub):** {desc}",
                f"**Stars:** {stars:,} · **Primary language:** {lang_g} · **License (SPDX):** {lic}",
                f"**Topics:** {', '.join(topics) if topics else '—'}",
                "**How to use this article:** read the Hues snapshot, then README + Releases on GitHub; join AI_Hues project threads later.",
                when_en,
            ]
        )
        body_zh = "\n\n".join(
            [
                tldr_zh,
                f"**Hue · 领域（分类）：** `{tag}` — 仅用于地图/导航，不是 0–100 分。",
                f"**仓库：** [{fn}]({url})",
                f"**一句话（GitHub）：** {desc}",
                f"**Star：** {stars:,} · **主语言：** {lang_g} · **许可证（SPDX）：** {lic}",
                f"**Topics：** {', '.join(topics) if topics else '—'}",
                "**怎么用：** 先看 Hues 表，再读 README/Releases；后续可在 AI_Hues 项目讨论区交流。",
                when_zh,
            ]
        )

        articles.append(
            {
                "id": i,
                "slug": fn.replace("/", "-"),
                "full_name": fn,
                "html_url": url,
                "title_en": f"Hues spotlight: {fn}",
                "title_zh": f"Hues 特写：{fn}",
                "body_en": body_en,
                "body_zh": body_zh,
                "hues_html_en": table_html(scores, "en"),
                "hues_html_zh": table_html(scores, "zh"),
                "hues_scores": scores,
                "stars": stars,
                "language": lang_g,
                "license": lic,
                "topics": topics,
            }
        )

    out = ROOT / "assets" / "articles-data.js"
    out.write_text(
        "// Regenerated by scripts/regenerate_articles_data.py\n"
        "window.AI_HUES_ARTICLES = "
        + json.dumps(articles, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print("Wrote", out, "count", len(articles))


if __name__ == "__main__":
    main()
