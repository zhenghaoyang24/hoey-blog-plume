// src/client/config.ts
import { defineClientConfig } from "vuepress/client";
import {
  enhanceScrollBehavior,
  setupDarkMode,
  setupEncrypt,
  setupHeaders,
  setupSidebar,
  setupThemeData,
  setupWatermark
} from "./composables/index.js";

// src/client/globalComponents.ts
import VPBadge from "@theme/global/VPBadge.vue";
import VPCard from "@theme/global/VPCard.vue";
import VPCardGrid from "@theme/global/VPCardGrid.vue";
import VPImageCard from "@theme/global/VPImageCard.vue";
import VPLinkCard from "@theme/global/VPLinkCard.vue";
import VPHomeBox from "@theme/Home/VPHomeBox.vue";
import VPIcon from "@theme/VPIcon.vue";
function globalComponents(app) {
  app.component("Badge", VPBadge);
  app.component("VPBadge", VPBadge);
  app.component("VPCard", VPCard);
  app.component("Card", VPCard);
  app.component("VPCardGrid", VPCardGrid);
  app.component("CardGrid", VPCardGrid);
  app.component("VPLinkCard", VPLinkCard);
  app.component("LinkCard", VPLinkCard);
  app.component("VPImageCard", VPImageCard);
  app.component("ImageCard", VPImageCard);
  app.component("Icon", VPIcon);
  app.component("VPIcon", VPIcon);
  app.component("HomeBox", VPHomeBox);
  app.component("VPHomeBox", VPHomeBox);
}

// src/client/config.ts
import Layout from "./layouts/Layout.vue";
import NotFound from "./layouts/NotFound.vue";
import "./styles/index.css";
var config_default = defineClientConfig({
  enhance({ app, router }) {
    setupThemeData(app);
    setupDarkMode(app);
    enhanceScrollBehavior(router);
    globalComponents(app);
  },
  setup() {
    setupSidebar();
    setupHeaders();
    setupEncrypt();
    setupWatermark();
  },
  layouts: { Layout, NotFound }
});
export {
  config_default as default
};
