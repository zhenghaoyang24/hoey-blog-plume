import { defineClientConfig } from 'vuepress/client'
import './theme/styles/index.css'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import Custom from './theme/components/Custom.vue'
import AllFriendContent from './theme/components/AllFriendContent.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('RepoCard', RepoCard)
    app.component('Custom', Custom)
    app.component('AllFriendContent', AllFriendContent)
  },
})
