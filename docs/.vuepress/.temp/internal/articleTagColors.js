import './articleTagColors.css'
export const articleTagColors = {"CSS":"3mxs","HTML":"3mxs","JavaScript":"ysdd","Vue":"5ygn","Git":"c8k0","DeBug":"pnb3","微信小程序":"5ygn","Node":"ciuf","npm":"l9m9","pnpm":"mo2x","TypeScript":"7g36","数据结构":"7g36"}

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
