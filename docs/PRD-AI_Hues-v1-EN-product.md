# AI_Hues — Product Requirements (v1.0, align for sign-off)

**Product name:** AI_Hues (public brand: **AI Hues**)  
**Slogan:** Beyond Stars, Into Hues, Where Repos Blend  
**Primary locale (MVP demo & marketing site):** English  
**Document status:** Draft for stakeholder confirmation  
**Sources:** User brief + reference PRD (`AI_Hues_PRD.agent.final.pdf`) + positioning vs [LibHunt](https://www.libhunt.com/), [HelloGitHub](https://hellogithub.com/)  
**Chinese PRD (same version):** [`PRD-AI_Hues-v1-ZH-product.md`](./PRD-AI_Hues-v1-ZH-product.md)  
**Hues scoring (canonical dimensions + color mapping):** [`HUES-scoring-dimensions.md`](./HUES-scoring-dimensions.md)  
**Phase 0 multi-page prototype:** [`../demo/index.html`](../demo/index.html) (nav, bilingual toggle, `/articles` with **Hues six-dim snapshot** tables fed from GitHub metadata + deterministic demo scores — see `demo/scripts/regenerate_articles_data.py`)

---

## 1. Problem & opportunity

- **Idea → OSS gap:** Users who want to build (including non-developers) struggle to turn a vague idea into a **shortlist of relevant, trustworthy open-source projects** without drowning in stars-only rankings.
- **Evaluation gap:** Stars are semantically poor and time-blind; users need **multi-dimensional signals** and **explainable** comparisons.
- **Composition gap (later):** Even after discovery, **wiring projects together** and shipping a minimal product remains hard; an **agent-assisted** path to a **standalone English site** closes the loop.

**Differentiation vs references:** LibHunt emphasizes trending/alternatives at scale; HelloGitHub emphasizes beginner-friendly curation. AI_Hues adds **idea-native discovery**, **color-wheel–grounded quality semantics**, **curated showcases + editorial**, **community comments**, and a **future blend/agent** lane for **shipping**.

---

## 2. Product vision & positioning

**Vision:** Replace one-dimensional popularity with a **perceptual, multi-hue** model of repo quality and fit, so users navigate from **idea** → **relevant repos** → **evidence** → **(optional) composed delivery**.

**One-line positioning:** AI_Hues is an **English-first discovery platform** that turns an **idea** into **ranked, explained open-source options**—visualized as a **spectrum**—with **showcases**, **articles**, and **discussion**, evolving toward **agent-guided composition** into a **standalone site**.

### 2.1 Spectrum / Hues scoring (product + UX contract)

- **Audit layer (0–100, six axes):** **DOCS**, **SEC**, **COM**, **MTN**, **TST**, **PERF** — definitions, signals, and color-wheel mapping live in [`HUES-scoring-dimensions.md`](./HUES-scoring-dimensions.md). These are the **default** dimensions for project detail, list badges, and **editorial “Hues spotlight”** articles.  
- **Hue (domain)** remains **categorical** (language + topics / taxonomy), **not** a 0–100 score — avoids conflating “field on the color wheel” with “quality”.  
- **Explore default sort (aligned with prototype 04):** **Stars descending for MVP speed (H2)**; Hues scores are primary in **detail + articles**; roadmap to switch default sort to **Hues composite** (H1/H3) without breaking list density.  
- **Provenance:** Any published score must show **method version + timestamp**; Phase 0 uses **reproducible placeholders** in the static demo, not claims of GitHub-official ratings.

---

## 3. Target users (extends reference PRD)

| Segment | Who | Job-to-be-done |
|--------|-----|----------------|
| **Idea builder (new)** | Non-dev to junior; founders; students | “I have an idea; what OSS can power it?” |
| **Morgan (reference)** | Indie / side-project builder | Fast stack assembly, fewer dead ends |
| **Alex (reference)** | Tech lead | Defensible, multidimensional evaluation |
| **Jordan (reference)** | Advocate / maintainer | Trends, curation, narrative |

**Non-dev guardrails:** Plain-language **“what it does”** and **“when to use / not”** on every project; optional **complexity** and **prereq** tags; no assumption of Git fluency in onboarding copy.

---

## 4. Scope by phase (for alignment)

### Phase 0 — Marketing + demo (current)

- **Multi-page static prototype** (`demo/`: home → `idea-result.html`, `explore.html`, `project.html`, `articles.html` + `article-view.html`, `showcases.html`, `blend.html`, `legal.html`, `privacy.html`) with **EN/zh UI strings**, shared nav, and **GitHub-sourced repo metadata** for ten **Hues spotlight** articles (see `demo/assets/articles-data.js`).  
- Communicates **value prop**, **Hues six-dim snapshot + Hue domain strip**, **IA**, and **community placeholders** (comments) for tests.

### Phase 1 — MVP (discovery + trust)

1. **Idea → Spectral Search**  
   - Natural-language **idea** input (and optional filters: domain, license, language).  
   - Results: ranked repos with **relevance explanation** (why matched) + link-out to source.

2. **Project detail page**  
   - **Overview** (plain English + technical summary).  
   - **Hues / Spectrum score** — same **six audit dimensions** as [`HUES-scoring-dimensions.md`](./HUES-scoring-dimensions.md); **color wheel** channels map to these for visualization (never color-only).  
   - **Chromatic cue:** **Hue = domain** (categorical) + radar / bars for the six scores (MVP: pipeline or curated offline).  
   - **Showcase gallery** (editorial **Featured case studies**).  
   - **Articles:** **Hues spotlight** templates (TL;DR, Hue strip, six-dim table, “when to dig deeper”) + **open submission + review** (per prototype `05-articles.md`); link from project and hub.  
   - **Comments** (authenticated; moderation; spam controls)—**open questions** in §8.

3. **Hubs**  
   - Topic pages (like LibHunt languages/topics) + **beginner-friendly** rails (HelloGitHub spirit).

### Phase 2 — Exploration depth

- **Chromatic Map** (2D projection: domain vs health, etc.).  
- **Living Gradient** (lifecycle / maintenance trajectory).  
- **Crossfade** (compare two repos/versions).  
- **Palette Match** (optional GitHub OAuth): personalize recommendations.

### Phase 3 — Where Repos Blend (agent)

- **Blend Engine:** compatibility, integration blueprint, gap analysis, blend recipes (per reference PRD).  
- **Agent mode:** user selects subset of repos → agent proposes architecture + integration steps → generates **deployable English standalone site** (static export first; CMS/hosting TBD).

---

## 5. Core information architecture (sitemap)

- `/` — Home (idea CTA, trending, topics)  
- `/explore` — Browse / filters  
- `/idea` — Idea-first flow (search + saved sessions)  
- `/p/{slug}` — Project detail (spectrum, showcases, articles, comments)  
- `/articles`, `/articles/{slug}` — Editorial  
- `/showcases` — Curated case studies  
- `/blend` (Phase 3) — Composition workspace  
- `/legal`, `/privacy` — Compliance  

---

## 6. Non-functional requirements

- **Performance:** LCP targets for marketing pages; map deferred to Phase 2.  
- **Accessibility:** WCAG 2.1 AA for text UI; color is **never the only** channel (always pair with labels/scores).  
- **Provenance:** Clear attribution to upstream repos and licenses.  
- **Safety:** Comment abuse reporting; rate limits; optional read-only mode for schools.

---

## 7. Success metrics (initial)

- Time from idea input to **shortlist of 3** relevant repos.  
- % sessions with **detail page** view + **showcase/article** engagement.  
- Repeat visits / saved palettes (Phase 2).  
- Phase 3: % ideas reaching **exported site** artifact.

---

## 7.1 Design & interaction schemes (IA + shipped Phase 0 demo)

**IA (unchanged recommendation):** **B-first reading path** (idea + showcases + articles) + **A accents** (Hues / spectrum blocks) + **C as Explore density** (see [`prototype-pages/04-explore.md`](./prototype-pages/04-explore.md): **Cards** default + **Dense/table placeholder**).

**Phase 0 prototype implementation:** single **dark** shell (`demo/assets/styles.css`) + **global header** (`demo/assets/app.js`) with **EN ⇄ 中文** toggle (persists in `localStorage`). **Not** the earlier three-theme switcher — themes A/B/C remain **design options** for a future skin pass.

| Scheme | Role in prototype |
|--------|-------------------|
| **A · Aurora spectrum** | Visual language reference for marketing / later theme |
| **B · Editorial** | **Home order**: Idea CTA → keywords → Idea showcase → Featured showcases → Latest articles |
| **C · Terminal grid** | **`/explore`**: filters + search + **Dense/table** toggle (table body placeholder per 04-L3) |

---

## 8. Open questions (need your confirmation)

1. **Comments:** Full on-site threads vs. embed (e.g. Giscus on GitHub discussions) for MVP speed?  
2. **Data pipeline:** GitHub-only first vs. multi-forge (GitLab, etc.)?  
3. **Editorial:** **Open submission + review** for articles & showcases (per prototype `05` / `06`); ops tooling TBD.  
4. **Agent deliverable:** Static Next/Astro export only vs. hosted subdomain per user?  
5. **Brand token:** Public-facing `AI Hues` vs. URL `aihues.com` / `ai-hues` — legal/trademark check offline.

---

## 9. Sign-off checklist

- [ ] Personas & phase scope  
- [x] Spectrum dimension set — **frozen to DOCS/SEC/COM/MTN/TST/PERF** + Hue domain categorical ([`HUES-scoring-dimensions.md`](./HUES-scoring-dimensions.md))  
- [ ] Comment & auth strategy  
- [ ] MVP vs. Phase 2/3 boundaries  
- [ ] English-first + future locales  

**Approved by:** ______________ **Date:** ______________  

---

*End of PRD v1 draft.*
