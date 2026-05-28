<template>
  <div class="github-contribution-wrapper">
    <div ref="chartContainer" class="github-contribution-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { HeatmapChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import axios from "axios";

echarts.use([
  TitleComponent,
  CalendarComponent,
  TooltipComponent,
  VisualMapComponent,
  HeatmapChart,
  CanvasRenderer,
]);

const props = defineProps<{
  username: string;
}>();

const chartContainer = ref<HTMLElement>();
let chartInstance: echarts.ECharts | null = null;

// ---------- 缓存逻辑（24小时）----------
const CACHE_EXPIRY = 86400;
const getCacheKey = () => `github_contributions_${props.username}`;

interface CacheItem {
  value: {
    total: number;
    contributions: [string, number][];
  };
  expiry: number;
}

const setCachedData = (data: { total: number; contributions: [string, number][] }) => {
  const item: CacheItem = {
    value: data,
    expiry: Date.now() + CACHE_EXPIRY * 1000,
  };
  localStorage.setItem(getCacheKey(), JSON.stringify(item));
};

const getCachedData = (): { total: number; contributions: [string, number][] } | null => {
  const cached = localStorage.getItem(getCacheKey());
  if (!cached) return null;
  const item: CacheItem = JSON.parse(cached);
  if (Date.now() > item.expiry) {
    localStorage.removeItem(getCacheKey());
    return null;
  }
  return item.value;
};

// 将原始 API 数据转换为热力图格式，并提取 total
const formatContributions = (
  rawData: any,
): { total: number; contributions: [string, number][] } => {
  const weeks = rawData?.contributions;
  if (!weeks || !Array.isArray(weeks) || weeks.length === 0) {
    throw new Error("无效的贡献数据");
  }

  const contributions: [string, number][] = [];
  for (const week of weeks) {
    if (!Array.isArray(week)) continue;
    for (const day of week) {
      if (day?.date) {
        const count = typeof day.count === "number" ? day.count : parseInt(day.count, 10);
        contributions.push([day.date, isNaN(count) ? 0 : count]);
      }
    }
  }

  // 按日期排序
  contributions.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

  return {
    total: rawData.total ?? 0,
    contributions,
  };
};

// 获取数据（优先缓存，否则请求并格式化后缓存）
const fetchData = async (): Promise<{
  total: number;
  contributions: [string, number][];
}> => {
  const cached = getCachedData();
  if (cached) {
    return cached;
  }
  const response = await axios.get(`https://gh-calendar.rschristian.dev/user/${props.username}`);
  const formatted = formatContributions(response.data);
  setCachedData(formatted);
  return formatted;
};

// 从格式化数据中提取图表所需字段
const getChartData = (formatted: { total: number; contributions: [string, number][] }) => {
  const { contributions } = formatted;
  if (contributions.length === 0) {
    throw new Error("没有有效的日期数据");
  }

  const dates = contributions.map((item) => item[0]);
  const startDate = dates.reduce((a, b) => (a < b ? a : b));
  const endDate = dates.reduce((a, b) => (a > b ? a : b));
  const maxCount = Math.max(...contributions.map((item) => item[1]), 0);

  return { data: contributions, startDate, endDate, maxCount };
};

// 新增工具函数：根据容器宽度计算正方形边长
const calculateSquareSize = (containerWidth: number): number => {
  // 基础公式：宽度 / 50，并限制在 10~25px 之间
  let size = Math.floor(containerWidth / 50);
  size = Math.min(25, Math.max(10, size));
  return size;
};

// 新增函数：更新日历的格子尺寸（不重新获取数据）
const updateCellSize = () => {
  if (!chartInstance || !chartContainer.value) return;
  const containerWidth = chartContainer.value.clientWidth;
  if (containerWidth === 0) return;
  const squareSize = calculateSquareSize(containerWidth);
  chartInstance.setOption(
    {
      calendar: {
        cellSize: [squareSize, squareSize], // 宽高相等，强制正方形
      },
    },
    false,
  ); // false 表示合并配置，不重建图表
};

// ---------- 渲染图表 ----------
const renderChart = async () => {
  if (!chartContainer.value) return;

  try {
    const formatted = await fetchData();
    console.log(formatted);
    const { data, startDate, endDate, maxCount } = getChartData(formatted);

    await nextTick();

    // 获取容器宽度并计算正方形边长
    const containerWidth = chartContainer.value.clientWidth;
    const squareSize = calculateSquareSize(containerWidth);

    const option = {
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const date = params.data[0];
          const count = params.data[1];
          return `${date}<br/>Contributions: ${count} 次`;
        },
      },
      visualMap: {
        show: false,
        min: 0,
        max: maxCount,
        type: "piecewise",
        orient: "horizontal",
        left: "center",
        top: 100,
        pieces: [
          { min: 0, max: 0, label: "0", color: "#8cccd5" },
          { min: 1, max: 3, label: "1-3", color: "#9be9a8" },
          { min: 4, max: 6, label: "4-6", color: "#40c463" },
          { min: 7, max: 9, label: "7-9", color: "#30a14e" },
          { min: 10, label: "10+", color: "#216e39" },
        ],
      },
      calendar: {
        top: 0,
        left: 0,
        right: 0,
        cellSize: [squareSize, squareSize],
        range: [startDate, endDate],
        itemStyle: {
          borderWidth: 5,
          color: "transparent",
          borderColor: "transparent",
        },
        yearLabel: { show: true, margin: 30 },
        dayLabel: { firstDay: 1, margin: 10 },
        monthLabel: { margin: 15 },
      },
      series: {
        type: "heatmap",
        coordinateSystem: "calendar",
        calendarIndex: 0,
        data: data,
      },
    };

    if (!chartInstance) {
      chartInstance = echarts.init(chartContainer.value);
    }
    chartInstance.setOption(option, true);
    chartInstance.resize();
  } catch (error) {
    if (chartContainer.value) {
      chartContainer.value.innerHTML =
        '<div style="text-align:center;color:#999;padding:20px;">数据加载失败，请检查网络或稍后重试。</div>';
    }
  }
};

const handleResize = () => {
  chartInstance?.resize();
  updateCellSize();
};

onMounted(() => {
  renderChart();
  updateCellSize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  chartInstance?.dispose();
  chartInstance = null;
});
</script>

<style scoped>
.github-contribution-wrapper {
  overflow-x: auto;
}

.github-contribution-chart {
  width: 100%;
  min-width: 630px;
  z-index: 1;
  height: 100px;
  max-height: 120px;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
