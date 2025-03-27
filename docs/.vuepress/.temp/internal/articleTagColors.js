import './articleTagColors.css'
export const articleTagColors = {"CSS":"hbki","HTML":"hbki","JavaScript":"1fnj","Vue":"df9i","Git":"epou","数据结构":"o8wy","DeBug":"6kwn","微信小程序":"df9i","Node":"shsb","npm":"k7xj","pnpm":"xoht","TypeScript":"o8wy"}

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
