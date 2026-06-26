// 节点类型
interface Category {
  name: string;
  itemStyle: { color: string };
}

// 节点
interface Node {
  id: string;
  name: string;
  category: number;
  symbolSize: number;
  path: string;
}

// 边
interface Edge {
  source: string;
  target: string;
  lineStyle?: {
    color?: string;
    width?: number;
    type?: string;
    curveness?: number;
    opacity?: number;
  };
}

// 图数据
interface GraphData {
  categories: Category[];
  nodes: Node[];
  edges: Edge[];
}

export type { Category, Node, Edge, GraphData };
