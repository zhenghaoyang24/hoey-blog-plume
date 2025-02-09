import './articleTagColors.css'
export const articleTagColors = {"CSS":"8tca","HTML":"8tca","JavaScript":"2f5h","Vue":"ygai","git":"3cq6","数据结构":"cegz","DeBug":"09cm","微信小程序":"ygai","Node":"8di0","npm":"muji","pnpm":"fmjl","TypeScript":"cegz"}

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
