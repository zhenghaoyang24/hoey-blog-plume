import './articleTagColors.css'
export const articleTagColors = {"CSS":"g0qj","HTML":"g0qj","JavaScript":"015r","Vue":"gg3x","DeBug":"5o6r","微信小程序":"gg3x","Node":"i8gj","npm":"j7ll","pnpm":"r9v6","数据结构":"qzyh","Thought":"5o6r","markdown":"hb8b"}

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
