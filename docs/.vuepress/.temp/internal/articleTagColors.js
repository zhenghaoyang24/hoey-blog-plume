import './articleTagColors.css'
export const articleTagColors = {"CSS":"1o1u","HTML":"1o1u","JavaScript":"igvj","Vue":"4ss1","Git":"ds8z","数据结构":"293z","DeBug":"4uo9","微信小程序":"4ss1","Node":"wod9","npm":"e0fc","pnpm":"swdy","TypeScript":"293z"}

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
