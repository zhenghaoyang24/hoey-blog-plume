import './articleTagColors.css'
export const articleTagColors = {"CSS":"km26","HTML":"km26","JavaScript":"t0c8","Vue":"0wle","git":"y4jv","DeBug":"v7hg","微信小程序":"0wle","Node":"2yjq","npm":"u6m6","pnpm":"2vfi","TypeScript":"8spc","数据结构":"8spc"}

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
