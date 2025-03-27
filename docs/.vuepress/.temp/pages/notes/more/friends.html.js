import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/notes/more/friends.html.vue"
const data = JSON.parse("{\"path\":\"/notes/more/friends.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/more/friends.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10003,\"name\":\"notes\"},{\"id\":\"5a3bf7\",\"sort\":10005,\"name\":\"more\"}]}")
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
