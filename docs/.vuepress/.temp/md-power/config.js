import { defineClientConfig } from 'vuepress/client'
import Tabs from 'D:/zhy-git/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1._9673347ded33c9309e2a6c575b062149/node_modules/vuepress-plugin-md-power/lib/client/components/Tabs.vue'
import CodeTabs from 'D:/zhy-git/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1._9673347ded33c9309e2a6c575b062149/node_modules/vuepress-plugin-md-power/lib/client/components/CodeTabs.vue'
import Plot from 'D:/zhy-git/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1._9673347ded33c9309e2a6c575b062149/node_modules/vuepress-plugin-md-power/lib/client/components/Plot.vue'
import FileTreeItem from 'D:/zhy-git/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1._9673347ded33c9309e2a6c575b062149/node_modules/vuepress-plugin-md-power/lib/client/components/FileTreeItem.vue'
import VPDemoBasic from 'D:/zhy-git/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1._9673347ded33c9309e2a6c575b062149/node_modules/vuepress-plugin-md-power/lib/client/components/VPDemoBasic.vue'
import VPDemoNormal from 'D:/zhy-git/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1._9673347ded33c9309e2a6c575b062149/node_modules/vuepress-plugin-md-power/lib/client/components/VPDemoNormal.vue'

import 'D:/zhy-git/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-power@1._9673347ded33c9309e2a6c575b062149/node_modules/vuepress-plugin-md-power/lib/client/styles/index.css'

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
