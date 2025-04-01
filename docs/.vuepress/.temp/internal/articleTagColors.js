import './articleTagColors.css'
export const articleTagColors = {"CSS":"iuir","HTML":"iuir","JavaScript":"vysf","Vue":"7whc","Git":"md1a","数据结构":"mq5g","DeBug":"2ks3","微信小程序":"7whc","Node":"18p8","npm":"d2k2","pnpm":"u542","TypeScript":"mq5g"}

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
