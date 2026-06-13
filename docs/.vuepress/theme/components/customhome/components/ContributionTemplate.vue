<template>
  <div class="contribution-heatmap" ref="containerRef">
    <div class="scrollable-area" ref="scrollableRef">
      <!-- 月份行 -->
      <div v-if="showMonths" class="month-row">
        <div v-if="showWeekdays" class="month-weekday-spacer"></div>
        <div class="months-grid" :style="monthGridStyle">
          <span v-for="(slot, idx) in monthSlots" :key="'m' + idx" class="month-cell">
            {{ monthSlots[0] && monthSlots[1] ? (idx === 0 ? "" : slot.text) : slot.text }}
          </span>
        </div>
      </div>

      <!-- 主网格（星期标签 + 数据格子在同一容器内） -->
      <div class="grid-container" ref="gridRef" :style="mainGridStyle">
        <!-- 星期标签（通过伪元素显示文字，不撑高行） -->
        <template v-if="showWeekdays">
          <div
            v-for="(label, idx) in weekdayItems"
            :key="'wd' + idx"
            class="weekday-cell"
            :class="{ 'is-visible': label.visible }"
            :style="{ gridRow: idx + 1, gridColumn: 1 }"
            :data-text="label.text"
          ></div>
        </template>

        <!-- 数据格子 -->
        <div
          v-for="(cell, index) in flatGrid"
          :key="index"
          class="cell"
          :class="{
            'cell--empty': cell.isEmpty,
          }"
          :style="getCellStyle(cell)"
          @mouseenter="onCellEnter($event, cell)"
          @mouseleave="onCellLeave"
          @focus="onCellEnter($event, cell)"
          @blur="onCellLeave"
          tabindex="0"
          :aria-label="getAriaLabel(cell)"
          role="img"
        >
          <span class="cell-visual"></span>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <Teleport to="body">
      <div
        v-if="tooltip.visible"
        class="heatmap-tooltip heatmap-tooltip--visible"
        :style="tooltip.style"
        ref="tooltipRef"
      >
        <div class="heatmap-tooltip__date">{{ tooltip.dateText }}</div>
        <div class="heatmap-tooltip__count">{{ tooltip.countText }}</div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted, nextTick } from "vue";

// ==================== 类型 ====================
interface DataItem {
  date: string;
  value: number;
}

interface CellData {
  dateObj: Date;
  dateStr: string;
  count: number;
  isFuture: boolean;
  isEmpty: boolean;
  isToday: boolean;
  row: number;
  col: number;
  dayOfWeek: number;
  render: boolean;
}

interface TooltipState {
  visible: boolean;
  dateText: string;
  countText: string;
  style: Record<string, string>;
}

// ==================== Props（仅三个） ====================
const props = defineProps({
  showMonths: { type: Boolean, default: true },
  showWeekdays: { type: Boolean, default: true },
  data: { type: Array as () => DataItem[], required: true },
});

// ==================== 内部常量 ====================
const EMPTY_COLOR = "var(--heatmap-level-0)";
const COLOR_LEVELS = [
  "var(--heatmap-level-0)",
  "var(--heatmap-level-1)",
  "var(--heatmap-level-2)",
  "var(--heatmap-level-3)",
  "var(--heatmap-level-4)",
];
const THRESHOLDS = [0, 4, 9, 19];
// 格子宽度与间距
const MIN_CELL_WIDTH = 8;
const MAX_CELL_WIDTH = 14;
const CELL_GAP = 6;
// 格子行列
const TOTAL_COLS = 53;
const TOTAL_ROWS = 7;
const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// ==================== Refs ====================
const containerRef = ref<HTMLElement | null>(null);
const scrollableRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);

const tooltip = reactive<TooltipState>({
  visible: false,
  dateText: "",
  countText: "",
  style: {},
});

// ==================== 日期工具 ====================
function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDateCN(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function formatCountText(count: number, isEmpty: boolean): string {
  if (isEmpty) return "No data";
  return `${count} contributions`;
}

// ==================== 基于数据最后一条记录的锚点日期 ====================
// 找到数据中最大的日期作为网格锚点（最后一列对应的周）
const lastDataDate = computed(() => {
  if (!hasData.value) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }
  let max: Date | null = null;
  for (const item of props.data) {
    if (!item?.date) continue;
    const d = new Date(item.date + "T00:00:00");
    if (!isNaN(d.getTime()) && (!max || d > max)) max = d;
  }
  return (
    max ||
    (() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    })()
  );
});

const lastDataDayOfWeek = computed(() => lastDataDate.value.getDay());

// 最后一列对应的周日
const lastColumnSunday = computed(() => {
  const d = new Date(lastDataDate.value);
  d.setDate(lastDataDate.value.getDate() - lastDataDayOfWeek.value);
  return d;
});

// ==================== 数据映射 ====================
const dataMap = computed<Map<string, number>>(() => {
  const map = new Map<string, number>();
  for (const item of props.data) {
    if (item?.date) map.set(item.date, item.value ?? (item as any).count ?? 0);
  }
  return map;
});

const hasData = computed(() => props.data.length > 0);

// ==================== 构建网格 ====================
const grid = computed<CellData[][]>(() => {
  const result: CellData[][] = [];

  for (let col = 0; col < TOTAL_COLS; col++) {
    const week: CellData[] = [];
    const colSunday = new Date(lastColumnSunday.value);
    colSunday.setDate(lastColumnSunday.value.getDate() - (TOTAL_COLS - 1 - col) * 7);

    for (let row = 0; row < TOTAL_ROWS; row++) {
      const cellDate = new Date(colSunday);
      cellDate.setDate(colSunday.getDate() + row);
      const dateStr = toDateStr(cellDate);
      const count = dataMap.value.get(dateStr) ?? 0;
      const isEmpty = !dataMap.value.has(dateStr);

      week.push({
        dateObj: cellDate,
        dateStr,
        count,
        render: true,
        isFuture: false,
        isEmpty,
        isToday: false,
        row,
        col,
        dayOfWeek: cellDate.getDay(),
      });
    }
    result.push(week);
  }
  return result;
});

const flatGrid = computed<CellData[]>(() => {
  const result: CellData[] = [];
  for (let col = 0; col < TOTAL_COLS; col++) {
    for (let row = 0; row < TOTAL_ROWS; row++) {
      result.push(grid.value[col][row]);
    }
  }
  return result;
});

// ==================== 月份标签 ====================
interface MonthSlot {
  text: string;
  col: number;
}

const monthSlots = computed<MonthSlot[]>(() => {
  const slots: MonthSlot[] = Array.from({ length: TOTAL_COLS }, () => ({
    text: "",
    col: -1,
  }));
  let lastMonth = -1;
  for (let col = 0; col < TOTAL_COLS; col++) {
    const week = grid.value[col];
    let month = week[0].dateObj.getMonth();
    for (let row = 0; row < TOTAL_ROWS; row++) {
      if (week[row].dateObj.getDate() === 1) {
        month = week[row].dateObj.getMonth();
        break;
      }
    }
    if (month !== lastMonth) {
      slots[col] = { text: MONTH_NAMES[month], col };
      lastMonth = month;
    }
  }

  // 收集所有有标签的列索引
  const labeledIndices: number[] = [];
  for (let i = 0; i < slots.length; i++) {
    if (slots[i].text) labeledIndices.push(i);
  }

  if (labeledIndices.length >= 2) {
    // Fix 2: 前两列相邻显示月份时，去掉第一列（月底月份）
    if (labeledIndices[1] - labeledIndices[0] === 1) {
      slots[labeledIndices[0]] = { text: "", col: -1 };
    }
    // Fix 2: 后两列相邻显示月份时，去掉最后一列（下个月的月初）
    const len = labeledIndices.length;
    if (labeledIndices[len - 1] - labeledIndices[len - 2] === 1) {
      slots[labeledIndices[len - 1]] = { text: "", col: -1 };
    }

    // Fix 1: 首尾月份名相同时（跨年导致），去掉首部重复的旧年份月份
    const firstIdx = labeledIndices[0];
    const lastIdx = labeledIndices[len - 1];
    if (
      firstIdx < lastIdx &&
      slots[firstIdx].text &&
      slots[firstIdx].text === slots[lastIdx].text
    ) {
      slots[firstIdx] = { text: "", col: -1 };
    }
  }

  return slots;
});

// ==================== 星期标签 ====================
const weekdayItems = computed(() => {
  const visibleRows = [0, 2, 4, 6]; // Sun, Tue, Thu, Sat
  return Array.from({ length: TOTAL_ROWS }, (_, i) => ({
    text: WEEKDAY_NAMES[i],
    visible: visibleRows.includes(i),
  }));
});

// ==================== 样式绑定 ====================
const gridColumnsDef = `repeat(${TOTAL_COLS}, minmax(${MIN_CELL_WIDTH}px, ${MAX_CELL_WIDTH}px))`;

const mainGridStyle = computed(() => ({
  gridTemplateColumns: props.showWeekdays ? `17px ${gridColumnsDef}` : gridColumnsDef,
  gap: `${CELL_GAP}px`,
}));

const monthGridStyle = computed(() => ({
  gridTemplateColumns: gridColumnsDef,
  gap: `${CELL_GAP}px`,
}));

function getColorForCount(count: number, isEmpty: boolean): string {
  if (isEmpty) return EMPTY_COLOR;
  if (count <= 0) return COLOR_LEVELS[0];
  for (let i = THRESHOLDS.length - 1; i >= 0; i--) {
    if (count > THRESHOLDS[i]) return COLOR_LEVELS[i + 1] ?? COLOR_LEVELS[COLOR_LEVELS.length - 1];
  }
  return COLOR_LEVELS[0];
}

function getCellStyle(cell: CellData): Record<string, string> {
  const bgColor = getColorForCount(cell.count, cell.isEmpty);
  const colOffset = props.showWeekdays ? 2 : 1;
  return {
    gridRow: String(cell.row + 1),
    gridColumn: String(cell.col + colOffset),
    "--cell-bg": bgColor,
  };
}

// ==================== Tooltip ====================
function onCellEnter(event: MouseEvent | FocusEvent, cell: CellData): void {
  tooltip.dateText = formatDateCN(cell.dateObj);
  tooltip.countText = formatCountText(cell.count, cell.isEmpty);
  tooltip.visible = true;

  nextTick(() => {
    updateTooltipPosition(event);
  });
}

function onCellLeave(): void {
  tooltip.visible = false;
}

function updateTooltipPosition(event: MouseEvent | FocusEvent): void {
  const tooltipEl = tooltipRef.value;
  if (!tooltipEl) return;
  const target = event.currentTarget as HTMLElement;
  if (!target) return;

  const targetRect = target.getBoundingClientRect();
  const tooltipRect = tooltipEl.getBoundingClientRect();

  let left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
  let top = targetRect.top - tooltipRect.height - 8;

  if (top < 8) top = targetRect.bottom + 8;
  if (left < 8) left = 8;
  else if (left + tooltipRect.width > window.innerWidth - 8)
    left = window.innerWidth - tooltipRect.width - 8;

  tooltip.style = {
    position: "fixed",
    left: `${left}px`,
    top: `${top}px`,
    pointerEvents: "none",
    zIndex: "9999",
  };
}

function getAriaLabel(cell: CellData): string {
  return `${formatDateCN(cell.dateObj)}: ${formatCountText(cell.count, cell.isEmpty)}`;
}

// ==================== 全局事件 ====================
function onGlobalScroll() {
  if (tooltip.visible) tooltip.visible = false;
}

onMounted(() => {
  window.addEventListener("scroll", onGlobalScroll, true);
});
onUnmounted(() => window.removeEventListener("scroll", onGlobalScroll, true));
</script>

<style scoped>
/* 容器 */
.contribution-heatmap {
  display: flex;
  flex-direction: column;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 10px;
  user-select: none;
  max-width: 100%;
}
/* .contribution-heatmap:hover > .scrollable-area::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
} */
/* 滚动区域 */
.scrollable-area {
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  padding-bottom: 4px;
}
.scrollable-area::-webkit-scrollbar {
  height: 6px;
}
.scrollable-area::-webkit-scrollbar-track {
  background: transparent;
}
.scrollable-area::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 3px;
}
.scrollable-area::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}

/* 月份行 */
.month-row {
  display: flex;
  margin-bottom: 2px;
}
.month-weekday-spacer {
  width: 17px;
  margin-right: 4px;
  flex-shrink: 0;
}
.months-grid {
  display: grid;
  flex: 1;
}
.month-cell {
  font-size: 10px;
  color: #57606a;
  line-height: 1;
  white-space: nowrap;
  text-align: left;
}

/* 网格容器 */
.grid-container {
  display: grid;
}

/* 星期标签（绝对定位文字，不撑高行） */
.weekday-cell {
  position: relative;
  visibility: hidden;
}
.weekday-cell.is-visible {
  visibility: visible;
}
.weekday-cell::after {
  content: attr(data-text);
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: #57606a;
  white-space: nowrap;
}

/* 格子 */
.cell {
  aspect-ratio: 1;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  position: relative;
}
.cell:focus-visible {
  outline: 2px solid #0969da;
  outline-offset: 1px;
  z-index: 2;
}
.cell-visual {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: var(--cell-bg, #ebedf0);
}
.cell--empty .cell-visual {
  background-color: var(--heatmap-level-0);
}
.cell:hover .cell-visual {
  filter: brightness(0.85);
}

/* Tooltip */
.heatmap-tooltip {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  background: #24292f;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  max-width: 220px;
}
.heatmap-tooltip--visible {
  opacity: 1;
  transform: translateY(0);
}
.heatmap-tooltip__date {
  font-weight: 600;
  margin-bottom: 1px;
}
.heatmap-tooltip__count {
  color: #8b949e;
  font-size: 11px;
}

/* 响应式 */
@media (max-width: 768px) {
  .scrollable-area {
    -webkit-overflow-scrolling: touch;
  }
}
</style>
