import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/tree/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/tree/\",\"title\":\"树\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"树\",\"createTime\":\"2024/10/31 15:43:56\",\"permalink\":\"/patch/tree/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.03,\"words\":10},\"filePathRelative\":\"notes/patch/数据结构/tree.md\",\"bulletin\":false}")
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
