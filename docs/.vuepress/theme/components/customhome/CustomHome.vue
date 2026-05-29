<template>
  <div class="custom-home-container">
    <div class="custom-home-content">
      <InfoSection />
      <ContributionSection />
      <SkillSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContributionSection from "./ContributionSection.vue";
import InfoSection from "./InfoSection.vue";
import SkillSection from "./SkillSection.vue";
</script>

<style scoped>
.custom-home-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 16px 0 16px;
  background-color: var(--vp-c-bg-alt);
}
.custom-home-content {
  max-width: 784px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
