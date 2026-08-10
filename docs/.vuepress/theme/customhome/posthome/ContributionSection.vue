<template>
  <div class="contributions-section">
    <SectionTemplate index="迹" title="The Record" description="contributions in the past year">
      <ContributionTemplate :data="contributions" :showMonths="true" :show-weekdays="true" />
    </SectionTemplate>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
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

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const stats = computed(() => {
  const data = contributions.value;
  if (!data.length) return null;
  let total = 0;
  let best = 0;
  let activeDays = 0;
  let lastDate = "";
  const map = new Map<string, number>();
  for (const item of data) {
    if (!item?.date) continue;
    const value = item.value ?? 0;
    map.set(item.date, value);
    total += value;
    if (value > 0) activeDays++;
    if (value > best) best = value;
    if (item.date > lastDate) lastDate = item.date;
  }

  let streak = 0;
  const cursor = new Date(lastDate + "T00:00:00");
  for (;;) {
    const value = map.get(toDateKey(cursor));
    if (value === undefined || value <= 0) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return { total, best, activeDays, streak };
});
</script>

<style scoped>
.contributions-section {
  width: 100%;
}

.contrib-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 22px;
  margin-top: 14px;
  font-family: var(--ph-font-mono);
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  > .stat > b {
    margin-right: 6px;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--ph-accent);
  }
}
</style>
