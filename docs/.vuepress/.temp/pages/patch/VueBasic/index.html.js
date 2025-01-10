import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/VueBasic/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/VueBasic/\",\"title\":\"Vue2基础\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Vue2基础\",\"createTime\":\"2024/4/21 15:41:27\",\"permalink\":\"/patch/VueBasic/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":10.67,\"words\":3201},\"filePathRelative\":\"notes/patch/Vue/vuebasic.md\",\"bulletin\":false}")
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
