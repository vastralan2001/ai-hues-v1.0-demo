# AI_Hues 产品需求说明（PRD v1.0 · 对齐签字用）

**产品名称：** AI_Hues（对外品牌可写作 **AI Hues**）  
**Slogan：** Beyond Stars, Into Hues, Where Repos Blend（超越星标，进入色域，仓库在此融合）  
**MVP / Demo 主语言：** 英文站（与国际化路线一致；本文档为中文评审版）  
**文档状态：** 草案，待干系人确认  
**依据：** 业务口述需求 + 参考文档 `AI_Hues_PRD.agent.final.pdf` + 与 [LibHunt](https://www.libhunt.com/)、[HelloGitHub](https://hellogithub.com/) 的定位对照  

**英文对照版：** [`PRD-AI_Hues-v1-EN-product.md`](./PRD-AI_Hues-v1-EN-product.md)  
**Hues 评分维度（工程六维 + 色环映射）：** [`HUES-scoring-dimensions.md`](./HUES-scoring-dimensions.md)  
**Phase 0 多页原型：** [`../demo/index.html`](../demo/index.html)（顶栏、中英切换、`/articles` 内嵌 **Hues 六维快照表** + GitHub 元数据；演示分见 `demo/scripts/regenerate_articles_data.py`）

---

## 1. 问题与机会

- **想法 → 开源缺口：** 想做产品的人（含无强开发背景者）很难把模糊 **想法** 快速变成 **少量相关、可信的开源候选**，且易被「只看 Star」误导。  
- **评估缺口：** Star 语义贫乏、且缺乏时间维度；用户需要 **可解释的多维信号** 与对比依据。  
- **组合缺口（后期）：** 找到仓库后，**串联集成** 与 **落地成可访问的英文独立站** 仍难；需 **Agent 辅助** 闭环。

**与参考站差异：** LibHunt 偏大规模趋势与替代品发现；HelloGitHub 偏新手友好策展。AI_Hues 增加 **以想法为入口的发现**、**色环语义化质量**、**精选 Showcase + 文章 + 评论**，以及面向 **交付** 的 **Blend / Agent** 路线。

---

## 2. 产品愿景与定位

**愿景：** 用 **可感知的多维「色相」模型** 替代单一热度指标，让用户沿 **想法 → 相关仓库 → 证据 →（可选）组合交付** 完成路径。

**一句话定位：** AI_Hues 是 **英文优先** 的开源发现平台：把用户的 **想法** 变成 **带解释、可排序的候选开源项目清单**，并以 **光谱 / 色环语义** 呈现质量与契合度，配套 **Showcase、文章、讨论区**，演进为 **Agent 引导组合 → 独立站发布**。

### 2.1 光谱 / Hues 评分（产品与交互约定）

- **审计层（0–100，六轴）：** **DOCS、SEC、COM、MTN、TST、PERF** — 定义、信号与色环映射见 [`HUES-scoring-dimensions.md`](./HUES-scoring-dimensions.md)；为 **项目详情、列表徽章、Hues 特写文章** 的默认维度集。  
- **Hue（领域）** 保持 **分类**（语言 + topics / 类目），**不做** 0–100 分，避免「领域」与「质量分」混淆。  
- **Explore 默认排序（与原型 04 对齐）：** MVP 为 **Star 降序（H2）**；**Hues** 在 **详情页 + 文章** 作主叙事；后续可切默认排序为 **Hues 综合（H1/H3）**。  
- **溯源：** 正式分需展示 **算法版本 + 时间戳**；Phase 0 静态站为 **可复现占位分**，非 GitHub 官方评级。

---

## 3. 目标用户（在参考 PRD 三类画像基础上扩展）

| 细分 | 人群 | 核心任务（JTBD） |
|------|------|------------------|
| **想法构建者（新增）** | 无经验～初级、创始人、学生 | 「我有一个想法，该用哪些开源项目撑起来？」 |
| **Morgan（参考）** | 独立开发者 / 副业 | 快速拼栈、减少试错与集成坑 |
| **Alex（参考）** | 技术负责人 | 可辩护的多维评估、降低选型风险 |
| **Jordan（参考）** | 布道师 / 维护者 | 趋势、策展、叙事与清单 |

**非开发者体验护栏：** 每个项目必备白话 **「能做什么」**、**「适合 / 不适合」**；可选 **复杂度**、**前置知识** 标签；引导文案不预设用户会熟练用 Git。

---

## 4. 分阶段范围（对齐用）

### Phase 0 — 品牌与多页原型（当前阶段）

- **多页静态原型**（`demo/`：首页、`idea-result.html`、`explore.html`、`project.html`、`articles.html` + `article-view.html`、`showcases.html`、`blend.html`、`legal.html`、`privacy.html`），**中英 UI**、统一顶栏，**10 篇** 基于 GitHub 元数据的 **Hues 特写**（`demo/assets/articles-data.js`）。  
- 目标：验证 **价值主张**、**Hues 六维快照 + Hue 领域条**、**信息架构**、评论与合规占位。  
- **打开方式：** 本地双击 `index.html` 或 `python3 -m http.server` 后访问 `http://127.0.0.1:8765/`。

### Phase 1 — MVP（发现 + 信任）

1. **想法 → 光谱搜索（Spectral Search）**  
   - 自然语言 **想法** 输入（可选筛选：领域、许可证、语言等）。  
   - 结果：排序后的仓库列表，每条含 **为何匹配** 的解释 + 外链至上游托管。

2. **项目详情页**  
   - **概述**：白话 + 技术摘要。  
   - **Hues / Spectrum 分**：与 [`HUES-scoring-dimensions.md`](./HUES-scoring-dimensions.md) 中 **DOCS / SEC / COM / MTN / TST / PERF** 一致；色环通道 **仅作可视化映射**，须配 **数值 + 文案**。  
   - **色相关联：** **Hue = 领域（分类）** + 六维雷达 / 条形（MVP：管线或离线批算）。  
   - **Showcase 精选案例集**（运营策展）。  
   - **文章**：**Hues 特写** 模板（摘要、Hue 条、六维表、何时深挖）+ **开放投稿 + 审核**（见原型 `05-articles.md`）；与项目页、Hub 互链。  
   - **评论区**（需登录、审核、反垃圾）— 具体策略见 **§8 待决项**。

3. **Hub / 专题**  
   - 类 LibHunt 的按语言 / 主题聚合 + 类 HelloGitHub 的 **新手友好** 入口。

### Phase 2 — 探索加深

- **Chromatic Map（色域地图）**：如领域 vs 健康度的二维投影。  
- **Living Gradient（生命渐变）**：维护轨迹与生命周期感。  
- **Crossfade**：两仓库或两版本平滑对比。  
- **Palette Match（调色板匹配）**：可选 GitHub 授权，个性化推荐。

### Phase 3 — Where Repos Blend（Agent）

- **Blend Engine：** 兼容性、集成蓝图、缺口分析、融合配方（Blend Recipes）等（同参考 PRD）。  
- **Agent 模式：** 用户勾选若干仓库 → Agent 给出架构与集成步骤 → 产出可部署的 **英文静态独立站**（优先静态导出；CMS / 托管方案另议）。

---

## 5. 核心信息架构（站点地图）

- `/` — 首页（想法 CTA、趋势、主题入口）  
- `/explore` — 浏览与筛选  
- `/idea` — 想法优先流程（搜索与会话留存）  
- `/p/{slug}` — 项目详情（光谱、Showcase、文章、评论）  
- `/articles`、`/articles/{slug}` — 文章  
- `/showcases` — 精选案例集  
- `/blend`（Phase 3）— 组合工作台  
- `/legal`、`/privacy` — 合规  

---

## 6. 非功能需求

- **性能：** 营销页 LCP 目标；大地图放 Phase 2。  
- **无障碍：** 文本与交互满足 WCAG 2.1 AA 方向；**颜色不作为唯一信息通道**（必须配文案与数值）。  
- **来源与版权：** 明确标注上游仓库与许可证。  
- **安全与社区：** 评论举报、频控；可选教育场景只读模式。

---

## 7. 成功指标（初版）

- 从输入想法到产出 **3 个** 高相关候选的 **时间**。  
- 进入 **详情页** 且发生 **Showcase / 文章** 互动的会话占比。  
- 回访与调色板保存（Phase 2）。  
- Phase 3：想法最终生成 **可导出站点产物** 的比例。

---

## 7.1 设计与交互（IA + 当前 Phase 0 实现）

**IA 推荐（不变）：** **B 为主阅读路径**（想法 + Showcase + 文章）+ **A 作 Hues / 光谱视觉点缀** + **C 为 Explore 高密度**（见 [`prototype-pages/04-explore.md`](./prototype-pages/04-explore.md)：**卡片默认** + **Dense/表格占位**）。

**Phase 0 已实现：** 统一 **深色** 壳（`demo/assets/styles.css`）+ 顶栏 **`demo/assets/app.js`** 中英切换（`localStorage`）。**不再**使用早期「三主题下拉」单页 Demo；A/B/C 作为 **后续换肤** 的设计选项保留。

| 方案 | 在原型中的体现 |
|------|----------------|
| **B** | 首页区块顺序：想法 → 关键词 → Idea showcase → Featured showcases → Latest articles |
| **C** | **Explore**：语言 / 主题 / 许可证筛选 + 搜索 + **Dense 视图占位** |
| **A** | 深色 + 渐变 hero 氛围；后续可加强色域地图 |

---

## 8. 待决问题（需产品确认）

1. **评论：** MVP 用 **站内自研** 还是 **嵌入 Giscus** 等以换工期？  
2. **数据：** 首期是否 **仅 GitHub**，是否扩展多托管？  
3. **文章：** **开放投稿 + 审核**（与原型 `05` 一致）；运营工具链待建。  
4. **Agent 产出：** 仅 **静态导出** 还是 **托管子域**？  
5. **品牌与域名：** 对外 `AI Hues` 与 URL（如 `aihues.com`）的最终写法与法务核查。

---

## 9. 签字核对清单

- [ ] 用户画像与分阶段边界  
- [x] Spectrum 维度集合 — **冻结为 DOCS/SEC/COM/MTN/TST/PERF** + Hue 领域分类（[`HUES-scoring-dimensions.md`](./HUES-scoring-dimensions.md)）  
- [ ] 评论与账号体系策略  
- [ ] MVP / Phase 2 / Phase 3 切割  
- [ ] 英文优先与后续多语言  

**确认人：** ______________ **日期：** ______________  

---

*PRD v1 草案结束。*
