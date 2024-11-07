import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/notes/patch/Vue/test.html.vue"
const data = JSON.parse("{\"path\":\"/notes/patch/Vue/test.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/patch/Vue/test.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10003,\"name\":\"notes\"},{\"id\":\"7edf29\",\"sort\":10004,\"name\":\"patch\"},{\"id\":\"339994\",\"sort\":10005,\"name\":\"Vue\"}],\"bulletin\":false}")
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
