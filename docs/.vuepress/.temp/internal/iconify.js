import './iconify.css'
export const icons = {"vscode-icons:default-folder":"vpi-ipi3m95o bg","vscode-icons:file-type-node":"vpi-np3ezfk9 bg","vscode-icons:file-type-js":"vpi-y4rtru34 bg","flat-color-icons:info":"vpi-l9qc4xrm bg","logos:vue":"vpi-9aaufu1f bg","logos:react":"vpi-zqp6gkpu bg","logos:angular-icon":"vpi-efkjkuda bg","logos:flutter":"vpi-5a48rhns bg","logos:nativescript":"vpi-cfbkfmnc bg","logos:electron":"vpi-l4jbsdwm bg","logos:tauri":"vpi-ssdscq5a bg","logos:element":"vpi-cv4y9qw8 bg","logos:naiveui":"vpi-6qz615yy bg","logos:vuetifyjs":"vpi-cwhld202 bg","skill-icons:bootstrap":"vpi-gorwvd6q bg","logos:pinia":"vpi-elpk78g9 bg","logos:vueuse":"vpi-044fjypx bg","logos:less":"vpi-0z1mfvlt bg","logos:sass":"vpi-q9yoak8e bg","logos:stylus":"vpi-zs09a8c6 bg","logos:javascript":"vpi-lhuljnpa bg","logos:vitejs":"vpi-wm7n789r bg","logos:webpack":"vpi-0o0pbdfv bg","logos:hexo":"vpi-7y8w4pv5 bg","vscode-icons:folder-type-src":"vpi-irihgq5r bg","vscode-icons:folder-type-component":"vpi-n47zw3ct bg","vscode-icons:file-type-vue":"vpi-khe8pk5i bg","vscode-icons:folder-type-tools":"vpi-it11yli6 bg","material-symbols:home":"vpi-oagspsjb","material-symbols:article-outline":"vpi-d28wb1q0","ic:outline-note-alt":"vpi-zeba1ivu","logos:web-dev-icon":"vpi-tuen7e8l bg","material-icon-theme:android":"vpi-ehphy3wh bg","emojione:memo":"vpi-ryzfze2g bg","mingcute:more-3-fill":"vpi-17f2gwss","icon-park:friends-circle":"vpi-sjmzxiu6 bg","material-icon-theme:folder-project-open":"vpi-rij13vs4 bg","logos:sitepoint":"vpi-lqov72jb bg"}

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
