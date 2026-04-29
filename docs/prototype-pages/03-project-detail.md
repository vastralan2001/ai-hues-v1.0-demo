# 项目详情页 `/p/{slug}` — 原型规格（**已确认**）

**定位：** 单个开源项目在 AI_Hues 上的 **主阵地**：解释、多维评分、案例、**站内社区评论**、外链与延伸阅读。

---

## 信息顺序（自上而下）

1. **顶栏** — 仓库名、`owner/repo`、Hue 标签、**外链 GitHub**、语言/许可证摘要  
2. **概述** — 白话「是什么 / 适合谁」+ 一句技术边界  
3. **Hues / Spectrum（光谱）** — **六维审计分** DOCS、SEC、COM、MTN、TST、PERF（定义见 [`../HUES-scoring-dimensions.md`](../HUES-scoring-dimensions.md)）+ 雷达或条形；**Hue** 单独作 **领域分类**，非 0–100  
4. **Showcase（仓库维度）** — 完整案例列表或卡片墙（与结果页节选呼应，「更多」在此展开）  
5. **站内文章 / 策展链接** — 指向 `/articles/...` 或经审核的 GitHub README/Blog 外链（与 PRD Phase 1 一致）  
6. **Comments（站内社区）** — **`#comments` 锚点**；列表 + 排序（最新优先）；发帖需登录（MVP 可后置，原型先做列表占位 + 输入框禁用态）  
7. **相关仓库 / Blend 预告** — **需要**；原型阶段 **一行文案 + 按钮占位**，不做真实推荐算法  
8. **页脚** — 举报入口、上次数据更新时间（信任）

---

## 已确认拍板（产品回复）

| # | 问题 | 结论 |
|---|------|------|
| 1 | 详情页是否要「相关仓库 / Blend 预告」区块？ | **要**（原型占位即可） |
| 2 | Showcase 与 `/showcases` 全局列表页？ | **都要**：详情页 **完整** 展示 + **单独** `/showcases` 全局列表页 |
| 3 | 评论区是否嵌在详情页底部？ | **是**（主讨论区） |
| 4 | 独立 `/p/{slug}/comments` URL？ | **先不用** |

---

## 与结果页的衔接

- [`02-idea-result.md`](./02-idea-result.md) 每条卡片的「评论」→ 进入本页 **`#comments`**。  
- 站内评论数据 **按 `slug`（或内部 projectId）** 归属，不与 GitHub Issue 混库。

---

## P1 / Later（本页可选）

| 优先级 | 内容 |
|--------|------|
| P1 | 版本切换对比（Crossfade 概念）、分享图 |
| Later | Palette Match、Chromatic Map 深链 |

---

*下一待对齐块：[`00-ALIGNMENT-STATUS.md`](./00-ALIGNMENT-STATUS.md) 中的 **04 `/explore`**、**05 `/articles`**、**06 `/showcases`**（可与全局案例清单合并一页规格）、**07 `/blend`**、**08 合规**。*
