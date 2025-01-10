import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/VueDepth/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/VueDepth/\",\"title\":\"Vue2深入\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue2深入\",\"createTime\":\"2024/5/5 14:13:26\",\"permalink\":\"/patch/VueDepth/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":9.16,\"words\":2748},\"filePathRelative\":\"notes/patch/Vue/vuedepth.md\",\"bulletin\":false}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
