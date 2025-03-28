import './articleTagColors.css'
export const articleTagColors = {"CSS":"ljkq","HTML":"ljkq","JavaScript":"2j90","Vue":"vtik","Git":"1mcu","DeBug":"6nbd","微信小程序":"vtik","Node":"5wot","npm":"o1a0","pnpm":"zkeh","TypeScript":"jzzs","数据结构":"jzzs"}

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
