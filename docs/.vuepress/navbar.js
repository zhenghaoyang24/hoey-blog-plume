import {defineNavbarConfig} from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
    {text: '首页', link: '/',icon:'tabler:home'},
    {text: '博客', link: '/blog/',icon:'material-symbols:article-outline',activeMatch: '^(/blog/|/article/)',},
    {
        text: '笔记',
        items: [
            {text: '温故知新', link: '/notes/patch/README.md',icon:'fluent-emoji-high-contrast:thinking-face'},
            {text:'前端面试', link: '/notes/interview/README.md',icon:'tabler:map-question'},

        ],
        icon:'ic:outline-note-alt',
        activeMatch: '^/notes/',
    },
    {
        text: '更多',
        items: [
            {text:'网址导航', link: '/notes/more/site.md',icon:'dashicons:admin-site-alt3'},
        ],
        icon:'gg:more-r',
        activeMatch: '^/more/',
    },
    {
        text: '拾光',
        items: [
            {text: '随影', link: '/notes/lifetime/camera.md',icon:'material-symbols:camera'},
        ],
        icon:'memory:time-sand'
    },
])
