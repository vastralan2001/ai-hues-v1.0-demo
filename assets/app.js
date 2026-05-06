(function () {
  var STORAGE = "ai_hues_lang";
  var STR = {
    en: {
      brand: "AI_Hues",
      navHome: "Home",
      navExplore: "Explore",
      navArticles: "Articles",
      navShowcases: "Showcases",
      navBlend: "Blend",
      navLegal: "Legal",
      navPrivacy: "Privacy",
      langSwitch: "中文",
      homeEyebrow: "Beyond stars · Into hues · Where repos blend",
      homeH1: "Start with an idea. Find repos that fit.",
      homeLede:
        "Describe what you want to build. We match open-source projects with plain-language reasons, hue tags, and community space on AI_Hues.",
      homeIdeaLabel: "Your idea",
      homeIdeaPh: "e.g. A small English web app: upload short audio, get a transcript…",
      homeSearchBtn: "Find repos",
      homeKwTitle: "Quick keywords (append to idea)",
      homeIdeaShowcaseTitle: "Idea showcase (inspiration)",
      homeFeatShowTitle: "Featured showcases (real builds)",
      homeFeatShowAll: "View all showcases",
      homeArticlesTitle: "Latest articles",
      homeArticlesAll: "View all articles",
      ideaTitle: "Idea results",
      ideaSub: "Matched repos for:",
      ideaCardWhy: "Why it matches",
      ideaCardShow: "Showcase on this repo",
      ideaCardComments: "Comments on AI_Hues",
      exploreTitle: "Explore",
      exploreSub: "Browse by language, topic, and license. Default sort: Stars (H2).",
      exploreSearch: "Search name / description",
      exploreLang: "Language",
      exploreTopic: "Topic",
      exploreLic: "License",
      exploreSort: "Sort",
      exploreView: "View",
      exploreCards: "Cards",
      exploreDense: "Dense / table",
      projectTitle: "Project",
      projectSpectrum: "Spectrum (demo)",
      projectShow: "Showcases",
      projectArticles: "Related articles",
      projectComments: "Comments (AI_Hues community)",
      projectBlend: "Related repos / Blend preview",
      articlesTitle: "Articles",
      articleSampleTitle: "Sample article",
      showcasesTitle: "Showcases",
      showcaseDetailTitle: "Showcase detail",
      blendTitle: "Blend (coming soon)",
      blendSub: "Multi-repo composition and agent export — Phase 3.",
      legalTitle: "Legal",
      privacyTitle: "Privacy",
      footerNote: "Static prototype · no backend",
    },
    zh: {
      brand: "AI_Hues",
      navHome: "首页",
      navExplore: "浏览",
      navArticles: "文章",
      navShowcases: "案例",
      navBlend: "融合",
      navLegal: "条款",
      navPrivacy: "隐私",
      langSwitch: "English",
      homeEyebrow: "超越星标 · 进入色域 · 仓库在此融合",
      homeH1: "从一个想法开始，找到合适的开源项目。",
      homeLede:
        "描述你想做什么。我们会用通俗理由、Hue 标签匹配仓库，并在 AI_Hues 站内提供讨论空间。",
      homeIdeaLabel: "你的想法",
      homeIdeaPh: "例如：英文小工具，用户上传短音频，得到文字稿……",
      homeSearchBtn: "查找仓库",
      homeKwTitle: "快捷关键词（追加到想法框）",
      homeIdeaShowcaseTitle: "想法灵感（Idea Showcase）",
      homeFeatShowTitle: "精选落地案例（Featured showcases）",
      homeFeatShowAll: "查看全部案例",
      homeArticlesTitle: "最新文章",
      homeArticlesAll: "查看全部文章",
      ideaTitle: "想法匹配结果",
      ideaSub: "与以下想法相关的仓库：",
      ideaCardWhy: "匹配理由",
      ideaCardShow: "本仓库收录案例",
      ideaCardComments: "站内评论",
      exploreTitle: "浏览 Explore",
      exploreSub: "按语言、主题、许可证筛选。默认排序：Star（H2）。",
      exploreSearch: "搜索仓库名 / 描述",
      exploreLang: "语言",
      exploreTopic: "主题",
      exploreLic: "许可证",
      exploreSort: "排序",
      exploreView: "视图",
      exploreCards: "卡片",
      exploreDense: "紧凑 / 表格",
      projectTitle: "项目详情",
      projectSpectrum: "光谱评分（演示）",
      projectShow: "案例展示",
      projectArticles: "相关文章",
      projectComments: "评论（AI_Hues 社区）",
      projectBlend: "相关仓库 / Blend 预告",
      articlesTitle: "文章",
      articleSampleTitle: "示例文章",
      showcasesTitle: "案例库",
      showcaseDetailTitle: "案例详情",
      blendTitle: "Blend（即将推出）",
      blendSub: "多仓库组合与 Agent 导出 — Phase 3。",
      legalTitle: "法律信息",
      privacyTitle: "隐私政策",
      footerNote: "静态原型 · 无后端",
    },
  };

  function getLang() {
    try {
      var s = localStorage.getItem(STORAGE);
      if (s === "zh" || s === "en") return s;
    } catch (e) {}
    return "en";
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE, lang);
    } catch (e) {}
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
  }

  function applyI18n(lang) {
    var d = STR[lang];
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (d[k] != null) el.textContent = d[k];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-placeholder");
      if (d[k] != null) el.setAttribute("placeholder", d[k]);
    });
  }

  function navInner(path, lang) {
    var d = STR[lang];
    function a(href, key, file) {
      var active = path === file;
      if (file === "articles.html" && (path === "articles.html" || path === "article.html")) active = true;
      if (file === "showcases.html" && (path === "showcases.html" || path === "showcase.html")) active = true;
      var c = active ? ' class="active"' : "";
      return '<a href="' + href + '"' + c + ">" + d[key] + "</a>";
    }
    return (
      '<a class="logo" href="./index.html">' +
      d.brand +
      '</a><nav class="nav" aria-label="Main">' +
      a("./index.html", "navHome", "index.html") +
      a("./explore.html", "navExplore", "explore.html") +
      a("./articles.html", "navArticles", "articles.html") +
      a("./showcases.html", "navShowcases", "showcases.html") +
      a("./blend.html", "navBlend", "blend.html") +
      a("./legal.html", "navLegal", "legal.html") +
      a("./privacy.html", "navPrivacy", "privacy.html") +
      '</nav><button type="button" class="lang-btn" id="lang-btn" aria-label="Language">' +
      d.langSwitch +
      "</button>"
    );
  }

  function refreshNav() {
    var mount = document.getElementById("nav-mount");
    if (!mount) return;
    var path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    var lang = getLang();
    mount.innerHTML = '<div class="wrap header-inner">' + navInner(path, lang) + "</div>";
    var btn = document.getElementById("lang-btn");
    if (btn) {
      btn.onclick = function () {
        setLang(getLang() === "en" ? "zh" : "en");
        refreshNav();
        applyI18n(getLang());
      };
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    refreshNav();
    applyI18n(getLang());
  });
})();
