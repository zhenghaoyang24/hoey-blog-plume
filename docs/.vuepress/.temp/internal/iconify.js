import './iconify.css'
export const icons = {"vscode-icons:default-folder":"vpi-83vsacmv bg","vscode-icons:file-type-node":"vpi-yzzyd5lb bg","vscode-icons:file-type-js":"vpi-ldx74lde bg","flat-color-icons:info":"vpi-so09tmus bg","logos:vue":"vpi-ma11y3xm bg","logos:react":"vpi-mw9gskpv bg","logos:angular-icon":"vpi-dvyb9rse bg","logos:flutter":"vpi-q1wkqmbh bg","logos:nativescript":"vpi-dfe82djv bg","logos:electron":"vpi-jj59cmnx bg","logos:tauri":"vpi-d2mt3nph bg","logos:element":"vpi-mlkgdeu5 bg","logos:naiveui":"vpi-lt16x3vn bg","logos:vuetifyjs":"vpi-611yo1le bg","skill-icons:bootstrap":"vpi-e9vqnm8y bg","logos:pinia":"vpi-wpy7k392 bg","logos:vueuse":"vpi-v6vv6nk9 bg","logos:less":"vpi-sxd73q5b bg","logos:sass":"vpi-m8h8hw8f bg","logos:stylus":"vpi-73izhg4w bg","logos:javascript":"vpi-xenesrnn bg","logos:vitejs":"vpi-pm1ezm1o bg","logos:webpack":"vpi-006fq3tj bg","logos:hexo":"vpi-hyhhj1wy bg","vscode-icons:folder-type-src":"vpi-uvniqur7 bg","vscode-icons:folder-type-component":"vpi-v2yhk8u0 bg","vscode-icons:file-type-vue":"vpi-q83y6bhb bg","vscode-icons:folder-type-tools":"vpi-lf4unaua bg","cib:about-me":"vpi-8o62fc4b","material-symbols:article-outline":"vpi-qpbd3iu9","ic:outline-note-alt":"vpi-9hfi7al1","fluent-emoji-high-contrast:thinking-face":"vpi-62woybkn","tabler:map-question":"vpi-kbmai0jh","memory:time-sand":"vpi-rjv005c6","material-symbols:camera":"vpi-mdiyxgg1","mingcute:more-3-fill":"vpi-hx51p8rg","game-icons:three-friends":"vpi-pg5jzyjd","codicon:github-project":"vpi-j7qvqtxm","dashicons:admin-site-alt3":"vpi-c0n0tz1l"}

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
