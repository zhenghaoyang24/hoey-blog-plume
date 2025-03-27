import './articleTagColors.css'
export const articleTagColors = {"CSS":"ir6s","HTML":"ir6s","Vue":"sdxx","JavaScript":"9y4o","DeBug":"m7qo","微信小程序":"sdxx","Node":"67zz","npm":"yk1z","pnpm":"o2x3","TypeScript":"f66j","Git":"k0xn","数据结构":"f66j"}

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
