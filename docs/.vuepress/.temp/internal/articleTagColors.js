import './articleTagColors.css'
export const articleTagColors = {"CSS":"tbfi","HTML":"tbfi","JavaScript":"9tmt","Vue":"v0gp","数据结构":"ccxt","DeBug":"9khr","微信小程序":"v0gp","Node":"0osp","npm":"1lpk","pnpm":"wzem"}

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
