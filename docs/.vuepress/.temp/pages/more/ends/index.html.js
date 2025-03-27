import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/more/ends/index.html.vue"
const data = JSON.parse("{\"path\":\"/more/ends/\",\"title\":\"友情链接\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"友情链接\",\"createTime\":\"2025/03/27 14:27:56\",\"description\":\"我的好友们\",\"permalink\":\"/more/ends/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.07,\"words\":22},\"filePathRelative\":\"notes/more/friends.md\"}")
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
