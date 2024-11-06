import './articleTagColors.css'
export const articleTagColors = {"CSS":"1lk1","HTML":"1lk1","JavaScript":"axag","Vue":"90gk","DeBug":"g8fm","微信小程序":"90gk","数据结构":"a3ld","Thought":"g8fm","markdown":"j3z0","Node":"eayy","npm":"zuxn","pnpm":"izrq"}

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
