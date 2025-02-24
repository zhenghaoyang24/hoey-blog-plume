import CodeDemo from "G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.72_markdown-it@14.1.0_sass-embedded@1.85.0_sass@1.85.0_ty_xa4foto34dchcfeimenbcjw6z4/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "G:/200-Project/hoey-blog-plume/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-rc.72_markdown-it@14.1.0_sass-embedded@1.85.0_sass@1.85.0_ty_xa4foto34dchcfeimenbcjw6z4/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";

export default {
  enhance: ({ app }) => {
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
  },
};
