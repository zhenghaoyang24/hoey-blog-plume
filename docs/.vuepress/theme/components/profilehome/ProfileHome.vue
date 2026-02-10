<template>
  <div class="home-container">
    <Orb :hoverIntensity="0.5" :rotateOnHover="true" :hue="0" :forceHoverState="false" />
    <div class="profile-container">
      <router-link class="avatar-link" to="/blog/">
        <img
          ref="avatarRef"
          src="/avatar.jpg"
          alt="Hoey"
          class="profile-avatar"
          @mousemove="handleAvatarMouseMove"
          @mouseleave="handleAvatarMouseLeave"
        />
      </router-link>
      <div class="profile-name">Hoey</div>
      <div class="profile-slogan">Teacher, I'm on fire to improve!</div>
      <div class="profile-links-box">
        <a href="https://github.com/zhenghaoyang24" target="_blank" class="profile-links">
          <icon class="profile-icon" name="grommet-icons:github" />
        </a>
        <a href="mailto:zhenghaoyang24@foxmail.com" target="_blank" class="profile-links">
          <icon class="profile-icon" name="streamline-flex:mail-send-email-message-circle-solid" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Orb from "../bg/Orb.vue";

// 按压效果

const avatarRef = ref<HTMLImageElement | null>(null);

const handleAvatarMouseMove = (e: MouseEvent) => {
  if (!avatarRef.value) return;

  const rect = avatarRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const offsetX = (e.clientX - centerX) / (rect.width / 2);
  const offsetY = (e.clientY - centerY) / (rect.height / 2);

  const nx = Math.max(-1, Math.min(1, offsetX));
  const ny = Math.max(-1, Math.min(1, offsetY));

  const rotateY = -nx * 10;
  const rotateX = ny * 10;

  avatarRef.value.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleAvatarMouseLeave = () => {
  if (!avatarRef.value) return;
  avatarRef.value.style.transition = "transform 0.2s ease-out";
  avatarRef.value.style.transform = "perspective(500px) rotateX(0) rotateY(0)";
};
</script>

<style scoped>
:root {
  --pofile-card-bg: #f3f3f3;
}

[data-theme="dark"] {
  --pofile-card-bg: #f3f3f377;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 140px);
  margin: 0;
  padding: 0;
  z-index: -999;
  overflow: hidden;
}

.profile-container {
  border-radius: 10px;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 26px;
  background-color: #8f8f8f49;
  backdrop-filter: blur(10px);
}

.avatar-link {
  pointer-events: none;
  display: contents;
}

.profile-avatar {
  width: 20em;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  box-shadow: 0 0 10px #00000077;
  pointer-events: auto;
  transition: transform 0.2s ease-out;

  @media screen and (max-width: 770px) {
    width: 200px;
  }
}

.profile-name {
  font-weight: bold;
  padding: 16px 0;
  font-size: 24px;
}

.profile-links-box {
  margin: 12px 0;
  display: flex;
}

.profile-links {
  font-size: 30px;
}
</style>
