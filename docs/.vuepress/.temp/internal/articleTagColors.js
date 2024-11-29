import './articleTagColors.css'
export const articleTagColors = {"CSS":"wya6","HTML":"wya6","JavaScript":"xj6q","Vue":"f7n4","DeBug":"d9oy","微信小程序":"f7n4","Node":"us4f","npm":"htty","pnpm":"mzxt","数据结构":"gw3y"}

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
