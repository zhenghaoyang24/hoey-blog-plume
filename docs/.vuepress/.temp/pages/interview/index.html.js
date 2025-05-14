import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/interview/index.html.vue"
const data = JSON.parse("{\"path\":\"/interview/\",\"title\":\"面试题目\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"面试题目\",\"createTime\":\"2025/02/02 13:35:20\",\"permalink\":\"/interview/\",\"gitInclude\":[]},\"readingTime\":{\"minutes\":0.05,\"words\":14},\"filePathRelative\":\"notes/web/3.前端面试/README.md\",\"headers\":[],\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10003,\"name\":\"notes\"},{\"id\":\"c4f15b\",\"sort\":10004,\"name\":\"web\"},{\"id\":\"8b0eee\",\"sort\":3,\"name\":\"前端面试\"}]}")
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
