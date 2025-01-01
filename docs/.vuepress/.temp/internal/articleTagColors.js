import './articleTagColors.css'
export const articleTagColors = {"CSS":"9z0l","HTML":"9z0l","JavaScript":"kks9","Vue":"5uav","DeBug":"tnfs","微信小程序":"5uav","Node":"9pk7","npm":"uf9z","pnpm":"9lu9","TypeScript":"x3c4","数据结构":"x3c4"}

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
