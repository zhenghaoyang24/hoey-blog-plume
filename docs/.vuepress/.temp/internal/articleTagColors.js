import './articleTagColors.css'
export const articleTagColors = {"CSS":"j9v3","HTML":"j9v3","JavaScript":"loah","Vue":"y2ku","DeBug":"bz50","微信小程序":"y2ku","Node":"pnix","npm":"y1ud","pnpm":"zy3h","数据结构":"dway","Thought":"bz50","markdown":"y21g"}

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
