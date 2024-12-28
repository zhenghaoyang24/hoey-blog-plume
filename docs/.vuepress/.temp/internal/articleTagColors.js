import './articleTagColors.css'
export const articleTagColors = {"CSS":"33po","HTML":"33po","JavaScript":"o8zv","Vue":"em87","数据结构":"nr3y","DeBug":"qelm","微信小程序":"em87","Node":"oltg","npm":"3akv","pnpm":"9dgj"}

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
