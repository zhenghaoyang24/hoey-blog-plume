import './articleTagColors.css'
export const articleTagColors = {"CSS":"ik7h","HTML":"ik7h","JavaScript":"5u0r","Vue":"l0pk","DeBug":"9e0m","微信小程序":"l0pk","Node":"w0w6","npm":"cg70","pnpm":"6cov","数据结构":"oygv","Thought":"9e0m","markdown":"9hta"}

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
