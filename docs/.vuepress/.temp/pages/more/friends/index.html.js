import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/more/friends/index.html.vue"
const data = JSON.parse("{\"path\":\"/more/friends/\",\"title\":\"友情链接\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"友情链接\",\"createTime\":\"2025/03/27 14:27:56\",\"description\":\"我的好友们\",\"permalink\":\"/more/friends/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.98,\"words\":294},\"filePathRelative\":\"notes/more/friends.md\"}")
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
