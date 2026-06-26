<template>
  <div class="section-template-container">
    <h2>{{ props.title }}</h2>
    <p>{{ props.description }}</p>
    <div class="section-template-content">
      <slot>
        This is the default content of the section. Please provide your own content by using the
        slot.
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SectionTemplateProps {
  title: string;
  description: string;
}
const props = defineProps<SectionTemplateProps>();
</script>

<style scoped>
.section-template-container {
  width: 100%;
  margin-top: 10px;
  border-top: 1px solid var(--line-color);
  padding-top: 20px;
  @media (max-width: 770px) {
    margin-top: 8px;
    padding-top: 16px;
  }
  > h2 {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    margin: 14px 0;
    font-size: 2em;
    color: var(--vp-c-text-1);
    @media (max-width: 770px) {
      font-size: 1.5em;
    }
  }
  > p {
    margin-bottom: 20px;
    font-size: 1em;
    color: var(--vp-c-text-2);
    line-height: 1.5;
    @media (max-width: 770px) {
      font-size: 0.9em;
    }
  }
}
</style>
