import './articleTagColors.css'
export const articleTagColors = {"CSS":"wd06","HTML":"wd06","JavaScript":"u9yt","Vue":"8303","git":"fslh","数据结构":"tpwr","DeBug":"zx74","微信小程序":"8303","Node":"ix2n","npm":"v1sw","pnpm":"slos","TypeScript":"tpwr"}

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
