import './articleTagColors.css'
export const articleTagColors = {"CSS":"8x6c","HTML":"8x6c","JavaScript":"ww50","Vue":"9dk2","Git":"e8j1","DeBug":"pkqr","微信小程序":"9dk2","Node":"vp32","npm":"60av","pnpm":"xv1r","TypeScript":"685x","数据结构":"685x"}

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
