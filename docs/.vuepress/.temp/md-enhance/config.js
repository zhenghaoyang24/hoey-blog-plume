import MarkMap from "G:/200-Project/hoey-blog-plume/node_modules/vuepress-plugin-md-enhance/lib/client/components/MarkMap.js";

export default {
  enhance: ({ app }) => {
    app.component("MarkMap", MarkMap);
  },
};
