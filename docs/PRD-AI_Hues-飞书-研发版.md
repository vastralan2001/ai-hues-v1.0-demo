# AI_Hues 产品需求说明（研发版 · 便于飞书阅读）

| 字段 | 内容 |
|------|------|
| **文档用途** | 给研发/设计/测试快速对齐：产品要做什么、**Hues 怎么算**、页面有哪些、**当前 Demo 长什么样** |
| **版本** | v1.0 研发摘要（与仓库内 `PRD-AI_Hues-v1-ZH-product.md` / EN 对齐） |
| **详细设计稿** | `docs/HUES-scoring-dimensions.md`（六维 + 色环映射） |
| **原型逐页规格** | `docs/prototype-pages/01-home.md` … `08-legal.md` + `00-ALIGNMENT-STATUS.md` |
| **如何使用** | **方式 A：** 全文复制粘贴到飞书文档；**方式 B：** 飞书「导入 Markdown」上传本文件（若支持）。粘贴后建议把「附录路径」改成你们仓库的飞书内链或代码库链接。 |

---

## 一、产品一句话

**AI_Hues**：英文优先的开源发现与社区站——用户从 **想法** 出发，得到 **带解释的开源候选**，用 **Hues 六维（0–100）+ Hue 领域（分类）** 呈现质量与适配；配套 **Showcase、文章（含 Hues 特写）、站内评论**；远期 **Blend / Agent** 做多仓组合与导出站点。

**Slogan：** Beyond Stars, Into Hues, Where Repos Blend.

---

## 二、要解决什么问题

| 问题 | 说明 |
|------|------|
| 想法 → 仓库 | 非资深用户难把「一句话想法」变成少量 **相关、可信** 的 OSS 候选 |
| 评估 | Star **不能**代表质量与维护；需要 **可解释、多维** 信号 |
| 交付（远期） | 选型后 **组合、落地、发布** 仍难 → Phase 3 Agent |

---

## 三、目标用户（谁在用）

| 角色 | 诉求 |
|------|------|
| 想法构建者（新增） | 有 idea，不知道用哪些开源能撑起来 |
| 独立开发者 / 副业 | 快速拼栈、少踩坑 |
| 技术负责人 | 可辩护的多维评估 |
| 布道 / 维护者 | 趋势、策展、内容 |

**体验要求：** 项目页必须有白话 **是什么 / 适合谁**；不预设用户会 Git；**颜色不得作为唯一信息通道**（须配数字与文案，无障碍）。

---

## 四、分阶段做什么（研发排期锚点）

| 阶段 | 范围摘要 | 研发关注点 |
|------|------------|------------|
| **Phase 0（当前）** | 多页 **静态原型**（无真实后端）：首页、想法结果、Explore、项目详情、文章列表/详情、Showcases、Blend 占位、Legal/Privacy；**中英 UI**；10 篇基于 GitHub 元数据的 **Hues 特写**（演示分） | 对齐交互与信息架构；前端可整体迁移到 Next/Astro 等 |
| **Phase 1 MVP** | **想法搜索**（自然语言 + 筛选）→ **结果列表**；**项目详情**（六维真分或半自动 + Showcase + 链文章）；**站内评论**（项目 + **文章**两套）；**文章/案例投稿 + 审核**；Hub/专题 | 账号、审核队列、评论反垃圾、GitHub 数据同步、评分管线 v0 |
| **Phase 2** | Chromatic Map、Living Gradient、Crossfade、Palette Match（可选 OAuth） | 可视化与性能、图谱数据 |
| **Phase 3** | Blend Engine、Agent 导出英文静态站 | 编排、生成、部署流水线 |

---

## 五、信息架构（页面清单）

以下为 **目标路由**；当前静态原型文件名在括号内（便于对照仓库）。

| 路由 | 功能 | 原型文件（Phase 0） |
|------|------|----------------------|
| `/` | 首页：想法 CTA、关键词①、Idea showcase、Featured showcases、Latest articles | `demo/index.html` |
| `/idea/result` | 想法结果：匹配理由、Hue、外链、仓库案例节选、评论入口 | `demo/idea-result.html` |
| `/explore` | 浏览：语言/主题/许可证、搜索、排序（默认 Star）、卡片/Dense 切换 | `demo/explore.html` |
| `/p/{slug}` | 项目详情：概述、**Hues 六维**、Showcase、文章、**#comments**、Blend 预告 | `demo/project.html` |
| `/articles` | 文章列表 | `demo/articles.html` |
| `/articles/{slug}` | 文章详情（Hues 表 + 正文 + **文章评论**） | `demo/article-view.html?id=` |
| `/showcases` | 全局案例列表 + 筛选 + 投稿入口占位 | `demo/showcases.html` |
| `/showcases/{id}` | 案例详情 | `demo/showcase.html` |
| `/blend` | Phase 3 占位 | `demo/blend.html` |
| `/legal`、`/privacy` | 合规占位 | `demo/legal.html`、`privacy.html` |

**关键交互（已对齐）：**

- 首页提交想法 → **独立结果页**（不同页展示结果）。  
- 首页关键词 **①** 只 **追加到想法框**，**不** 跳 Explore。  
- Explore：**P0** 含许可证筛选；默认排序 **Star（H2）**，Hues 主叙事在详情与文章。  
- 评论：**站内社区**；项目评论在 **`/p/{slug}#comments`**；文章单独评论区（与项目评论 **数据分域**）。  
- 文章 / 案例：**开放投稿 + 审核（E2 / C2）**。

---

## 六、Hues 评分体系（研发必读）

### 6.1 双层模型

| 层级 | 是什么 | 研发注意 |
|------|--------|----------|
| **审计层** | **六维 0–100**：DOCS、SEC、COM、MTN、TST、PERF | 存分 + 版本号 + 时间戳；可解释字段（为何是这个分） |
| **色环层** | Sat/Lum/Temp/Opacity/Gradient **映射到六维或领域** | 只做展示；**Hue = 领域分类**，**不是** 0–100 |

### 6.2 六维定义（与 UI 文案键一致）

| 键 | 中文 | 含义摘要 | 典型数据来源（V1 方向） |
|----|------|----------|---------------------------|
| DOCS | 文档与上手 | README、示例、变更说明 | README 解析、官网链 |
| SEC | 安全与供应链 | 漏洞、依赖、许可证 | OSV、Dependabot、LICENSE |
| COM | 社区健康 | Issue/PR、贡献者 | GitHub API、讨论区 |
| MTN | 维护与活力 | 最近提交、发版节奏 | commits、releases、默认分支 |
| TST | 测试与 CI | CI 可见度、工程规范 | Actions、checks、badge |
| PERF | 性能与体量 | 资源/包体/benchmark | 领域规则、release 资产、issue 标签 |

**Star：** 不单独作为主维度；可作为 COM/MTN 的 **辅助特征**。

### 6.3 色环 → 六维（展示映射）

| 色环 | 映射 |
|------|------|
| Hue | **领域标签**（语言 + topics / 类目） |
| Saturation | COM |
| Luminance | DOCS + TST（或产品定合成公式） |
| Temperature | MTN |
| Opacity | SEC |
| Gradient | Blend 预留 / 多仓关系（单仓可先 N/A） |

### 6.4 分阶段实现期望

| 阶段 | 分数来源 |
|------|----------|
| Demo（当前） | **可复现占位**（见 `demo/scripts/regenerate_articles_data.py`），免责声明必须展示 |
| MVP | 部分维粗算 + 人工抽检 |
| V1 | 六维全自动 + 同品类 Z-score + 可解释面板 |

---

## 七、非功能与合规

- 性能：营销页 LCP；大地图 Phase 2。  
- 无障碍：WCAG 2.1 AA 方向；**色 + 数 + 文** 同时存在。  
- 版权：标注上游仓库与许可证；转载文章需署名与原文链接（R1）。  
- 社区：评论举报、频控、审核；文章与项目评论 **分表或分 namespace**。

---

## 八、成功指标（初版，供埋点）

- 想法输入 → **3 个** 高相关候选的 **耗时**  
- 详情页 + Showcase / 文章 **互动率**  
- Phase 3：**导出站点** 转化率（远期）

---

## 九、仍待产品/架构拍板（飞书里可 @ 产品）

| # | 事项 |
|---|------|
| 1 | 评论 MVP：**全自研** vs **Giscus 等嵌入** |
| 2 | 数据源：**仅 GitHub** 首期是否 OK |
| 3 | Agent 产出：**仅静态导出** vs **托管子域** |
| 4 | 品牌域名与法务 |

---

## 十、研发分工建议（粗颗粒）

| 方向 | 工作内容 |
|------|----------|
| **前端** | 路由与页面骨架；想法流 / Explore / 详情 / 文章 / 案例；中英 i18n；Hues 表与雷达组件；Dense 视图；无障碍 |
| **后端** | 用户与权限、评论、文章/案例 **审核工作流**、搜索与排序 API、速率限制 |
| **数据/平台** | GitHub（及后续 forge）同步 job；**六维评分管线**、版本化存储、可解释 JSON |
| **算法/LLM** | 想法 → 候选排序与「匹配理由」生成；与评分特征融合（注意幻觉与引用） |
| **测试** | 核心路径用例：想法提交、结果列表、详情 Hues、评论发布、审核状态机 |

---

## 附录：仓库内路径（复制到飞书可改为代码库链接）

```
docs/PRD-AI_Hues-v1-ZH-product.md      # 中文 PRD 全文
docs/PRD-AI_Hues-v1-EN-product.md    # 英文 PRD 全文
docs/HUES-scoring-dimensions.md       # Hues 六维 + 色环设计稿
docs/prototype-pages/                 # 逐页原型对齐记录
demo/index.html                       # 静态原型入口
demo/assets/articles-data.js          # 10 篇 Hues 特写数据（含 hues_html_*）
demo/scripts/regenerate_articles_data.py
```

---

*本文档为研发向摘要，细节以仓库内 Markdown 原文为准；更新时请同步修改本飞书版或重新导出。*
