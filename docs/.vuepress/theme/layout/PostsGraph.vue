<template>
  <div class="graph-container">
    <GraphPageBg
      :particle-colors="['#686868', '#929292']"
      :particle-count="200"
      :particle-spread="10"
      :speed="0.1"
      :particle-base-size="90"
      :move-particles-on-hover="false"
      :alpha-particles="true"
      :disable-rotation="false"
      :className="'bg-container'"
    />
    <div ref="chartRef" class="chart-container"></div>
    <div class="control-container">
      <div class="button-item button-hover" title="Reset view" @click="onResetView">
        <icon name="tabler:crosshair" size="26" />
      </div>
      <div class="zoom-container">
        <label for="zoom" class="zoom-label">{{ zoomRef }}</label>
        <input
          type="range"
          class="zoom-slider"
          :min="grapOptions.scaleRange.min"
          :max="grapOptions.scaleRange.max"
          :step="0.01"
          name="zoom"
          title="Scale graph"
          v-model="zoomRef"
          @input="onSliderInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsData } from "vuepress-theme-plume/composables";
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { useRouter } from "vuepress/client";
import { postLinks } from "@internal/postLinks";
import type { Node, GraphData } from "../types/graph";
import GraphPageBg from "../bg/GraphPageBg.vue";

/**
 * CSS 变量 & 图谱配置
 */
const getCSSVar = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || "";
};

const lineColor = getCSSVar("--graph-text-1") || "#8f8f8f";
const tagColor = getCSSVar("--vp-c-brand-1") || "#42b883";
const postColor = getCSSVar("--graph-text-1") || "#8f8f8f";

const grapOptions = {
  nodeSize: { small: 8, large: 12 }, // 节点
  lineStyle: { color: lineColor, curveness: 0, width: 1, opacity: 0.4 }, // 线条
  labelStyle: { color: lineColor, position: "bottom", fontSize: 10 }, // 文字
  force: { edgeLength: 40, repulsion: 60, gravity: 0.2, friction: 0.4 }, // 节点力
  scaleRange: {
    min: 0.3,
    max: 3,
  },
  opacityScaleRange: {
    transparent: 1, // 透明
    opaque: 1.3, // 完全不透明
  },
};

/**
 * 图谱数据处理
 */
const graphData: GraphData = { categories: [], nodes: [], edges: [] };
const postsData = usePostsData();

const initGraphData = () => {
  const posts = postsData.value["/blog/"];
  const tagNodes: Node[] = [];
  for (const post of posts) {
    const postNode: Node = {
      id: "post_" + graphData.nodes.length,
      name: post.title,
      category: 1,
      symbolSize: grapOptions.nodeSize.small,
      path: post.path,
    };
    graphData.nodes.push(postNode);

    if (post.tags) {
      for (const tag of post.tags) {
        let tagNode = tagNodes.find((item) => item.name === tag);
        if (!tagNode) {
          tagNode = {
            id: "tag_" + tagNodes.length,
            name: tag,
            category: 0,
            symbolSize: grapOptions.nodeSize.large,
            path: post.path,
          };
          tagNodes.push(tagNode);
          graphData.nodes.push(tagNode);
        }
        graphData.edges.push({ source: postNode.id, target: tagNode.id });
      }
    }
  }

  // 文章→文章 内链连线
  if (postLinks) {
    const postNodeMap = new Map<string, string>();
    for (const node of graphData.nodes) {
      if (node.category === 1) postNodeMap.set(node.path, node.id);
    }
    for (const [sourcePath, targetPaths] of Object.entries(postLinks)) {
      const sourceId = postNodeMap.get(sourcePath);
      if (!sourceId) continue;
      for (const targetPath of targetPaths as string[]) {
        const targetId = postNodeMap.get(targetPath);
        if (!targetId || sourceId === targetId) continue;
        const exists = graphData.edges.some((e) => e.source === sourceId && e.target === targetId);
        if (!exists) {
          graphData.edges.push({
            source: sourceId,
            target: targetId,
            lineStyle: {
              color: grapOptions.lineStyle.color,
              width: grapOptions.lineStyle.width,
              type: "dashed",
              opacity: grapOptions.lineStyle.opacity,
              curveness: grapOptions.lineStyle.curveness,
            },
          });
        }
      }
    }
  }
};

/**
 * 图表实例 & 缩放
 */

const chartRef = ref(null);
let chartInstance: echarts.ECharts | null = null;
const zoomRef = ref(1);

const calcLabelOpacity = (zoom: number) => {
  const { transparent, opaque } = grapOptions.opacityScaleRange;
  if (zoom >= opaque) return 1;
  if (zoom <= transparent) return 0;
  return Math.round(((zoom - transparent) / (opaque - transparent)) * 100) / 100;
};

const updateLabelOpacity = (zoom: number) => {
  chartInstance?.setOption({ series: [{ label: { opacity: calcLabelOpacity(zoom) } }] });
};

const getOption = () => {
  graphData.categories = [
    { name: "标签", itemStyle: { color: tagColor } },
    { name: "笔记", itemStyle: { color: postColor } },
  ];
  return {
    series: [
      {
        type: "graph",
        cursor: "pointer",
        edgeLabel: { show: false },
        layout: "force",
        animation: true,
        roam: true,
        draggable: true,
        categories: graphData.categories,
        data: graphData.nodes,
        edges: graphData.edges,
        force: grapOptions.force,
        label: {
          show: true,
          position: grapOptions.labelStyle.position,
          formatter: "{b}",
          color: grapOptions.labelStyle.color,
          fontSize: grapOptions.labelStyle.fontSize,
          opacity: calcLabelOpacity(zoomRef.value),
          silent: true,
        },
        edgeSymbol: ["none", "none"],
        lineStyle: grapOptions.lineStyle,
        emphasis: { focus: "adjacency" },
        zoom: zoomRef.value,
        scaleLimit: grapOptions.scaleRange,
      },
    ],
  };
};

/**
 * 事件处理
 */
const route = useRouter();

// 缩放：鼠标滚轮
const onMouseWheel = (e: any) => {
  const delta = (e.wheelDelta || (e.event?.deltaY < 0 ? 1 : -1)) > 0 ? 1.1 : 0.9;
  const { min, max } = grapOptions.scaleRange;
  const zoom = Math.max(min, Math.min(max, zoomRef.value * delta));
  zoomRef.value = Math.round(zoom * 100) / 100;
  chartInstance?.setOption({ series: [{ zoom: zoomRef.value }] });
  updateLabelOpacity(zoomRef.value);
};

// 缩放：拖动条
const onSliderInput = () => {
  if (!chartInstance) return;
  chartInstance.setOption({ series: [{ zoom: zoomRef.value }] });
  updateLabelOpacity(zoomRef.value);
};

// 点击文章节点跳转
const onClick = (params: any) => {
  if (params.dataType === "node") {
    const node = params.data as Node;
    if (node.category === 1 && node.path) {
      route.push(node.path);
    }
  }
};

// 拖动节点时持续高亮
let isDragging = false;
let draggedNodeIndex: number | null = null;

const onMouseDown = (params: any) => {
  if (params.dataType === "node") {
    isDragging = true;
    draggedNodeIndex = params.dataIndex;
  }
};

const onMouseMove = () => {
  if (isDragging && draggedNodeIndex !== null) {
    chartInstance!.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: draggedNodeIndex,
    });
  }
};

const onMouseUp = () => {
  if (isDragging) {
    isDragging = false;
    draggedNodeIndex = null;
    chartInstance!.dispatchAction({ type: "downplay", seriesIndex: 0 });
  }
};

// 重置视图：居中 + 缩放为 1
const onResetView = () => {
  if (!chartInstance) return;
  chartInstance.dispatchAction({ type: "restore" });
  zoomRef.value = 1;
};

// 窗口自适应
const onResize = () => chartInstance?.resize();

// 主题切换
const themeObserver = new MutationObserver(() => {
  chartInstance?.setOption(getOption());
});

/**
 * 监听与移除
 */
onMounted(() => {
  initGraphData();

  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(getOption());

  chartInstance.getZr().on("mousewheel", onMouseWheel);
  chartInstance.on("click", onClick);
  chartInstance.on("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  window.addEventListener("resize", onResize);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
});

onBeforeUnmount(() => {
  themeObserver.disconnect();
  window.removeEventListener("resize", onResize);
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  chartInstance?.getZr().off("mousewheel", onMouseWheel);
  chartInstance?.dispose();
  chartInstance = null;
});
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: calc(100dvh - 140px);
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
  background-color: var(--vp-c-bg-alt);
}

.bg-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}

.chart-container {
  width: 100%;
  height: 100%;
}

.control-container {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
  z-index: 9999;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.button-item {
  user-select: none;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.button-hover:hover {
  background-color: var(--vp-nav-screen-bg-color);
}

.zoom-container {
  display: flex;
  align-items: center;
  gap: 6px;
}

.zoom-label {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.zoom-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-brand-1);
  outline: none;
  cursor: pointer;
}

.zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  cursor: pointer;
  border: 2px solid var(--vp-c-bg);
}

.zoom-slider::-moz-range-thumb {
  width: 14px;
  background: var(--vp-c-brand-1);
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--vp-c-bg);
}
</style>
