import { defineClientConfig } from 'vuepress/client'
import Tabs from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.135_esbuild@0.25.0_less@4.2.2_markdown-it@14.1.0_sass-embed_sjzspqbuvrdprsero5brtfvpay/node_modules/vuepress-plugin-md-power/lib/client/components/Tabs.vue'
import CodeTabs from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.135_esbuild@0.25.0_less@4.2.2_markdown-it@14.1.0_sass-embed_sjzspqbuvrdprsero5brtfvpay/node_modules/vuepress-plugin-md-power/lib/client/components/CodeTabs.vue'
import Plot from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.135_esbuild@0.25.0_less@4.2.2_markdown-it@14.1.0_sass-embed_sjzspqbuvrdprsero5brtfvpay/node_modules/vuepress-plugin-md-power/lib/client/components/Plot.vue'
import FileTreeItem from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.135_esbuild@0.25.0_less@4.2.2_markdown-it@14.1.0_sass-embed_sjzspqbuvrdprsero5brtfvpay/node_modules/vuepress-plugin-md-power/lib/client/components/FileTreeItem.vue'
import VPDemoBasic from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.135_esbuild@0.25.0_less@4.2.2_markdown-it@14.1.0_sass-embed_sjzspqbuvrdprsero5brtfvpay/node_modules/vuepress-plugin-md-power/lib/client/components/VPDemoBasic.vue'
import VPDemoNormal from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.135_esbuild@0.25.0_less@4.2.2_markdown-it@14.1.0_sass-embed_sjzspqbuvrdprsero5brtfvpay/node_modules/vuepress-plugin-md-power/lib/client/components/VPDemoNormal.vue'

import 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1.0.0-rc.135_esbuild@0.25.0_less@4.2.2_markdown-it@14.1.0_sass-embed_sjzspqbuvrdprsero5brtfvpay/node_modules/vuepress-plugin-md-power/lib/client/styles/index.css'

export default defineClientConfig({
  enhance({ router, app }) {
    app.component('Tabs', Tabs)
    app.component('CodeTabs', CodeTabs)
    app.component('Plot', Plot)
    app.component('FileTreeItem', FileTreeItem)
    app.component('VPDemoBasic', VPDemoBasic)
    app.component('VPDemoNormal', VPDemoNormal)
  }
})
