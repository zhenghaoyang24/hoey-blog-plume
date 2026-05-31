import { defineNavbarConfig } from "vuepress-theme-plume";

export default defineNavbarConfig([
  { text: "Home", link: "/", icon: "material-symbols:home-outline" },
  {
    text: "Posts",
    link: "/blog/",
    icon: "material-symbols:post-outline",
    activeMatch: "^/blog/",
  },
  {
    text: "More",
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
    icon: "hugeicons:more",
    activeMatch: "^/more/",
  },
]);
