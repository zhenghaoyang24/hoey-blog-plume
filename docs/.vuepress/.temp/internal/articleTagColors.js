import './articleTagColors.css'
export const articleTagColors = {"CSS":"5llh","HTML":"5llh","JavaScript":"f3bf","Vue":"nuw1","Git":"hwld","数据结构":"yozn","DeBug":"xjg4","微信小程序":"nuw1","Node":"vu83","npm":"n1nf","pnpm":"0rgv","TypeScript":"yozn"}

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
