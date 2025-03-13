import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/vue3/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/vue3/\",\"title\":\"Vue3 快速上手\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue3 快速上手\",\"createTime\":\"2024/8/5 10:19:27\",\"permalink\":\"/patch/vue3/\",\"tags\":[\"Vue\"],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":30.17,\"words\":9052},\"filePathRelative\":\"notes/patch/2.Vue/vue3.md\"}")
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
