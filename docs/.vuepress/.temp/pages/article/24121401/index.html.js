import comp from "G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/24121401/index.html.vue"
const data = JSON.parse("{\"path\":\"/article/24121401/\",\"title\":\"vue3部分组件导入时爆红(Vue3+Ts)\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"vue3部分组件导入时爆红(Vue3+Ts)\",\"createTime\":\"2024/12/14\",\"tags\":[\"DeBug\",\"Vue\"],\"permalink\":\"/article/24121401/\",\"gitInclude\":[]},\"headers\":[],\"readingTime\":{\"minutes\":1.15,\"words\":345},\"filePathRelative\":\"技文/24121401.md\",\"categoryList\":[{\"id\":\"59ac2d\",\"sort\":10000,\"name\":\"技文\"}]}")
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
