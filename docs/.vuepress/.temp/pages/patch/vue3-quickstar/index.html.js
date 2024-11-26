import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/vue3-quickstar/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/vue3-quickstar/\",\"title\":\"Vue3快速入门\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue3快速入门\",\"createTime\":\"2024/11/6 10:19:27\",\"permalink\":\"/patch/vue3-quickstar/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.05,\"words\":14},\"filePathRelative\":\"notes/patch/Vue/vue3QuickStar.md\",\"bulletin\":false}")
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
