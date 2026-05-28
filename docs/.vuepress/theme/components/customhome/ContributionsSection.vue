<template>
  <div class="contributions-section">
    <SectionTemplate title="Contributions" description="Contributions in the past year">
      <ContributionTemplate :data="contributions" :showMonths="true" :show-weekdays="true" />
    </SectionTemplate>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ContributionTemplate from "./components/ContributionTemplate.vue";

import axios from "axios";
import SectionTemplate from "./components/SectionTemplate.vue";

function extractDatesAndCounts(data: any) {
  const result = [];
  for (const week of data.contributions) {
    for (const day of week) {
      result.push({
        date: day.date,
        value: day.count,
      });
    }
  }
  return result;
}
const contributions = ref<{ date: string; value: number }[]>([]);
onMounted(async () => {
  const response = await axios.get(`https://gh-calendar.rschristian.dev/user/zhenghaoyang24`);
  contributions.value = extractDatesAndCounts(response.data);
});
</script>

<style scoped>
.contributions-section {
  width: 100%;
}
</style>
