import './articleTagColors.css'
export const articleTagColors = {"CSS":"e32d","HTML":"e32d","JavaScript":"rbzl","Vue":"sys9","DeBug":"i7we","微信小程序":"sys9","Node":"wssd","npm":"xklg","pnpm":"huyu","TypeScript":"5zh5","数据结构":"5zh5"}

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
