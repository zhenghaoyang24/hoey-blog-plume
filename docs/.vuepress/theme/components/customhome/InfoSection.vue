<template>
  <div class="info-section">
    <div class="info-slogon">
      <HoeyIcon :color="'var(--vp-c-text-1)'" :size="6" />
      <p>Teacher, I'm on fire to improve!</p>
    </div>
    <div class="info-description">
      <p>
        Welcome to my blog. I'm Hoey — a programmer who codes, creates, and gets curious. Outside of
        work, I play PC games, watch movies, and listen to music. On this blog, I write about web
        development, tools, workflows, and sometimes just the fun stuff. Glad to have you here.
      </p>
    </div>
    <div class="social-link-content">
      <a
        v-for="link in SOCIAL_LINKS"
        :key="link.id"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <icon :name="link.icon" size="1.5em" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import HoeyIcon from "./components/HoeyIcon.vue";

const SOCIAL_LINKS = [
  { id: 1, name: "github", url: "https://github.com/zhenghaoyang24", icon: "mdi:github" },
  { id: 2, name: "email", url: "mailto:zhenghaoyang24@foxmail.com", icon: "ic:round-email" },
];
</script>

<style scoped>
.info-section {
  width: 100%;
  box-sizing: border-box;
}

.info-slogon {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  > p {
    margin: 0;
    font-size: 1em;
    color: var(--vp-c-text-2);
    line-height: 1.5;
  }
}

.info-description {
  margin: 10px 0;
  > p {
    margin: 0;
    font-size: 1.2em;
    color: var(--vp-c-text-1);
    line-height: 1.5;
    @media (max-width: 770px) {
      font-size: 1em;
    }
  }
}
.social-link-content {
  display: flex;
  gap: 4px;
  > a {
    color: var(--vp-c-text-2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    &:hover {
      color: var(--vp-c-text-1);
    }
  }
}
</style>
