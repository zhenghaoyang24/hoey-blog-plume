<template>
  <div class="custom-home-container">
    <div class="custom-home-content">
      <InfoSection />
      <ContributionSection />
      <SkillSection />
      <!-- <PostSection /> -->
      <div class="posts-head">
        <h2>Posts</h2>
        <p>My latest posts</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SectionTemplate from "./components/SectionTemplate.vue";
import ContributionSection from "./ContributionSection.vue";
import InfoSection from "./InfoSection.vue";
import PostSection from "./PostSection.vue";
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

.posts-head {
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
