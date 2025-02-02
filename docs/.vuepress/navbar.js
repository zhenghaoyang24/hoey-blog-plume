import {defineNavbarConfig} from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
    {text: '首页', link: '/',icon:'tabler:home'},
    {text: '博客', link: '/blog/',icon:'material-symbols:article-outline'},
    {text: '标签', link: '/blog/tags/',icon:'quill:label'},
    {text: '归档', link: '/blog/archives/',icon:'majesticons:document-line'},
    {
        text: '笔记',
        items: [
            {text: '温故知新', link: '/notes/patch/README.md',icon:'fluent-emoji-high-contrast:thinking-face'},
            {text:'前端面试', link: '/notes/interview/README.md',icon:'tabler:map-question'},
            {text:'网址导航', link: '/notes/site.md',icon:'dashicons:admin-site-alt3'},
        ],
        icon:'ic:outline-note-alt'
    },
    {

        text: '拾光',
        items: [
            {text: '随影', link: '/notes/lifetime/camera.md',icon:'material-symbols:camera'},
        ],
        icon:'memory:time-sand'
    },
])
