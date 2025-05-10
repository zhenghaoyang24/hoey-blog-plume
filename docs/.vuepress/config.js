import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  autoFrontmatter: {
    permalink: true, // 是否生成永久链接
    createTime: true, // 是否生成创建时间
    title: true, // 是否生成标题
  },
  head: [
      ['meta', { name: 'referrer', content: 'no-referrer' }],
      ['script', { type: 'text/javascript' }, `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "qnwy9r0rp7");
      `]

  ],
  base: '/',
  lang: 'zh-CN',
  title: 'Hoey',
  description: 'Hoey\' blog.',

  bundler: viteBundler(),

  theme: plumeTheme({

    // 添加您的部署域名
    hostname: 'https://www.zhenghaoyang.cn',
    plugins: {
      markdownPower: {
        imageSize: true, // 图片优化 'local（本地图片）' | 'all（所有图片）'
        demo: true, // 启用新的代码演示功能
      },
      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        markmap: true, // 启用思维导图功能
        demo: true, // 启用旧的代码演示功能
      },
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        twoslash: true,
        lineNumbers: 10,
        languages: ['sh','css','html','jsx','javascript','js','ts','stylus','json','yaml','tsx','dockerfile','bash','groovy','yml','md','nginx','toml','rust','vue'],
      },
    },
  }),
})
