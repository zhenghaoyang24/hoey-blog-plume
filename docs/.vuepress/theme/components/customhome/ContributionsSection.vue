<template>
  <div class="contributions-section">
    <h3>Contributions</h3>
    <p>Contributions in the past year</p>
    <div>
      <GitHubContribution username="zhenghaoyang24" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GitHubContribution from "./GitHubContribution.vue";
</script>

<style scoped>
.contributions-section {
  width: 100%;
}
</style>
