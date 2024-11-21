import {defineNavbarConfig} from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
    {text: '首页', link: '/',icon:'tabler:home'},
    {text: '博客', link: '/blog/',icon:'material-symbols:article-outline'},
    {text: '标签', link: '/blog/tags/',icon:'quill:label'},
    {text: '归档', link: '/blog/archives/',icon:'majesticons:document-line'},
    {
        text: '笔记',
        items: [
            {text: '温故知新', link: '/notes/patch/README.md'},
            {text:'网址导航', link: '/notes/site.md'},
        ],
        icon:'ic:outline-note-alt'
    },
])
