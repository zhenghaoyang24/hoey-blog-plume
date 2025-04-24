import './articleTagColors.css'
export const articleTagColors = {"CSS":"ctpx","HTML":"ctpx","JavaScript":"wxx1","Vue":"g004","Git":"e5p3","数据结构":"4z6r","DeBug":"me4e","微信小程序":"g004","Node":"i2yd","npm":"g3kp","pnpm":"jnos","TypeScript":"4z6r","Node.js":"ctpx"}

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
