import './articleTagColors.css'
export const articleTagColors = {"CSS":"4ncq","HTML":"4ncq","JavaScript":"ecc3","Vue":"rkfy","DeBug":"s08w","微信小程序":"rkfy","Node":"155x","npm":"xy6u","pnpm":"l9w3","数据结构":"4r78"}

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
