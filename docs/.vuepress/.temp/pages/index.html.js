import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{\"pageLayout\":\"home\",\"externalLinkIcon\":false,\"config\":[{\"type\":\"hero\",\"full\":true,\"background\":\"tint-plate\",\"hero\":{\"name\":\"老师，我太想进步了。\",\"tagline\":null,\"text\":null,\"actions\":[{\"theme\":\"brand\",\"text\":\"博客\",\"link\":\"/blog/\"}]}}],\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":0.11,\"words\":32},\"filePathRelative\":\"README.md\",\"categoryList\":[]}")
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
