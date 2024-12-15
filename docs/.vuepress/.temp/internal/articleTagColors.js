import './articleTagColors.css'
export const articleTagColors = {"CSS":"ilm8","HTML":"ilm8","JavaScript":"7767","Vue":"bl9a","DeBug":"9o54","微信小程序":"bl9a","Node":"2k8c","npm":"uedn","pnpm":"lese","数据结构":"krbw"}

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
