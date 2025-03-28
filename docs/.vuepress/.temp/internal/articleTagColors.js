import './articleTagColors.css'
export const articleTagColors = {"CSS":"runm","HTML":"runm","JavaScript":"lzjn","Vue":"snbf","Git":"k1ce","数据结构":"4j8a","DeBug":"hjti","微信小程序":"snbf","Node":"kli9","npm":"e3br","pnpm":"9mpn","TypeScript":"4j8a"}

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
