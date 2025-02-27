import './articleTagColors.css'
export const articleTagColors = {"CSS":"7qic","HTML":"7qic","JavaScript":"2v8r","Vue":"ihjl","git":"90ts","数据结构":"cjpw","DeBug":"ftcb","微信小程序":"ihjl","Node":"en6j","npm":"rbfu","pnpm":"ltnl","TypeScript":"cjpw"}

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
