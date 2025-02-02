import './articleTagColors.css'
export const articleTagColors = {"CSS":"xyx2","HTML":"xyx2","JavaScript":"dh9a","Vue":"ejxs","数据结构":"d9zz","DeBug":"zpxq","微信小程序":"ejxs","Node":"s0lk","npm":"yaup","pnpm":"ep9i","TypeScript":"d9zz"}

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
