/**
 * @see https://theme-plume.vuejs.press/guide/collection/ 查看文档了解配置详情。
 *
 * Collections 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 *
 * 请注意，你应该先在这里配置好 Collections，然后再启动 vuepress，主题会在启动 vuepress 时，
 * 读取这里配置的 Collections，然后在与 Collection 相关的 Markdown 文件中，自动生成 permalink。
 *
 * collection 的  type 为 `post` 时，表示为 文档列表类型（即没有侧边导航栏，有文档列表页）
 * 可用于实现如 博客、专栏 等以文章列表聚合形式的文档集合 （内容相对碎片化的）
 *
 * collection 的 type 为 `doc` 时，表示为文档类型（即有侧边导航栏）
 * 可用于实现如 笔记、知识库、文档等以侧边导航栏形式的文档集合 （内容强关联、成体系的）
 * 如果发现 侧边栏没有显示，那么请检查你的配置是否正确，以及 Markdown 文件中的 permalink
 * 是否是以对应的 Collection 配置的 link 的前缀开头。 是否展示侧边栏是根据 页面链接 的前缀 与 `collection.link`
 * 的前缀是否匹配来决定。
 */

/**
 * 在受支持的 IDE 中会智能提示配置项。
 *
 * - `defineCollections` 是用于定义 collection 集合的帮助函数
 * - `defineCollection` 是用于定义单个 collection 配置的帮助函数
 *
 * 通过 `defineCollection` 定义的 collection 配置，应该填入 `defineCollections` 中
 */
import { defineCollections } from "vuepress-theme-plume";

/**
 * 导出所有的 collections
 * (blog 为博客示例，如果不需要博客功能，请删除)
 * (demoDoc 为参考示例，如果不需要它，请删除)
 */
export default defineCollections([
  { type: "post", dir: "blog", title: "博客" },
  {
    type: "doc",
    dir: "qa",
    title: "Q&A",
    linkPrefix: "/qa/",
    sidebar: [
      { text: '导读', link: '/qa/guide/' }, 
      { text: "HTML", prefix: "1.HTML", items: "auto", icon: "skill-icons:html", collapsed: false },
      { text: "CSS", prefix: "2.CSS", items: "auto", icon: "skill-icons:css", collapsed: false },
      {
        text: "JavaScript",
        prefix: "3.JavaScript",
        items: "auto",
        icon: "skill-icons:javascript",
        collapsed: false,
      },
      { text: "Vue", prefix: "4.Vue", items: "auto", icon: "logos:vue", collapsed: false },
      { text: "浏览器", prefix: "浏览器", items: "auto", icon: "devicon:chrome", collapsed: false },
      { text: "算法思想", prefix: "算法思想", items: "auto", collapsed: false },
      { text: "网络与安全", prefix: "网络与安全", items: "auto", collapsed: false },
    ],
  },
  { type: "doc", dir: "memo", title: "备忘录", sidebar: "auto", linkPrefix: "/memo" },
  { type: "doc", dir: "web", title: "web开发", sidebar: "auto", linkPrefix: "/web" },
  { type: "post", dir: "more", title: "更多" },
]);
