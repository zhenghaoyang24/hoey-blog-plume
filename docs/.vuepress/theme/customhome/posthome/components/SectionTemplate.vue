<template>
  <section ref="el" class="section-template-container" :class="{ 'is-revealed': visible }">
    <h2 class="section-head">
      <span class="section-index">{{ index }}</span>
      <span class="section-title">{{ title }}</span>
    </h2>
    <p class="section-desc">{{ description }}</p>
    <div class="section-template-content">
      <slot>
        This is the default content of the section. Please provide your own content by using the
        slot.
      </slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from "../composables/useReveal";

interface SectionTemplateProps {
  index: string;
  title: string;
  description: string;
}
defineProps<SectionTemplateProps>();

const { el, visible } = useReveal();
</script>

<style scoped>
.section-template-container {
  width: 100%;
  border-top: 1px solid var(--ph-hairline);
  padding-top: 28px;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  &:not(.is-revealed) {
    opacity: 0;
    transform: translateY(18px);
  }
  @media (max-width: 770px) {
    padding-top: 22px;
  }
}

.section-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin: 0;
}

.section-index {
  font-family: var(--ph-font-kai);
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1;
  color: var(--ph-accent);
}

.section-title {
  margin: 0;
  font-family: var(--ph-font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.section-desc {
  margin: 8px 0 0;
  font-family: var(--ph-font-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.section-template-content {
  margin-top: 18px;
}
</style>
