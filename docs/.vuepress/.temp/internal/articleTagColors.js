import './articleTagColors.css'
export const articleTagColors = {"CSS":"uv9n","HTML":"uv9n","JavaScript":"3vaz","Vue":"73tf","DeBug":"npvf","微信小程序":"73tf","Node":"i2nf","npm":"svib","pnpm":"c7q8","数据结构":"500d","Thought":"npvf","markdown":"d06b"}

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
