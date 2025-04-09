import './articleTagColors.css'
export const articleTagColors = {"CSS":"d0sj","HTML":"d0sj","JavaScript":"48s2","Vue":"el4j","Git":"kk56","数据结构":"zqct","DeBug":"yggh","微信小程序":"el4j","Node":"d31w","npm":"go1i","pnpm":"n6p0","TypeScript":"zqct"}

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
