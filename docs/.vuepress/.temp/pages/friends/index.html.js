import comp from "D:/zhy-git/hoey-blog-plume/docs/.vuepress/.temp/pages/friends/index.html.vue"
const data = JSON.parse("{\"path\":\"/friends/\",\"title\":\"友情链接\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"友情链接\",\"description\":\"友情链接描述文本\",\"permalink\":\"/friends/\",\"list\":[{\"name\":\"pengzhanbo\",\"link\":\"https://github.com/pengzhanbo\",\"avatar\":\"https://github.com/pengzhanbo.png\",\"desc\":\"即使慢，驰而不息，纵会落后，纵会失败，但必须能够到达他所向的目标。\"},{\"name\":\"pengzhanbo\",\"link\":\"https://github.com/pengzhanbo\",\"avatar\":\"https://github.com/pengzhanbo.png\",\"desc\":\"即使慢，驰而不息，纵会落后，纵会失败，但必须能够到达他所向的目标。\"}],\"gitInclude\":[],\"draft\":true,\"pageLayout\":\"friends\"},\"headers\":[],\"readingTime\":{\"minutes\":0.31,\"words\":93},\"filePathRelative\":\"friends.md\",\"type\":\"friends\"}")
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
