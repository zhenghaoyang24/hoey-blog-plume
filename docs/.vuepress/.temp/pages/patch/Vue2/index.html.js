import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/vue2/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/vue2/\",\"title\":\"Vue2 快速上手\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue2 快速上手\",\"createTime\":\"2024/4/21 15:41:27\",\"permalink\":\"/patch/vue2/\",\"tags\":[\"Vue\"],\"gitInclude\":[]},\"readingTime\":{\"minutes\":19.81,\"words\":5942},\"filePathRelative\":\"notes/patch/2.Vue/vue2.md\",\"headers\":[]}")
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
