export const redirects = JSON.parse("{\"/notes/site.html\":\"/sites-collect/\",\"/%E5%AD%A6%E6%96%87/22032301.html\":\"/article/22032301/\",\"/%E5%AD%A6%E6%96%87/22110801.html\":\"/article/22110801/\",\"/%E5%AD%A6%E6%96%87/23042001.html\":\"/article/23042001/\",\"/%E5%AD%A6%E6%96%87/23050701.html\":\"/article/23050701/\",\"/%E5%AD%A6%E6%96%87/23053001.html\":\"/article/23053001/\",\"/notes/patch/\":\"/patch/\",\"/%E6%8A%80%E6%96%87/22041901.html\":\"/article/22041901/\",\"/%E6%8A%80%E6%96%87/22092701.html\":\"/article/22092701/\",\"/%E6%8A%80%E6%96%87/23010801.html\":\"/article/23010801/\",\"/%E6%8A%80%E6%96%87/23042601.html\":\"/article/23042601/\",\"/%E6%8A%80%E6%96%87/23061101.html\":\"/article/23061101/\",\"/%E6%8A%80%E6%96%87/23072701.html\":\"/article/23072701/\",\"/%E6%8A%80%E6%96%87/23091201.html\":\"/article/23091201/\",\"/%E6%8A%80%E6%96%87/24081301.html\":\"/article/24081301/\",\"/%E6%8A%80%E6%96%87/24091101.html\":\"/article/24091101/\",\"/%E6%9D%82%E6%96%87/22101101.html\":\"/article/22101101/\",\"/notes/patch/Vue/vue3new.html\":\"/patch/Vue3new/\",\"/notes/patch/Vue/vue3QuickStart.html\":\"/patch/vue3quickStart/\",\"/notes/patch/Vue/vuebasic.html\":\"/patch/VueBasic/\",\"/notes/patch/Vue/vuedepth.html\":\"/patch/VueDepth/\",\"/notes/patch/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/CSS3.html\":\"/patch/CSS3/\",\"/notes/patch/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/HTML5.html\":\"/patch/HTML5/\",\"/notes/patch/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84/tree.html\":\"/patch/tree/\"}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/sites-collect/", { loader: () => import(/* webpackChunkName: "sites-collect_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/sites-collect/index.html.js"), meta: {"title":"网址导航"} }],
  ["/article/22032301/", { loader: () => import(/* webpackChunkName: "article_22032301_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/22032301/index.html.js"), meta: {"title":"CSS中的Grid布局"} }],
  ["/article/22110801/", { loader: () => import(/* webpackChunkName: "article_22110801_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/22110801/index.html.js"), meta: {"title":"回调函数理解"} }],
  ["/article/23042001/", { loader: () => import(/* webpackChunkName: "article_23042001_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/23042001/index.html.js"), meta: {"title":"JS中的事件循环机制与异步处理"} }],
  ["/article/23050701/", { loader: () => import(/* webpackChunkName: "article_23050701_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/23050701/index.html.js"), meta: {"title":"关于Vue中的v-model"} }],
  ["/article/23053001/", { loader: () => import(/* webpackChunkName: "article_23053001_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/23053001/index.html.js"), meta: {"title":"JS中的数组处理函数"} }],
  ["/patch/", { loader: () => import(/* webpackChunkName: "patch_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/index.html.js"), meta: {"title":"温故知新"} }],
  ["/article/22041901/", { loader: () => import(/* webpackChunkName: "article_22041901_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/22041901/index.html.js"), meta: {"title":"利用keyframes实现加载动画"} }],
  ["/article/22092701/", { loader: () => import(/* webpackChunkName: "article_22092701_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/22092701/index.html.js"), meta: {"title":"静态页面实现答题功能"} }],
  ["/article/23010801/", { loader: () => import(/* webpackChunkName: "article_23010801_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/23010801/index.html.js"), meta: {"title":"表单action的异步问题"} }],
  ["/article/23042601/", { loader: () => import(/* webpackChunkName: "article_23042601_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/23042601/index.html.js"), meta: {"title":"微信小程序中实现翻译功能"} }],
  ["/article/23061101/", { loader: () => import(/* webpackChunkName: "article_23061101_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/23061101/index.html.js"), meta: {"title":"修改element-plus的css变量"} }],
  ["/article/23072701/", { loader: () => import(/* webpackChunkName: "article_23072701_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/23072701/index.html.js"), meta: {"title":"让div标签支持focus/blur事件"} }],
  ["/article/23091201/", { loader: () => import(/* webpackChunkName: "article_23091201_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/23091201/index.html.js"), meta: {"title":"利用:root切换主题"} }],
  ["/article/24081301/", { loader: () => import(/* webpackChunkName: "article_24081301_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/24081301/index.html.js"), meta: {"title":"为VuePress文档添加右侧导航栏"} }],
  ["/article/24091101/", { loader: () => import(/* webpackChunkName: "article_24091101_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/24091101/index.html.js"), meta: {"title":"corepack管理包管理器"} }],
  ["/article/22101101/", { loader: () => import(/* webpackChunkName: "article_22101101_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/article/22101101/index.html.js"), meta: {"title":"帮助学习数据结构的网站"} }],
  ["/patch/Vue3new/", { loader: () => import(/* webpackChunkName: "patch_Vue3new_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/Vue3new/index.html.js"), meta: {"title":"Vue3新特性"} }],
  ["/patch/vue3quickStart/", { loader: () => import(/* webpackChunkName: "patch_vue3quickStart_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/vue3quickStart/index.html.js"), meta: {"title":"Vue3快速入门"} }],
  ["/patch/VueBasic/", { loader: () => import(/* webpackChunkName: "patch_VueBasic_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/VueBasic/index.html.js"), meta: {"title":"Vue2基础"} }],
  ["/patch/VueDepth/", { loader: () => import(/* webpackChunkName: "patch_VueDepth_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/VueDepth/index.html.js"), meta: {"title":"Vue2深入"} }],
  ["/patch/CSS3/", { loader: () => import(/* webpackChunkName: "patch_CSS3_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/CSS3/index.html.js"), meta: {"title":"CSS3"} }],
  ["/patch/HTML5/", { loader: () => import(/* webpackChunkName: "patch_HTML5_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/HTML5/index.html.js"), meta: {"title":"HTML5"} }],
  ["/patch/tree/", { loader: () => import(/* webpackChunkName: "patch_tree_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/patch/tree/index.html.js"), meta: {"title":"树"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
  ["/blog/", { loader: () => import(/* webpackChunkName: "blog_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/blog/index.html.js"), meta: {"title":"博客"} }],
  ["/blog/tags/", { loader: () => import(/* webpackChunkName: "blog_tags_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/blog/tags/index.html.js"), meta: {"title":"标签"} }],
  ["/blog/archives/", { loader: () => import(/* webpackChunkName: "blog_archives_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/blog/archives/index.html.js"), meta: {"title":"归档"} }],
  ["/blog/categories/", { loader: () => import(/* webpackChunkName: "blog_categories_index.html" */"G:/200-Project/hoey-blog-plume/docs/.vuepress/.temp/pages/blog/categories/index.html.js"), meta: {"title":"分类"} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
