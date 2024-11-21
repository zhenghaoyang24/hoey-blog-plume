import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/notes/site.html.vue"
const data = JSON.parse("{\"path\":\"/notes/site.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":\"notes/site.md\",\"categoryList\":[{\"id\":\"4358b5\",\"sort\":10003,\"name\":\"notes\"}],\"bulletin\":false}")
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
