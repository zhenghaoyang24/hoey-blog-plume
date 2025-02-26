import './articleTagColors.css'
export const articleTagColors = {"CSS":"j2c2","HTML":"j2c2","JavaScript":"4eyy","Vue":"7y40","git":"enl8","数据结构":"e9z6","DeBug":"598d","微信小程序":"7y40","Node":"o84g","npm":"i3qb","pnpm":"52v0","TypeScript":"e9z6"}

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
