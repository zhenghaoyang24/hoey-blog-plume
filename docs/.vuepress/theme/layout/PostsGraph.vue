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

// 获取 CSS 变量值
const getCSSVar = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || "";
};

// 处理图谱数据
const graphData: GraphData = {
  categories: [],
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
const getOption = () => {
  const textColor = getCSSVar("--graph-text-1") || "#8f8f8f";
  const tagColor = getCSSVar("--vp-c-brand-1") || "#42b883";
  const postColor = getCSSVar("--graph-text-1") || "#8f8f8f";
  const hoverColor = getCSSVar("--vp-c-brand-2") || "#39d38e";

  // 同步更新 categories 颜色
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
          color: textColor,
          fontSize: 10,
          opacity: 0.8,
          silent: true,
        },
        edgeSymbol: ["none", "none"],
        lineStyle: {
          color: textColor,
          width: 1,
          opacity: 0.8,
          curveness: 0, // 直线
        },
        emphasis: {
          focus: "adjacency",
        },
        scaleLimit: { max: 8, min: 0.3 },
      },
    ],
  };
};

// ---- 生命周期钩子 ----
onMounted(() => {
  const route = useRouter();
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

  // ---- 拖动时持续高亮被拖动节点 ----
  let isDragging = false;
  let draggedNodeIndex: number | null = null;

  // 监听节点拖动开始
  chartInstance.on("mousedown", (params) => {
    if (params.dataType === "node") {
      isDragging = true;
      draggedNodeIndex = params.dataIndex;
    }
  });

  // 拖动过程中持续补高亮（解决鼠标超出节点或其他节点覆盖的问题）
  const handleMouseMove = () => {
    if (isDragging && draggedNodeIndex !== null) {
      chartInstance!.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: draggedNodeIndex,
      });
    }
  };
  document.addEventListener("mousemove", handleMouseMove);

  // 鼠标释放结束拖动，立即取消高亮
  const handleMouseUp = () => {
    if (isDragging) {
      isDragging = false;
      draggedNodeIndex = null;
      // 立即取消高亮（包括文本显示）
      chartInstance!.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });
    }
  };
  document.addEventListener("mouseup", handleMouseUp);

  // 窗口自适应
  const handleResize = () => chartInstance?.resize();
  window.addEventListener("resize", handleResize);

  // 监听主题切换，重新渲染图表
  const themeObserver = new MutationObserver(() => {
    chartInstance?.setOption(getOption());
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // 保存清理函数
  onBeforeUnmount(() => {
    themeObserver.disconnect();
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
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
