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

<script setup lang="ts">
import BackgroundEffect from "./components/BackgroundEffect.vue";
import PostSection from "./PostSection.vue";
import ContributionSection from "./ContributionSection.vue";
import InfoSection from "./InfoSection.vue";
import SkillSection from "./SkillSection.vue";
</script>

<style scoped>
.custom-home {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--vp-c-bg-alt);
  z-index: 10;
  position: relative;
}

.bg-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60vh;
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
  gap: 20px;
}
</style>
