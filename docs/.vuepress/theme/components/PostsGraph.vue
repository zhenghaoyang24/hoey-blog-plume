<template>
  <div class="graph-container">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup lang="ts">
import { usePostsData } from "vuepress-theme-plume/composables";
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { useRouter } from "vuepress/client";
import { animateLabelValue } from "echarts/types/src/label/labelStyle.js";
const route = useRouter();

// 图表实例
const chartRef = ref(null);
let chartInstance: echarts.ECharts | null = null;

// 图谱配置值
const grapOptions = {
  nodeSize: {
    small: 14,
    large: 20,
  },
};

interface Category {
  name: string;
  itemStyle: { color: string };
}
interface Node {
  id: string;
  name: string;
  category: number;
  symbolSize: number;
  path: string;
}
interface Edge {
  source: string;
  target: string;
}
interface GraphData {
  categories: Category[];
  nodes: Node[];
  edges: Edge[];
}

// 处理图谱数据
const graphData: GraphData = {
  categories: [
    { name: "标签", itemStyle: { color: "#42b883" } },
    { name: "笔记", itemStyle: { color: "#858585" } },
  ],
  nodes: [],
  edges: [],
};
const postsData = usePostsData();
const initGraphData = () => {
  const posts = postsData.value["/blog/"];
  const tagNodes: Node[] = [];
  for (const post of posts) {
    // 文章节点
    const postNode: Node = {
      id: "post_" + graphData.nodes.length,
      name: post.title,
      category: 1,
      symbolSize: grapOptions.nodeSize.small,
      path: post.path,
    };
    graphData.nodes.push(postNode);

    // tag节点
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
};

// ---- 构建 ECharts 配置 ----
const getOption = () => ({
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
      force: {
        edgeLength: 80, // 连线长度（越小边越短，节点越紧凑）
        repulsion: 100, // 节点间排斥力（越大节点越分散）
        gravity: 0.1, // 中心引力（越大节点越向中心聚集）
        friction: 0.3, // 运动摩擦阻力（越大停止越快，越稳定）
      },
      label: {
        show: true,
        position: "bottom",
        formatter: "{b}",
        color: "#aaa",
        fontSize: 10,
        opacity: 1,
      },
      edgeSymbol: ["none", "none"],
      lineStyle: {
        color: "#aaa",
        opacity: 0.6,
        width: 1.5,
        curveness: 0, // 直线
      },
      emphasis: {
        focus: "adjacency",
      },
      scaleLimit: { max: 8, min: 0.3 },
    },
  ],
});

// ---- 生命周期钩子 ----
onMounted(() => {
  // 初始化数据
  initGraphData();

  // 初始化图表
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(getOption());

  chartInstance.on("click", (params) => {
    if (params.dataType === "node") {
      const node = params.data as Node;
      if (node.category === 1 && node.path) {
        // router 跳转
        route.push(node.path);
      }
    }
  });

  // 窗口自适应
  const handleResize = () => chartInstance?.resize();
  window.addEventListener("resize", handleResize);

  // 保存清理函数
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    chartInstance?.dispose();
    chartInstance = null;
  });
});
</script>

<style scoped>
.graph-container {
  width: 100%;
  height: calc(100dvh - 140px);
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
