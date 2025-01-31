import './articleTagColors.css'
export const articleTagColors = {"CSS":"4tau","HTML":"4tau","Vue":"wldw","JavaScript":"uler","DeBug":"5q4k","微信小程序":"wldw","Node":"dchx","npm":"0ugj","pnpm":"49zk","TypeScript":"rbb9","数据结构":"rbb9"}

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
