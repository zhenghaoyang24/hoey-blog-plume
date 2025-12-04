import { defineNavbarConfig } from "vuepress-theme-plume";

export const navbar = defineNavbarConfig([
  { text: "首页", link: "/", icon: "flat-color-icons:home" },
  {
    text: "博客",
    link: "/blog/",
    icon: "fxemoji:note",
    activeMatch: "^(/blog/|/article/)",
  },
  {
    text: "笔记",
    items: [
      { text: "Web前端", link: "/web/start/", icon: "logos:web-dev-icon" },
      { text: "备忘录", link: "/memo/start/", icon: "emojione:memo" },
    ],
    icon: "emojione:green-book",
    activeMatch: "^/(web|memo)/",
  },
  {
    text: "Q&A",
    icon: "openmoji:interview",
    link: "/qa/guide/",
  },
  {
    text: "更多",
    items: [
      {
        text: "友情链接",
        link: "/more/friends/",
        icon: "icon-park:friends-circle",
      },
      {
        text: "我的项目",
        link: "/more/projects/",
        icon: "material-icon-theme:folder-project-open",
      },
      {
        text: "资源导航",
        link: "/more/resources/",
        icon: "logos:sitepoint",
      },
    ],
    icon: "icon-park:more-two",
    activeMatch: "^/more/",
  },
]);
