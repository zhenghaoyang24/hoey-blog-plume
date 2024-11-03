import './iconify.css'
export const icons = {"material-symbols:home":"vpi-apeygtq4","skill-icons:vscode-dark":"vpi-yfeis9vr bg","skill-icons:twitter":"vpi-4kgl2be7 bg"}

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
