import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/blog/categories/index.html.vue"
const data = JSON.parse("{\"path\":\"/blog/categories/\",\"title\":\"分类\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"分类\",\"gitInclude\":[],\"draft\":true},\"readingTime\":{\"minutes\":0,\"words\":0},\"filePathRelative\":null,\"headers\":[],\"type\":\"blog-categories\"}")
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
