import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '',
  docsRepo: 'https://github.com/zhenghaoyang24/hoey-blog-plume',
  docsDir: 'docs',
  appearance: 'true',
  profile: {
    avatar: 'avatar.jpg',
    name: 'Hoey',
    description: '',
    circle: true,
    // location: '',
    // organization: '',
  },
  navbar,
  notes,
  social: [
    { icon: 'github', link: 'https://github.com/zhenghaoyang24' },
    { icon: {svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">\n' +
            '\t<path fill="currentColor" fill-rule="evenodd" d="m7.172 11.334l2.83 1.935l2.728-1.882l6.115 6.033q-.242.079-.512.08H1.667c-.22 0-.43-.043-.623-.12zM20 6.376v9.457c0 .247-.054.481-.15.692l-5.994-5.914zM0 6.429l6.042 4.132l-5.936 5.858A1.7 1.7 0 0 1 0 15.833zM18.333 2.5c.92 0 1.667.746 1.667 1.667v.586L9.998 11.648L0 4.81v-.643C0 3.247.746 2.5 1.667 2.5z" />\n' +
            '</svg>',name:'uiw:mail'}, link: 'mailto:zhenghaoyang24@foxamil.com' },
  ],
  footer:{
    message: '🥼 <a target="_blank" href="https://theme-plume.vuejs.press/">vuepress-theme-plume</a> & ✒️ Hoey'
  },
})
