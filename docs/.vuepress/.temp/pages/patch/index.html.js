import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/index.html.vue"
const data = JSON.parse("{\"path\":\"/patch/\",\"title\":\"温故知新\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"温故知新\",\"createTime\":\"2024/10/31 15:40:23\",\"permalink\":\"/patch/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.09,\"words\":26},\"filePathRelative\":\"notes/patch/README.md\"}")
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
