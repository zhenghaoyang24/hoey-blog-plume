import './articleTagColors.css'
export const articleTagColors = {"CSS":"70da","HTML":"70da","JavaScript":"s85n","Vue":"yjed","Git":"f60o","数据结构":"3vu6","DeBug":"izho","微信小程序":"yjed","Node":"ixgr","npm":"nwsr","pnpm":"b3la","TypeScript":"3vu6"}

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
