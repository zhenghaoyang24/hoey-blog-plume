import './articleTagColors.css'
export const articleTagColors = {"CSS":"hyvu","HTML":"hyvu","JavaScript":"t3cc","Vue":"lmhf","DeBug":"lfmu","微信小程序":"lmhf","Node":"px7n","npm":"j38z","pnpm":"lofx","TypeScript":"5l91","数据结构":"5l91"}

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
