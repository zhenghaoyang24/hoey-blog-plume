import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/more/sites-collect/index.html.vue"
const data = JSON.parse("{\"path\":\"/more/sites-collect/\",\"title\":\"网址导航\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"网址导航\",\"createTime\":\"2024/11/21 19:16:45\",\"permalink\":\"/more/sites-collect/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":1.73,\"words\":519},\"filePathRelative\":\"notes/more/site.md\"}")
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
