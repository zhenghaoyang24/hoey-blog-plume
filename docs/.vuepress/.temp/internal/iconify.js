import './iconify.css'
export const icons = {"logos:vue":"vpi-szmmvrd4 bg","logos:react":"vpi-0j48ibz0 bg","logos:angular-icon":"vpi-x89ytwqa bg","logos:flutter":"vpi-bcfhvcor bg","logos:nativescript":"vpi-m2hq0o75 bg","logos:electron":"vpi-np9uo029 bg","logos:tauri":"vpi-figyjvta bg","logos:element":"vpi-fko2zm9e bg","logos:naiveui":"vpi-187a1zv8 bg","logos:vuetifyjs":"vpi-f9tywslh bg","skill-icons:bootstrap":"vpi-mvpumfde bg","logos:pinia":"vpi-b7s2in3y bg","logos:vueuse":"vpi-geak0d2h bg","logos:less":"vpi-tl0fvt79 bg","logos:sass":"vpi-pksyj3zq bg","logos:stylus":"vpi-y0bae4z0 bg","logos:javascript":"vpi-yfrwrngk bg","logos:vitejs":"vpi-x8h0e69t bg","logos:webpack":"vpi-d1oi3kuy bg","logos:hexo":"vpi-gg9ro7o3 bg","vscode-icons:default-folder":"vpi-pb9gcgn3 bg","vscode-icons:file-type-node":"vpi-ou2jky81 bg","vscode-icons:file-type-js":"vpi-znr9csje bg","flat-color-icons:info":"vpi-g3k38jxq bg","vscode-icons:folder-type-src":"vpi-sp081du5 bg","vscode-icons:folder-type-component":"vpi-6u2jcaqw bg","vscode-icons:file-type-vue":"vpi-enlgnpuc bg","vscode-icons:folder-type-tools":"vpi-k91881ny bg","tabler:home":"vpi-ndcvscdv","material-symbols:article-outline":"vpi-czl1m4fs","quill:label":"vpi-q6uyozwh","majesticons:document-line":"vpi-ic4bh15e","ic:outline-note-alt":"vpi-nm2galec","fluent-emoji-high-contrast:thinking-face":"vpi-uz42rlud","dashicons:admin-site-alt3":"vpi-7p57a9v9"}

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
