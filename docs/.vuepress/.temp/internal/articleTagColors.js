import './articleTagColors.css'
export const articleTagColors = {"CSS":"piix","HTML":"piix","JavaScript":"yttl","Vue":"ag37","数据结构":"hyhw","DeBug":"el6d","微信小程序":"ag37","Node":"dclz","npm":"rze2","pnpm":"f50c"}

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
