<template>
  <!-- 如果是自定义 SVG 文件 -->
  <img
    v-if="svgUrl"
    :src="svgUrl"
    :style="{ display: 'block', width: size + 'px' }"
    :alt="alt"
    class="my-icon"
  />
  <!-- 标准 Iconify 图标 -->
  <icon v-else :name="name" :size="size" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    // 图标标识：支持 Iconify 标准名（如 "logos:vue"）或自定义前缀 "custom:文件名"
    name: string;
    size?: string | number;
    alt?: string;
  }>(),
  {
    size: "1em",
    alt: "icon",
  },
);

// 判断是否为自定义图标（前缀 custom:）
const isCustomIcon = computed(() => props.name.startsWith("custom:"));

// 提取自定义图标名称（custom:xxx -> xxx）
const customName = computed(() => props.name.replace(/^custom:/, ""));

// 自定义 SVG 的文件路径（基于 Vite 的静态资源处理）
const svgUrl = computed(() => {
  if (!isCustomIcon.value) return null;
  // 假设 SVG 文件放在 src/assets/icons/ 目录下
  return new URL(`../icons/${customName.value}.svg`, import.meta.url).href;
});
</script>

<style scoped>
.my-icon {
  flex-shrink: 0;
}
</style>
