import { defineClientConfig } from "vuepress/client";
import "./theme/styles/index.css";
import RepoCard from "vuepress-theme-plume/features/RepoCard.vue";
import AllFriendContent from "./theme/components/AllFriendContent.vue";

// 网格首页
import GridHome from "./theme/components/gridhome/GridHome.vue";

// 代码首页
import CodeHome from "./theme/components/codehome/CodeHome.vue";

// Profile 首页
import ProfileHome from "./theme/components/profilehome/ProfileHome.vue";

// JS代码 box
import JSRunner from "./theme/components/JSRunner.vue";

// 代码容器
import CodeViewBox from "./theme/components/CodeViewBox.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component("RepoCard", RepoCard);
    app.component("GridHome", GridHome);
    app.component("CodeHome", CodeHome);
    app.component("ProfileHome", ProfileHome);
    app.component("JSRunner", JSRunner);
    app.component("CodeViewBox", CodeViewBox);
    app.component("AllFriendContent", AllFriendContent);
  },
});