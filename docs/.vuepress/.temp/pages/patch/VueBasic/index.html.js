import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/VueBasic/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/VueBasic/\",\"title\":\"Vue2 快速上手\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue2 快速上手\",\"createTime\":\"2024/4/21 15:41:27\",\"permalink\":\"/patch/VueBasic/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":19.8,\"words\":5940},\"filePathRelative\":\"notes/patch/2.Vue/vue2.md\",\"bulletin\":false}")
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
