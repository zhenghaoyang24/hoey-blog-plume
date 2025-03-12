import './articleTagColors.css'
export const articleTagColors = {"CSS":"i22u","HTML":"i22u","JavaScript":"72b4","Vue":"2uuk","git":"9xn4","DeBug":"f0ix","微信小程序":"2uuk","Node":"3ztm","npm":"6y7y","pnpm":"q3d4","TypeScript":"8l3l","数据结构":"8l3l"}

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
