import './iconify.css'
export const icons = {"material-symbols:home":"vpi-apeygtq4","skill-icons:vscode-dark":"vpi-yfeis9vr bg","skill-icons:twitter":"vpi-4kgl2be7 bg","vscode-icons:folder-type-src":"vpi-sp081du5 bg","vscode-icons:folder-type-component":"vpi-6u2jcaqw bg","vscode-icons:file-type-vue":"vpi-enlgnpuc bg","vscode-icons:folder-type-tools":"vpi-k91881ny bg","vscode-icons:file-type-js":"vpi-znr9csje bg","tabler:home":"vpi-ndcvscdv","material-symbols:article-outline":"vpi-czl1m4fs","quill:label":"vpi-q6uyozwh","majesticons:document-line":"vpi-ic4bh15e","ic:outline-note-alt":"vpi-nm2galec"}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateIcons) {
    __VUE_HMR_RUNTIME__.updateIcons(icons)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ icons }) => {
    __VUE_HMR_RUNTIME__.updateIcons(icons)
  })
}
