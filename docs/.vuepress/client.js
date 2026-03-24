import { defineClientConfig, usePageFrontmatter } from "vuepress/client";
import { Layout } from "vuepress-theme-plume/client";
import "./theme/styles/index.css";
import { h } from "vue";
import RepoCard from "vuepress-theme-plume/features/RepoCard.vue";
import AllFriendContent from "./theme/components/AllFriendContent.vue";
// 网格首页
import GridHome from "./theme/components/gridhome/GridHome.vue";

// Profile 首页
import ProfileHome from "./theme/components/profilehome/ProfileHome.vue";

// JS代码 box
import JSRunner from "./theme/components/JSRunner.vue";

// 代码容器
import CodeViewBox from "./theme/components/CodeViewBox.vue";

// 问题组件
import Question from "./theme/components/Question.vue";

// 总结组件
import Summary from "./theme/components/Summary.vue";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component("RepoCard", RepoCard);
    app.component("GridHome", GridHome);
    app.component("ProfileHome", ProfileHome);
    app.component("JSRunner", JSRunner);
    app.component("CodeViewBox", CodeViewBox);
    app.component("AllFriendContent", AllFriendContent);
    app.component("Question", Question);
  },
  layouts: {
    Layout: () => {
      const frontmatter = usePageFrontmatter();

      return h(Layout, null, {
        // 只在 summary: true 时渲染 Summary 组件
        "doc-meta-bottom": () => (frontmatter.value.summary ? h(Summary) : null),
      });
    },
  },
});
