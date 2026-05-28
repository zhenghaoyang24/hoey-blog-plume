<template>
  <div class="info-section">
    <div class="info-slogon">
      <h2>Hoey</h2>
      <p>Teacher, I'm on fire to improve!</p>
    </div>
    <div class="info-description">
      <p>Welcome to my blog!</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.info-section {
  width: 100%;
  box-sizing: border-box;
}

.info-slogon {
  display: flex;
  flex-direction: column;
  gap: 30px;
  > h2 {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    font-size: 3em;
    color: var(--vp-c-text-1);
  }
  > p {
    margin: 0;
    font-size: 1em;
    color: var(--vp-c-text-2);
    line-height: 1.5;
  }
}

.info-description {
  margin-top: 10px;
  > p {
    margin: 0;
    font-size: 1.2em;
    color: var(--vp-c-text-1);
    line-height: 1.5;
  }
}
</style>
