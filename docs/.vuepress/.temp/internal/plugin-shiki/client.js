import { enhanceTwoslash } from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/@vuepress-plume+plugin-shikiji@1.0.0-rc.135_typescript@5.7.3_vue@3.5.13_typescript@5.7.3__vue_ty2apzw6rmaysmql3625cdsdzy/node_modules/@vuepress-plume/plugin-shikiji/lib/client/composables/twoslash.js'
import { useCopyCode } from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/@vuepress-plume+plugin-shikiji@1.0.0-rc.135_typescript@5.7.3_vue@3.5.13_typescript@5.7.3__vue_ty2apzw6rmaysmql3625cdsdzy/node_modules/@vuepress-plume/plugin-shikiji/lib/client/composables/copy-code.js'
import { useCollapsedLines } from 'G:/200-Project/hoey-blog-plume/node_modules/.pnpm/@vuepress-plume+plugin-shikiji@1.0.0-rc.135_typescript@5.7.3_vue@3.5.13_typescript@5.7.3__vue_ty2apzw6rmaysmql3625cdsdzy/node_modules/@vuepress-plume/plugin-shikiji/lib/client/composables/collapsed-lines.js'

export default {
  enhance({ app }) {
    enhanceTwoslash(app)
  },
  setup() {
    useCopyCode({
      selector: __CC_SELECTOR__,
      duration: __CC_DURATION__,
    })
    useCollapsedLines()
  },
}
