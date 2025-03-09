import './articleTagColors.css'
export const articleTagColors = {"CSS":"t8gy","HTML":"t8gy","JavaScript":"spap","Vue":"0485","git":"qr77","DeBug":"f69k","微信小程序":"0485","Node":"qff1","npm":"lzck","pnpm":"flzu","TypeScript":"ka7w","数据结构":"ka7w"}

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
