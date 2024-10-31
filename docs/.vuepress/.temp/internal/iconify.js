import './iconify.css'
export const icons = {"material-symbols:home":"vpi-ap2ghion","skill-icons:vscode-dark":"vpi-t1grl65y bg","skill-icons:twitter":"vpi-utwhy0zv bg"}

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
