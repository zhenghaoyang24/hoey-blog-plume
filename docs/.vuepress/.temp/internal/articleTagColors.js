import './articleTagColors.css'
export const articleTagColors = {"CSS":"fymh","HTML":"fymh","JavaScript":"5zxe","Vue":"c82l","DeBug":"hf9s","微信小程序":"c82l","Node":"yqi0","npm":"358f","pnpm":"cfkq","数据结构":"0mqc","Thought":"hf9s","markdown":"g2wu"}

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
