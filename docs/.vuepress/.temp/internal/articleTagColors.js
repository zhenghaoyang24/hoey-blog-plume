import './articleTagColors.css'
export const articleTagColors = {"CSS":"t2pq","HTML":"t2pq","Vue":"2bqi","JavaScript":"dgs1","DeBug":"d33k","微信小程序":"2bqi","Node":"wmv1","npm":"o1iz","pnpm":"aadz","TypeScript":"k23k","Git":"gepp","数据结构":"k23k"}

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
