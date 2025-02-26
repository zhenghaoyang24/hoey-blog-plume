import './articleTagColors.css'
export const articleTagColors = {"CSS":"vm3j","HTML":"vm3j","Vue":"dhav","JavaScript":"2qta","DeBug":"ymr1","微信小程序":"dhav","Node":"upx9","npm":"zj53","pnpm":"thph","TypeScript":"26yk","git":"th1a","数据结构":"26yk"}

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
