import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/vue3quickStart/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/vue3quickStart/\",\"title\":\"Vue3快速入门\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue3快速入门\",\"createTime\":\"2024/8/5 10:19:27\",\"permalink\":\"/patch/vue3quickStart/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":18.82,\"words\":5645},\"filePathRelative\":\"notes/patch/2.Vue/vue3.md\",\"bulletin\":false}")
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
