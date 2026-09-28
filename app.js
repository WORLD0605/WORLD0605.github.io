(() => {
  const data = window.SITE_CONTENT;
  if (!data) return;

  const byId = (id) => document.getElementById(id);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch { return ""; }
  };
  const externalLink = (label, url, className) => {
    const link = el("a", className, label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  };

  document.title = `${data.name} · 项目、想法与收藏`;
  byId("site-brand").textContent = data.brand || data.name;
  byId("person-name").textContent = data.name;
  byId("person-role").textContent = data.role;
  byId("person-location").textContent = data.location;
  byId("hero-description").textContent = data.hero;
  byId("about-text").textContent = data.about;
  byId("footer-name").textContent = `© ${new Date().getFullYear()} ${data.name}`;
  document.querySelector('meta[name="description"]').content = data.hero;

  const projectList = byId("projects-list");
  (data.projects || []).forEach((project, index) => {
    const card = el("article", `project-card accent-${project.accent || "blue"}${index === 0 ? " project-featured" : ""}`);
    const top = el("div", "project-top");
    top.append(el("span", "project-category", project.category), el("span", "project-year", project.year));
    const body = el("div", "project-body");
    body.append(el("span", "project-number", String(index + 1).padStart(2, "0")), el("h3", "", project.title), el("p", "", project.description));
    const bottom = el("div", "project-bottom");
    const tags = el("div", "project-tags");
    (project.tags || []).forEach((tag) => tags.append(el("span", "", tag)));
    bottom.append(tags);
    const url = safeUrl(project.url);
    if (url) bottom.append(externalLink("查看项目 ↗", url, "project-link"));
    card.append(top, body, bottom);
    projectList.append(card);
  });
  if (!projectList.children.length) projectList.append(el("p", "empty-message", "项目正在整理中，之后会在这里更新。"));

  const ideasList = byId("ideas-list");
  (data.ideas || []).forEach((idea) => {
    const card = el("article", "idea-card");
    card.append(el("span", "idea-number", idea.number), el("span", "idea-symbol", "✳"), el("h3", "", idea.title), el("p", "", idea.description), el("span", "idea-status", idea.status));
    ideasList.append(card);
  });
  if (!ideasList.children.length) ideasList.append(el("p", "empty-message", "新的想法正在路上。"));

  const bookmarksList = byId("bookmarks-list");
  (data.bookmarks || []).forEach((bookmark, index) => {
    const url = safeUrl(bookmark.url);
    if (!url) return;
    const row = externalLink("", url, "bookmark-row");
    row.append(el("span", "bookmark-index", String(index + 1).padStart(2, "0")));
    const main = el("span", "bookmark-main");
    main.append(el("strong", "", bookmark.title), el("span", "", bookmark.description));
    row.append(main, el("span", "bookmark-category", bookmark.category), el("span", "bookmark-arrow", "↗"));
    bookmarksList.append(row);
  });
  if (!bookmarksList.children.length) bookmarksList.append(el("p", "empty-message", "收藏的链接会出现在这里。"));

  const tags = byId("about-tags");
  (data.skills || []).forEach((skill) => tags.append(el("span", "", skill)));
  const contactLinks = byId("contact-links");
  if (data.email) {
    const email = el("a", "contact-link", `邮箱 ${data.email} ↗`);
    email.href = `mailto:${data.email}`;
    contactLinks.append(email);
  }
  const github = safeUrl(data.github);
  if (github) contactLinks.append(externalLink("GitHub ↗", github, "contact-link"));
  if (!contactLinks.children.length) contactLinks.append(el("span", "contact-pending", "联系方式将在这里更新"));
})();
