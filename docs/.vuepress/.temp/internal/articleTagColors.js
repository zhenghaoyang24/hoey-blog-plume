import './articleTagColors.css'
export const articleTagColors = {"CSS":"9jok","HTML":"9jok","JavaScript":"x8q6","Vue":"j62o","Git":"qg15","DeBug":"9e34","微信小程序":"j62o","Node":"b3en","npm":"j064","pnpm":"jdp4","TypeScript":"lveq","数据结构":"lveq"}

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
