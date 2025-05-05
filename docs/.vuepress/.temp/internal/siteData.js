export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"zh-CN\",\"title\":\"Hoey\",\"description\":\"Hoey' blog.\",\"head\":[[\"meta\",{\"name\":\"referrer\",\"content\":\"no-referrer\"}],[\"script\",{\"type\":\"text/javascript\"},\"\\n        (function(c,l,a,r,i,t,y){\\n          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\\n          t=l.createElement(r);t.async=1;t.src=\\\"https://www.clarity.ms/tag/\\\"+i;\\n          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\\n        })(window, document, \\\"clarity\\\", \\\"script\\\", \\\"qnwy9r0rp7\\\");\\n      \"]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
