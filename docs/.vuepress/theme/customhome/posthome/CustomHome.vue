<template>
  <div class="custom-home">
    <BackgroundEffect
      :speed="0.6"
      :scale="1"
      :brightness="1"
      :color1="'#216e39'"
      :color2="'#30a14e'"
      :noise-frequency="3.5"
      :noise-amplitude="3.5"
      :band-height="0.5"
      :band-spread="1"
      :octave-decay="0.1"
      :layer-offset="1"
      :color-speed="1"
      :enable-mouse-interaction="false"
      :mouse-influence="0.25"
      :className="'bg-container'"
    />
    <div class="custom-home-container">
      <div class="custom-home-content">
        <InfoSection />
        <ContributionSection />
        <SkillSection />
        <PostSection />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 模块加载时机早于 VuePress 应用创建（createVueApp / app.use(router)）。
// 硬刷新时，路由的 scrollBehavior 会把 history.state.scroll（浏览器记录的上一会话
// 滚动位置）作为 savedPosition 恢复，导致刷新后页面停留在底部。
// 这里在路由读取之前将其置空：硬刷新回到顶部，SPA 内的前进/后退不受影响。
if (typeof window !== "undefined" && typeof history !== "undefined") {
  history.replaceState({ ...history.state, scroll: null }, "");
}

// 模块级标记：仅文档首次挂载（硬刷新/直接访问）时修正滚动位置，SPA 导航复用
let __posthomeScrollHandled = false;
</script>

<script setup lang="ts">
import { nextTick, onMounted } from "vue";
import BackgroundEffect from "./components/BackgroundEffect.vue";
import PostSection from "./PostSection.vue";
import ContributionSection from "./ContributionSection.vue";
import InfoSection from "./InfoSection.vue";
import SkillSection from "./SkillSection.vue";

onMounted(() => {
  if (__posthomeScrollHandled) return;
  __posthomeScrollHandled = true;
  // 覆盖浏览器原生/路由可能残留的滚动恢复，确保刷新后回到顶部
  const toTop = () => window.scrollTo({ top: 0 });
  nextTick(toTop);
  window.addEventListener("load", toTop, { once: true });
  window.setTimeout(toTop, 1500);
});
</script>

<style scoped>
.custom-home {
  --ph-font-kai: "LXGW WenKai Screen R", "Kaiti SC", "STKaiti", "KaiTi", serif;
  --ph-font-mono: ui-monospace, SFMono-Regular, "JetBrains Mono", Consolas, "Liberation Mono",
    Menlo, monospace;
  --ph-accent: #1f883d;
  --ph-soft: rgba(31, 136, 61, 0.08);
  --ph-hairline: rgba(60, 60, 67, 0.16);
  --ph-card-line: rgba(60, 60, 67, 0.09);

  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--vp-c-bg-alt);
  z-index: 10;
  position: relative;
}

[data-theme="dark"] .custom-home {
  --ph-accent: #2da44e;
  --ph-soft: rgba(45, 164, 78, 0.14);
  --ph-hairline: rgba(235, 235, 245, 0.14);
  --ph-card-line: rgba(235, 235, 245, 0.08);
}

.bg-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 74vh;
  z-index: -99;
}

.custom-home-container {
  padding: 20px 16px 0 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.custom-home-content {
  max-width: 784px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-bottom: 56px;
}
</style>
