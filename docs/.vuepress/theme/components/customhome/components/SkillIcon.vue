<template>
  <!-- 自定义 SVG 组件（动态加载） -->
  <component
    v-if="isCustomIcon && customComponent"
    :is="customComponent"
    :size="size"
    class="my-icon"
    :style="{ height: size + 'px' }"
  />
  <!-- 标准 Iconify 图标 -->
  <icon
    v-else-if="!isCustomIcon"
    :name="name"
    :size="size"
    class="my-icon"
    :style="{ height: size + 'px' }"
  />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, shallowRef } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string | number;
    alt?: string;
  }>(),
  {
    size: "1em",
    alt: "icon",
  },
);

const isCustomIcon = computed(() => props.name.startsWith("custom:"));
const customName = computed(() => props.name.replace(/^custom:/, ""));

const customComponent = shallowRef<any>(null);

watchEffect(async (onCleanup) => {
  if (!isCustomIcon.value) {
    customComponent.value = null;
    return;
  }

  let active = true;
  onCleanup(() => {
    active = false;
  });

  try {
    // 直接使用原始名称，不转换大小写或格式
    const module = await import(`../icons/${customName.value}.vue`);
    if (active) {
      customComponent.value = module.default;
    }
  } catch (error) {
    console.error(`Failed to load custom icon: ${customName.value}`, error);
    if (active) {
      customComponent.value = null;
    }
  }
});
</script>

<style scoped>
.my-icon {
  flex-shrink: 0;
}
</style>
