import { defineClientConfig } from 'vuepress/client'
import './theme/styles/index.css'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
import HomePage from './theme/components/HomePage.vue'
import Custom from './theme/components/Custom.vue'

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    app.component('RepoCard', RepoCard)
    app.component('HomePage', HomePage)
    app.component('Custom', Custom)
  },
})
