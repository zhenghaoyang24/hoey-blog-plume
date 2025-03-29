import './articleTagColors.css'
export const articleTagColors = {"CSS":"y95h","HTML":"y95h","JavaScript":"kilt","Vue":"tsz5","Git":"d6cv","数据结构":"5pgx","DeBug":"5kof","微信小程序":"tsz5","Node":"whtv","npm":"4qyw","pnpm":"5cb6","TypeScript":"5pgx"}

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
