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
      ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  base: '/',
  lang: 'zh-CN',
  title: 'Hoey',
  description: 'Hoey\' blog.',

  bundler: viteBundler(),

  theme: plumeTheme({

    // 添加您的部署域名
    hostname: 'https://hoeyzheng.top',
    plugins: {
      markdownPower: {  //图片优化
        // imageSize: true, // 'local' | 'all'
        demo:true,
        markmap: true,  // 导图插件
      },
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        twoslash: true,
        lineNumbers: 10,
           // 强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
        languages:['sh','ts','md', 'html', 'js','go', 'kotlin',
          'rust','vue','css','json',
          'scss', 'yaml', 'bash', 'c++', 'java', 'py', 'ruby', 'make', 'objc', 'swift', 'php', 'rs',
          'astro','svelte','wasm',
          'sql','xml','zig','pug','http','less','styl','jsx','tsx',
          'vb','bat','cs','cpp','mermaid'],
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        markmap: true,
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      // markdownPower: {
      //   pdf: true,
      //   caniuse: true,
      //   plot: true,
      //   bilibili: true,
      //   youtube: true,
      //   icons: true,
      //   codepen: true,
      //   replit: true,
      //   codeSandbox: true,
      //   jsfiddle: true,
      //   repl: {
      //     go: true,
      //     rust: true,
      //     kotlin: true,
      //   },
      // },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },
  }),
})
