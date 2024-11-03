import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/\",\"title\":\"查漏补缺\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"查漏补缺\",\"createTime\":\"2024/10/31 15:40:23\",\"permalink\":\"/patch/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.07,\"words\":20},\"filePathRelative\":\"notes/patch/README.md\",\"bulletin\":false}")
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
