import './articleTagColors.css'
export const articleTagColors = {"CSS":"cn6h","HTML":"cn6h","JavaScript":"lipr","Vue":"hsr7","git":"z789","DeBug":"fq4g","微信小程序":"hsr7","Node":"fyzk","npm":"1go5","pnpm":"7ee9","TypeScript":"qqe0","数据结构":"qqe0"}

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
