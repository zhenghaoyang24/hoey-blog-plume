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
const CACHE_KEY = "gh_contributions_cache";
const CACHE_DURATION = 8 * 60 * 60 * 1000; // 8小时
onMounted(async () => {
  // 尝试从缓存读取
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        contributions.value = data; // 缓存未过期，直接使用
        return;
      }
    } catch {}
  }

  // 无缓存或已过期，重新请求
  const response = await axios.get(`https://gh-calendar.rschristian.dev/user/zhenghaoyang24`);
  const freshData = extractDatesAndCounts(response.data);
  contributions.value = freshData;

  // 存入缓存
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      data: freshData,
      timestamp: Date.now(),
    }),
  );
});
</script>

<style scoped>
.contributions-section {
  width: 100%;
}
</style>
