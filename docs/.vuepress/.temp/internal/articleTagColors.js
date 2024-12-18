import './articleTagColors.css'
export const articleTagColors = {"CSS":"5566","HTML":"5566","JavaScript":"4r65","Vue":"0i30","数据结构":"4wxh","DeBug":"8r14","微信小程序":"0i30","Node":"jqx1","npm":"mozq","pnpm":"6ay3"}

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
