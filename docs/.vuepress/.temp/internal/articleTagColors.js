import './articleTagColors.css'
export const articleTagColors = {"CSS":"e6i7","HTML":"e6i7","Vue":"1gad","JavaScript":"xn60","DeBug":"aybs","微信小程序":"1gad","Node":"ca8s","npm":"n3o6","pnpm":"9va1","TypeScript":"9lhj","数据结构":"9lhj"}

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
