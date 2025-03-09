import './articleTagColors.css'
export const articleTagColors = {"CSS":"kp5c","HTML":"kp5c","Vue":"rnzs","JavaScript":"c5ez","DeBug":"ozfg","微信小程序":"rnzs","Node":"lwh5","npm":"42z4","pnpm":"btah","TypeScript":"vc7o","git":"330p","数据结构":"vc7o"}

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
