// docs/.vuepress/config.js
import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import { plumeTheme } from "vuepress-theme-plume";

// docs/.vuepress/navbar.js
import { defineNavbarConfig } from "vuepress-theme-plume";
var navbar = defineNavbarConfig([
  { text: "\u9996\u9875", link: "/", icon: "flat-color-icons:home" },
  {
    text: "\u535A\u5BA2",
    link: "/blog/",
    icon: "fxemoji:note",
    activeMatch: "^(/blog/|/article/)"
  },
  {
    text: "\u7B14\u8BB0",
    items: [
      { text: "Web\u524D\u7AEF", link: "/web/start/", icon: "logos:web-dev-icon" },
      { text: "\u5907\u5FD8\u5F55", link: "/memo/start/", icon: "emojione:memo" }
    ],
    icon: "emojione:green-book",
    activeMatch: "^/(web|memo)/"
  },
  {
    text: "Q&A",
    link: "/qa/overview/",
    icon: "noto:thinking-face",
    activeMatch: "^/qa/"
  },
  {
    text: "\u66F4\u591A",
    items: [
      {
        text: "\u53CB\u60C5\u94FE\u63A5",
        link: "/more/friends/",
        icon: "icon-park:friends-circle"
      },
      {
        text: "\u6211\u7684\u9879\u76EE",
        link: "/more/projects/",
        icon: "material-icon-theme:folder-project-open"
      },
      {
        text: "\u8D44\u6E90\u5BFC\u822A",
        link: "/more/resources/",
        icon: "logos:sitepoint"
      }
    ],
    icon: "icon-park:more-two",
    activeMatch: "^/more/"
  }
]);

// docs/.vuepress/config.js
var config_default = defineUserConfig({
  autoFrontmatter: {
    permalink: true,
    // 是否生成永久链接
    createTime: true,
    // 是否生成创建时间
    title: true
    // 是否生成标题
  },
  head: [
    ["meta", { name: "referrer", content: "no-referrer" }],
    [
      "script",
      { type: "text/javascript" },
      `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "qnwy9r0rp7");
      `
    ]
  ],
  base: "/",
  lang: "zh-CN",
  title: "Hoey",
  description: "Hoey' blog.",
  bundler: viteBundler(),
  theme: plumeTheme({
    /**
     * 文件路径，导航栏，侧边栏等配置
     */
    collections: [
      { type: "post", dir: "blog", title: "\u535A\u5BA2" },
      { type: "doc", dir: "memo", title: "\u5907\u5FD8\u5F55", sidebar: "auto" },
      { type: "doc", dir: "web", title: "web\u5F00\u53D1", sidebar: "auto" },
      { type: "doc", dir: "qa", title: "Q&A", sidebar: "auto" },
      { type: "post", dir: "more", title: "\u66F4\u591A", sidebar: "auto" }
    ],
    navbar,
    /**
     * markdown 曾强
     */
    markdown: {
      annotation: true,
      // 启用注释
      collapse: true,
      // 启用折叠功能
      table: true,
      imageSize: true,
      // 图片优化 'local（本地图片）' | 'all（所有图片）'
      demo: true,
      // 启用新的代码演示功能
      markmap: true,
      // 启用 Markmap 图表嵌入语法
      codeTree: true
      // 启用代码树
    },
    /**
     * 代码高亮
     * https://theme-plume.vuejs.press/config/plugins/code-highlight/
     * */
    // [lang] title="xxxx"  https://theme-plume.vuejs.press/guide/code/features/
    codeHighlighter: {
      themes: { light: "vitesse-light", dark: "vitesse-dark" },
      notationDiff: true,
      notationErrorLevel: true,
      notationFocus: true,
      // 启用代码块聚焦 https://theme-plume.vuejs.press/guide/code/features/#%E4%BB%A3%E7%A0%81%E5%9D%97%E4%B8%AD%E8%81%9A%E7%84%A6
      notationHighlight: true,
      notationWordHighlight: true,
      // 词高亮 https://theme-plume.vuejs.press/guide/code/features/#%E4%BB%A3%E7%A0%81%E5%9D%97%E4%B8%AD-%E8%AF%8D%E9%AB%98%E4%BA%AE
      highlightLines: true,
      // 启用行高亮 https://theme-plume.vuejs.press/guide/code/features/#%E5%9C%A8%E4%BB%A3%E7%A0%81%E5%9D%97%E4%B8%AD%E5%AE%9E%E7%8E%B0%E8%A1%8C%E9%AB%98%E4%BA%AE
      collapsedLines: true,
      // 全局启用 代码折叠 https://theme-plume.vuejs.press/guide/code/features/#%E6%8A%98%E5%8F%A0%E4%BB%A3%E7%A0%81%E5%9D%97
      lineNumbers: true
      // 启用行号 https://theme-plume.vuejs.press/guide/code/features/#%E4%BB%A3%E7%A0%81%E8%A1%8C%E5%8F%B7
    },
    /**
     * 评论
     */
    comment: {
      provider: "Giscus",
      // "Artalk“ | "Giscus" | "Twikoo" | "Waline"
      comment: false,
      repo: "zhenghaoyang24/hoey-blog-plume",
      repoId: "R_kgDONIcgog",
      category: "Announcements",
      categoryId: "DIC_kwDONIcgos4Cwn3Q"
    },
    // 部署域名
    hostname: "https://zhenghaoyang.cn",
    plugins: {},
    optimizeDeps: {
      include: ["monaco-editor"]
    }
  })
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLmpzIiwgImRvY3MvLnZ1ZXByZXNzL25hdmJhci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6LzAwMi16aHktZ2l0L2hvZXktYmxvZy1wbHVtZS9kb2NzLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcMDAyLXpoeS1naXRcXFxcaG9leS1ibG9nLXBsdW1lXFxcXGRvY3NcXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovMDAyLXpoeS1naXQvaG9leS1ibG9nLXBsdW1lL2RvY3MvLnZ1ZXByZXNzL2NvbmZpZy5qc1wiO2ltcG9ydCB7IHZpdGVCdW5kbGVyIH0gZnJvbSBcIkB2dWVwcmVzcy9idW5kbGVyLXZpdGVcIjtcclxuaW1wb3J0IHsgZGVmaW5lVXNlckNvbmZpZyB9IGZyb20gXCJ2dWVwcmVzc1wiO1xyXG5pbXBvcnQgeyBwbHVtZVRoZW1lIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLXBsdW1lXCI7XHJcbmltcG9ydCB7IG5hdmJhciB9IGZyb20gJy4vbmF2YmFyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XHJcbiAgYXV0b0Zyb250bWF0dGVyOiB7XHJcbiAgICBwZXJtYWxpbms6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NzUxRlx1NjIxMFx1NkMzOFx1NEU0NVx1OTRGRVx1NjNBNVxyXG4gICAgY3JlYXRlVGltZTogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwXHU1MjFCXHU1RUZBXHU2NUY2XHU5NUY0XHJcbiAgICB0aXRsZTogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwXHU2ODA3XHU5ODk4XHJcbiAgfSxcclxuICBoZWFkOiBbXHJcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJyZWZlcnJlclwiLCBjb250ZW50OiBcIm5vLXJlZmVycmVyXCIgfV0sXHJcbiAgICBbXHJcbiAgICAgIFwic2NyaXB0XCIsXHJcbiAgICAgIHsgdHlwZTogXCJ0ZXh0L2phdmFzY3JpcHRcIiB9LFxyXG4gICAgICBgXHJcbiAgICAgICAgKGZ1bmN0aW9uKGMsbCxhLHIsaSx0LHkpe1xyXG4gICAgICAgICAgY1thXT1jW2FdfHxmdW5jdGlvbigpeyhjW2FdLnE9Y1thXS5xfHxbXSkucHVzaChhcmd1bWVudHMpfTtcclxuICAgICAgICAgIHQ9bC5jcmVhdGVFbGVtZW50KHIpO3QuYXN5bmM9MTt0LnNyYz1cImh0dHBzOi8vd3d3LmNsYXJpdHkubXMvdGFnL1wiK2k7XHJcbiAgICAgICAgICB5PWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUocilbMF07eS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0LHkpO1xyXG4gICAgICAgIH0pKHdpbmRvdywgZG9jdW1lbnQsIFwiY2xhcml0eVwiLCBcInNjcmlwdFwiLCBcInFud3k5cjBycDdcIik7XHJcbiAgICAgIGAsXHJcbiAgICBdLFxyXG4gIF0sXHJcbiAgYmFzZTogXCIvXCIsXHJcbiAgbGFuZzogXCJ6aC1DTlwiLFxyXG4gIHRpdGxlOiBcIkhvZXlcIixcclxuICBkZXNjcmlwdGlvbjogXCJIb2V5JyBibG9nLlwiLFxyXG5cclxuICBidW5kbGVyOiB2aXRlQnVuZGxlcigpLFxyXG5cclxuICB0aGVtZTogcGx1bWVUaGVtZSh7XHJcbiAgICAvKipcclxuICAgICAqIFx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFx1RkYwQ1x1NUJGQ1x1ODIyQVx1NjgwRlx1RkYwQ1x1NEZBN1x1OEZCOVx1NjgwRlx1N0I0OVx1OTE0RFx1N0Y2RVxyXG4gICAgICovXHJcbiAgICBjb2xsZWN0aW9uczogW1xyXG4gICAgICB7IHR5cGU6ICdwb3N0JywgZGlyOiAnYmxvZycsIHRpdGxlOiAnXHU1MzVBXHU1QkEyJyB9LFxyXG4gICAgICB7IHR5cGU6ICdkb2MnLCBkaXI6ICdtZW1vJywgdGl0bGU6ICdcdTU5MDdcdTVGRDhcdTVGNTUnLCAgc2lkZWJhcjogJ2F1dG8nfSxcclxuICAgICAgeyB0eXBlOiAnZG9jJywgZGlyOiAnd2ViJywgdGl0bGU6ICd3ZWJcdTVGMDBcdTUzRDEnLCAgc2lkZWJhcjogJ2F1dG8nfSxcclxuICAgICAgeyB0eXBlOiAnZG9jJywgZGlyOiAncWEnLCB0aXRsZTogJ1EmQScsICBzaWRlYmFyOiAnYXV0byd9LFxyXG4gICAgICB7IHR5cGU6ICdwb3N0JywgZGlyOiAnbW9yZScsIHRpdGxlOiAnXHU2NkY0XHU1OTFBJywgIHNpZGViYXI6ICdhdXRvJ30sXHJcbiAgICBdLFxyXG4gICAgbmF2YmFyLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWFya2Rvd24gXHU2NkZFXHU1RjNBXHJcbiAgICAgKi9cclxuICAgIG1hcmtkb3duOiB7XHJcbiAgICAgIGFubm90YXRpb246IHRydWUsIC8vIFx1NTQyRlx1NzUyOFx1NkNFOFx1OTFDQVxyXG4gICAgICBjb2xsYXBzZTogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4XHU2Mjk4XHU1M0UwXHU1MjlGXHU4MEZEXHJcbiAgICAgIHRhYmxlOiB0cnVlLFxyXG4gICAgICBpbWFnZVNpemU6IHRydWUsIC8vIFx1NTZGRVx1NzI0N1x1NEYxOFx1NTMxNiAnbG9jYWxcdUZGMDhcdTY3MkNcdTU3MzBcdTU2RkVcdTcyNDdcdUZGMDknIHwgJ2FsbFx1RkYwOFx1NjI0MFx1NjcwOVx1NTZGRVx1NzI0N1x1RkYwOSdcclxuICAgICAgZGVtbzogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4XHU2NUIwXHU3Njg0XHU0RUUzXHU3ODAxXHU2RjE0XHU3OTNBXHU1MjlGXHU4MEZEXHJcbiAgICAgIG1hcmttYXA6IHRydWUsIC8vIFx1NTQyRlx1NzUyOCBNYXJrbWFwIFx1NTZGRVx1ODg2OFx1NUQ0Q1x1NTE2NVx1OEJFRFx1NkNENVxyXG4gICAgICBjb2RlVHJlZTogdHJ1ZSwgLy8gXHU1NDJGXHU3NTI4XHU0RUUzXHU3ODAxXHU2ODExXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHU0RUUzXHU3ODAxXHU5QUQ4XHU0RUFFXHJcbiAgICAgKiBodHRwczovL3RoZW1lLXBsdW1lLnZ1ZWpzLnByZXNzL2NvbmZpZy9wbHVnaW5zL2NvZGUtaGlnaGxpZ2h0L1xyXG4gICAgICogKi9cclxuICAgIC8vIFtsYW5nXSB0aXRsZT1cInh4eHhcIiAgaHR0cHM6Ly90aGVtZS1wbHVtZS52dWVqcy5wcmVzcy9ndWlkZS9jb2RlL2ZlYXR1cmVzL1xyXG4gICAgY29kZUhpZ2hsaWdodGVyOiB7XHJcbiAgICAgIHRoZW1lczogeyBsaWdodDogXCJ2aXRlc3NlLWxpZ2h0XCIsIGRhcms6IFwidml0ZXNzZS1kYXJrXCIgfSxcclxuICAgICAgbm90YXRpb25EaWZmOiB0cnVlLFxyXG4gICAgICBub3RhdGlvbkVycm9yTGV2ZWw6IHRydWUsXHJcbiAgICAgIG5vdGF0aW9uRm9jdXM6IHRydWUsIC8vIFx1NTQyRlx1NzUyOFx1NEVFM1x1NzgwMVx1NTc1N1x1ODA1QVx1NzEyNiBodHRwczovL3RoZW1lLXBsdW1lLnZ1ZWpzLnByZXNzL2d1aWRlL2NvZGUvZmVhdHVyZXMvIyVFNCVCQiVBMyVFNyVBMCU4MSVFNSU5RCU5NyVFNCVCOCVBRCVFOCU4MSU5QSVFNyU4NCVBNlxyXG4gICAgICBub3RhdGlvbkhpZ2hsaWdodDogdHJ1ZSxcclxuICAgICAgbm90YXRpb25Xb3JkSGlnaGxpZ2h0OiB0cnVlLCAvLyBcdThCQ0RcdTlBRDhcdTRFQUUgaHR0cHM6Ly90aGVtZS1wbHVtZS52dWVqcy5wcmVzcy9ndWlkZS9jb2RlL2ZlYXR1cmVzLyMlRTQlQkIlQTMlRTclQTAlODElRTUlOUQlOTclRTQlQjglQUQtJUU4JUFGJThEJUU5JUFCJTk4JUU0JUJBJUFFXHJcbiAgICAgIGhpZ2hsaWdodExpbmVzOiB0cnVlLCAvLyBcdTU0MkZcdTc1MjhcdTg4NENcdTlBRDhcdTRFQUUgaHR0cHM6Ly90aGVtZS1wbHVtZS52dWVqcy5wcmVzcy9ndWlkZS9jb2RlL2ZlYXR1cmVzLyMlRTUlOUMlQTglRTQlQkIlQTMlRTclQTAlODElRTUlOUQlOTclRTQlQjglQUQlRTUlQUUlOUUlRTclOEUlQjAlRTglQTElOEMlRTklQUIlOTglRTQlQkElQUVcclxuICAgICAgY29sbGFwc2VkTGluZXM6IHRydWUsIC8vIFx1NTE2OFx1NUM0MFx1NTQyRlx1NzUyOCBcdTRFRTNcdTc4MDFcdTYyOThcdTUzRTAgaHR0cHM6Ly90aGVtZS1wbHVtZS52dWVqcy5wcmVzcy9ndWlkZS9jb2RlL2ZlYXR1cmVzLyMlRTYlOEElOTglRTUlOEYlQTAlRTQlQkIlQTMlRTclQTAlODElRTUlOUQlOTdcclxuICAgICAgbGluZU51bWJlcnM6IHRydWUsIC8vIFx1NTQyRlx1NzUyOFx1ODg0Q1x1NTNGNyBodHRwczovL3RoZW1lLXBsdW1lLnZ1ZWpzLnByZXNzL2d1aWRlL2NvZGUvZmVhdHVyZXMvIyVFNCVCQiVBMyVFNyVBMCU4MSVFOCVBMSU4QyVFNSU4RiVCN1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFx1OEJDNFx1OEJCQVxyXG4gICAgICovXHJcbiAgICBjb21tZW50OiB7XHJcbiAgICAgIHByb3ZpZGVyOiAnR2lzY3VzJywgLy8gXCJBcnRhbGtcdTIwMUMgfCBcIkdpc2N1c1wiIHwgXCJUd2lrb29cIiB8IFwiV2FsaW5lXCJcclxuICAgICAgY29tbWVudDogZmFsc2UsXHJcbiAgICAgIHJlcG86ICd6aGVuZ2hhb3lhbmcyNC9ob2V5LWJsb2ctcGx1bWUnLCBcclxuICAgICAgcmVwb0lkOiAnUl9rZ0RPTkljZ29nJywgXHJcbiAgICAgIGNhdGVnb3J5OiAnQW5ub3VuY2VtZW50cycsIFxyXG4gICAgICBjYXRlZ29yeUlkOiAnRElDX2t3RE9OSWNnb3M0Q3duM1EnLCBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU5MEU4XHU3RjcyXHU1N0RGXHU1NDBEXHJcbiAgICBob3N0bmFtZTogXCJodHRwczovL3poZW5naGFveWFuZy5jblwiLFxyXG4gICAgcGx1Z2luczoge30sXHJcbiAgICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ21vbmFjby1lZGl0b3InXVxyXG4gIH1cclxuICB9KSxcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDovMDAyLXpoeS1naXQvaG9leS1ibG9nLXBsdW1lL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFwwMDItemh5LWdpdFxcXFxob2V5LWJsb2ctcGx1bWVcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcbmF2YmFyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi8wMDItemh5LWdpdC9ob2V5LWJsb2ctcGx1bWUvZG9jcy8udnVlcHJlc3MvbmF2YmFyLmpzXCI7aW1wb3J0IHsgZGVmaW5lTmF2YmFyQ29uZmlnIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLXBsdW1lXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbmF2YmFyID0gZGVmaW5lTmF2YmFyQ29uZmlnKFtcclxuICB7IHRleHQ6IFwiXHU5OTk2XHU5ODc1XCIsIGxpbms6IFwiL1wiLCBpY29uOiBcImZsYXQtY29sb3ItaWNvbnM6aG9tZVwiIH0sXHJcbiAge1xyXG4gICAgdGV4dDogXCJcdTUzNUFcdTVCQTJcIixcclxuICAgIGxpbms6IFwiL2Jsb2cvXCIsXHJcbiAgICBpY29uOiBcImZ4ZW1vamk6bm90ZVwiLFxyXG4gICAgYWN0aXZlTWF0Y2g6IFwiXigvYmxvZy98L2FydGljbGUvKVwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogXCJcdTdCMTRcdThCQjBcIixcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHsgdGV4dDogXCJXZWJcdTUyNERcdTdBRUZcIiwgbGluazogXCIvd2ViL3N0YXJ0L1wiLCBpY29uOiBcImxvZ29zOndlYi1kZXYtaWNvblwiIH0sXHJcbiAgICAgIHsgdGV4dDogXCJcdTU5MDdcdTVGRDhcdTVGNTVcIiwgbGluazogXCIvbWVtby9zdGFydC9cIiwgaWNvbjogXCJlbW9qaW9uZTptZW1vXCIgfSxcclxuICAgIF0sXHJcbiAgICBpY29uOiBcImVtb2ppb25lOmdyZWVuLWJvb2tcIixcclxuICAgIGFjdGl2ZU1hdGNoOiBcIl4vKHdlYnxtZW1vKS9cIixcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6IFwiUSZBXCIsXHJcbiAgICBsaW5rOiBcIi9xYS9vdmVydmlldy9cIixcclxuICAgIGljb246IFwibm90bzp0aGlua2luZy1mYWNlXCIsXHJcbiAgICBhY3RpdmVNYXRjaDogXCJeL3FhL1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogXCJcdTY2RjRcdTU5MUFcIixcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1NTNDQlx1NjBDNVx1OTRGRVx1NjNBNVwiLFxyXG4gICAgICAgIGxpbms6IFwiL21vcmUvZnJpZW5kcy9cIixcclxuICAgICAgICBpY29uOiBcImljb24tcGFyazpmcmllbmRzLWNpcmNsZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogXCJcdTYyMTFcdTc2ODRcdTk4NzlcdTc2RUVcIixcclxuICAgICAgICBsaW5rOiBcIi9tb3JlL3Byb2plY3RzL1wiLFxyXG4gICAgICAgIGljb246IFwibWF0ZXJpYWwtaWNvbi10aGVtZTpmb2xkZXItcHJvamVjdC1vcGVuXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1OEQ0NFx1NkU5MFx1NUJGQ1x1ODIyQVwiLFxyXG4gICAgICAgIGxpbms6IFwiL21vcmUvcmVzb3VyY2VzL1wiLFxyXG4gICAgICAgIGljb246IFwibG9nb3M6c2l0ZXBvaW50XCIsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgaWNvbjogXCJpY29uLXBhcms6bW9yZS10d29cIixcclxuICAgIGFjdGl2ZU1hdGNoOiBcIl4vbW9yZS9cIixcclxuICB9LFxyXG5dKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVCxTQUFTLG1CQUFtQjtBQUNqVixTQUFTLHdCQUF3QjtBQUNqQyxTQUFTLGtCQUFrQjs7O0FDRjBSLFNBQVMsMEJBQTBCO0FBRWpWLElBQU0sU0FBUyxtQkFBbUI7QUFBQSxFQUN2QyxFQUFFLE1BQU0sZ0JBQU0sTUFBTSxLQUFLLE1BQU0sd0JBQXdCO0FBQUEsRUFDdkQ7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsRUFBRSxNQUFNLG1CQUFTLE1BQU0sZUFBZSxNQUFNLHFCQUFxQjtBQUFBLE1BQ2pFLEVBQUUsTUFBTSxzQkFBTyxNQUFNLGdCQUFnQixNQUFNLGdCQUFnQjtBQUFBLElBQzdEO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxFQUNmO0FBQ0YsQ0FBQzs7O0FEMUNELElBQU8saUJBQVEsaUJBQWlCO0FBQUEsRUFDOUIsaUJBQWlCO0FBQUEsSUFDZixXQUFXO0FBQUE7QUFBQSxJQUNYLFlBQVk7QUFBQTtBQUFBLElBQ1osT0FBTztBQUFBO0FBQUEsRUFDVDtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0osQ0FBQyxRQUFRLEVBQUUsTUFBTSxZQUFZLFNBQVMsY0FBYyxDQUFDO0FBQUEsSUFDckQ7QUFBQSxNQUNFO0FBQUEsTUFDQSxFQUFFLE1BQU0sa0JBQWtCO0FBQUEsTUFDMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9GO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBRWIsU0FBUyxZQUFZO0FBQUEsRUFFckIsT0FBTyxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJaEIsYUFBYTtBQUFBLE1BQ1gsRUFBRSxNQUFNLFFBQVEsS0FBSyxRQUFRLE9BQU8sZUFBSztBQUFBLE1BQ3pDLEVBQUUsTUFBTSxPQUFPLEtBQUssUUFBUSxPQUFPLHNCQUFRLFNBQVMsT0FBTTtBQUFBLE1BQzFELEVBQUUsTUFBTSxPQUFPLEtBQUssT0FBTyxPQUFPLG1CQUFVLFNBQVMsT0FBTTtBQUFBLE1BQzNELEVBQUUsTUFBTSxPQUFPLEtBQUssTUFBTSxPQUFPLE9BQVEsU0FBUyxPQUFNO0FBQUEsTUFDeEQsRUFBRSxNQUFNLFFBQVEsS0FBSyxRQUFRLE9BQU8sZ0JBQU8sU0FBUyxPQUFNO0FBQUEsSUFDNUQ7QUFBQSxJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLQSxVQUFVO0FBQUEsTUFDUixZQUFZO0FBQUE7QUFBQSxNQUNaLFVBQVU7QUFBQTtBQUFBLE1BQ1YsT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBO0FBQUEsTUFDWCxNQUFNO0FBQUE7QUFBQSxNQUNOLFNBQVM7QUFBQTtBQUFBLE1BQ1QsVUFBVTtBQUFBO0FBQUEsSUFDWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9BLGlCQUFpQjtBQUFBLE1BQ2YsUUFBUSxFQUFFLE9BQU8saUJBQWlCLE1BQU0sZUFBZTtBQUFBLE1BQ3ZELGNBQWM7QUFBQSxNQUNkLG9CQUFvQjtBQUFBLE1BQ3BCLGVBQWU7QUFBQTtBQUFBLE1BQ2YsbUJBQW1CO0FBQUEsTUFDbkIsdUJBQXVCO0FBQUE7QUFBQSxNQUN2QixnQkFBZ0I7QUFBQTtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBO0FBQUEsTUFDaEIsYUFBYTtBQUFBO0FBQUEsSUFDZjtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS0EsU0FBUztBQUFBLE1BQ1AsVUFBVTtBQUFBO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixRQUFRO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsSUFDZDtBQUFBO0FBQUEsSUFHQSxVQUFVO0FBQUEsSUFDVixTQUFTLENBQUM7QUFBQSxJQUNULGNBQWM7QUFBQSxNQUNmLFNBQVMsQ0FBQyxlQUFlO0FBQUEsSUFDM0I7QUFBQSxFQUNBLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
