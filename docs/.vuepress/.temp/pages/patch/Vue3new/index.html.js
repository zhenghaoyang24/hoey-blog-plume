import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/Vue3new/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/Vue3new/\",\"title\":\"Vue3新特性\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue3新特性\",\"createTime\":\"2024/6/16 13:21:27\",\"permalink\":\"/patch/Vue3new/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":7.74,\"words\":2322},\"filePathRelative\":\"notes/patch/2.Vue/vue3new.md\",\"bulletin\":false}")
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
