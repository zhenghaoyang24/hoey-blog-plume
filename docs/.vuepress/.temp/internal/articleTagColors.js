import './articleTagColors.css'
export const articleTagColors = {"CSS":"ozii","HTML":"ozii","JavaScript":"kmde","Vue":"3hq6","Git":"ox5c","DeBug":"a71i","微信小程序":"3hq6","Node":"zcvy","npm":"x460","pnpm":"pjzf","TypeScript":"zka3","数据结构":"zka3"}

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
