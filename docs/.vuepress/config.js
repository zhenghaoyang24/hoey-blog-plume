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

    /**
     * markdown 曾强
     */
    markdown:{
      imageSize: true, // 图片优化 'local（本地图片）' | 'all（所有图片）'
      demo: true, // 启用新的代码演示功能
      // oldDemo:true,
      markmap:true, // 启用 Markmap 图表嵌入语法
      codeTree: true, // 启用代码树
    },

    /**
     * 代码高亮
     * https://theme-plume.vuejs.press/config/plugins/code-highlight/
     * */
    // [lang] title="xxxx"  https://theme-plume.vuejs.press/guide/code/features/
    codeHighlighter: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      notationDiff: true,
      notationErrorLevel: true,
      notationFocus: true, // 启用代码块聚焦 https://theme-plume.vuejs.press/guide/code/features/#%E4%BB%A3%E7%A0%81%E5%9D%97%E4%B8%AD%E8%81%9A%E7%84%A6
      notationHighlight: true,
      notationWordHighlight: true, // 词高亮 https://theme-plume.vuejs.press/guide/code/features/#%E4%BB%A3%E7%A0%81%E5%9D%97%E4%B8%AD-%E8%AF%8D%E9%AB%98%E4%BA%AE
      highlightLines: true, // 启用行高亮 https://theme-plume.vuejs.press/guide/code/features/#%E5%9C%A8%E4%BB%A3%E7%A0%81%E5%9D%97%E4%B8%AD%E5%AE%9E%E7%8E%B0%E8%A1%8C%E9%AB%98%E4%BA%AE
      collapsedLines: true,  // 全局启用 代码折叠 https://theme-plume.vuejs.press/guide/code/features/#%E6%8A%98%E5%8F%A0%E4%BB%A3%E7%A0%81%E5%9D%97
      lineNumbers: true,  // 启用行号 https://theme-plume.vuejs.press/guide/code/features/#%E4%BB%A3%E7%A0%81%E8%A1%8C%E5%8F%B7
    },
    // 添加您的部署域名
    hostname: 'https://zhenghaoyang.cn',
    plugins: {

      // markdownPower: {
      //   imageSize: true, // 图片优化 'local（本地图片）' | 'all（所有图片）'
      //   demo: true, // 启用新的代码演示功能
      // },
      // markdownEnhance: {
      //   markmap: true, // 启用思维导图功能
      //   demo: true, // 启用旧的代码演示功能
      // },
      // shiki: {
      //   twoslash: true,
      //   lineNumbers: 10,
      //   languages: ['sh','css','html','jsx','javascript','js','ts','stylus','json','yaml','tsx','dockerfile','bash','groovy','yml','md','nginx','toml','rust','vue'],
      // },
    },
  }),
})
