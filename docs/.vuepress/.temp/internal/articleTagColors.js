import './articleTagColors.css'
export const articleTagColors = {"CSS":"e252","HTML":"e252","JavaScript":"cw60","Vue":"xjgr","git":"dvqz","数据结构":"sjxb","DeBug":"1yc8","微信小程序":"xjgr","Node":"kqsy","npm":"a3d8","pnpm":"3gnv","TypeScript":"sjxb"}

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
