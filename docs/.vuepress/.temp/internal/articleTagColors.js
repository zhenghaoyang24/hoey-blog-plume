import './articleTagColors.css'
export const articleTagColors = {"CSS":"q1zq","HTML":"q1zq","JavaScript":"5bb6","Vue":"hphf","Git":"gh24","DeBug":"6nny","微信小程序":"hphf","Node":"fe3u","npm":"lfr0","pnpm":"1xku","TypeScript":"ps1l","数据结构":"ps1l"}

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
