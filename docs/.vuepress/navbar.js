import {defineNavbarConfig} from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
    {text: '我', link: '/',icon:'cib:about-me'},
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
        text: '拾光',
        items: [
            {text: '随影', link: '/notes/lifetime/camera.md',icon:'material-symbols:camera'},
        ],
        icon:'memory:time-sand'
    },
    {
        text: '更多',
        items: [
            {text:'友情链接', link: '/notes/more/friends.md',icon:'game-icons:three-friends'},
            {text:'我的项目', link: '/notes/more/projects.md',icon:'codicon:github-project'},
            {text:'网址导航', link: '/notes/more/site.md',icon:'dashicons:admin-site-alt3'},
        ],
        icon:'mingcute:more-3-fill',
        activeMatch: '^/more/',
    },
])
