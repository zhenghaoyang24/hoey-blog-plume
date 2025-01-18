import './articleTagColors.css'
export const articleTagColors = {"CSS":"ryol","HTML":"ryol","JavaScript":"1v9r","Vue":"ohhn","数据结构":"nquq","DeBug":"77ee","微信小程序":"ohhn","Node":"bnid","npm":"fztf","pnpm":"x2n2","TypeScript":"nquq"}

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
