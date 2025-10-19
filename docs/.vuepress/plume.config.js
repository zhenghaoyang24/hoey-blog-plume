import { defineThemeConfig } from 'vuepress-theme-plume'

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
  social: [
    { icon: 'github', link: 'https://github.com/zhenghaoyang24' },
    { icon: {svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><g fill="none"><g clip-path="url(#SVGXv8lpc2Y)"><path fill="currentColor" fill-rule="evenodd" d="M11.372.19c.38-.253.875-.253 1.256 0L23.492 7.4c.317.21.508.565.508.946v7.308c0 .38-.19.736-.508.947l-10.864 7.21c-.38.252-.875.252-1.256 0L.508 16.6A1.14 1.14 0 0 1 0 15.654V8.346c0-.38.19-.736.508-.947zm-9.1 10.273v3.058l2.288-1.54zm4.337 2.878L3.18 15.648l7.684 5.1v-4.583zm6.527 2.824v4.582l7.684-5.1l-3.43-2.306zm6.304-4.183l2.288 1.54v-3.06zm1.37-3.636l-3.41 2.263l-4.264-2.868V3.253zm-9.946-5.093V7.74l-4.263 2.868L3.19 8.346zM12 9.715l-3.35 2.254L12 14.192l3.35-2.223z" clip-rule="evenodd"/></g><defs><clipPath id="SVGXv8lpc2Y"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g></svg>'}, link: 'https://codepen.io/zhenghaoyang24' },
    { icon: {svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">\n' +
            '\t<path fill="currentColor" fill-rule="evenodd" d="m7.172 11.334l2.83 1.935l2.728-1.882l6.115 6.033q-.242.079-.512.08H1.667c-.22 0-.43-.043-.623-.12zM20 6.376v9.457c0 .247-.054.481-.15.692l-5.994-5.914zM0 6.429l6.042 4.132l-5.936 5.858A1.7 1.7 0 0 1 0 15.833zM18.333 2.5c.92 0 1.667.746 1.667 1.667v.586L9.998 11.648L0 4.81v-.643C0 3.247.746 2.5 1.667 2.5z" />\n' +
            '</svg>',name:'uiw:mail'}, link: 'mailto:zhenghaoyang24@foxamil.com' },
  ],
  footer:{
    message: '🥼 <a target="_blank" href="https://theme-plume.vuejs.press/">vuepress-theme-plume</a> & ✒️ Hoey'
  },
})
