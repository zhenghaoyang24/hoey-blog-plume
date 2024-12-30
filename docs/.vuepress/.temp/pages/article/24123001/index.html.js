import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/24123001/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/24123001/\",\"title\":\"test\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"test\",\"createTime\":\"2024/12/30\",\"tags\":[\"npm\"],\"permalink\":\"/article/24123001/\"},\"headers\":[],\"readingTime\":{\"minutes\":0.23,\"words\":68},\"filePathRelative\":\"技文/test.md\",\"categoryList\":[{\"id\":\"59ac2d\",\"sort\":10002,\"name\":\"技文\"}],\"bulletin\":false}")
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
