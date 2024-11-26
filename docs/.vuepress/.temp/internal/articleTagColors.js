import './articleTagColors.css'
export const articleTagColors = {"CSS":"snk1","HTML":"snk1","JavaScript":"62vu","Vue":"fhfs","数据结构":"zotg","Thought":"o7hf","markdown":"f8dk","DeBug":"o7hf","微信小程序":"fhfs","Node":"l8we","npm":"2mkz","pnpm":"ep9a"}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateArticleTagColors) {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ articleTagColors }) => {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  })
}
