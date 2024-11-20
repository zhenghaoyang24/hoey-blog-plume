import './articleTagColors.css'
export const articleTagColors = {"CSS":"pdj2","HTML":"pdj2","JavaScript":"bmb3","Vue":"i40z","DeBug":"4i3m","微信小程序":"i40z","Node":"dk6h","npm":"31pv","pnpm":"18i4","数据结构":"labh","Thought":"4i3m","markdown":"9syi"}

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
