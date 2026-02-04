<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, reactive } from "vue";

// 动态导入 monaco-editor，仅在客户端加载
let monaco: any = null;
let editor: any = null;

/**
 * 定义 props 和默认值
 */
interface Props {
  code?: string;
  title?: string;
  height?: number;
}

// 默认代码
const codeDefault = `// JavaScript 代码执行器示例

// 正常日志
console.log('Hello World!');
console.info('这是提示信息');
console.warn('这是警告信息');

// 同步错误
try {
  undefined.toString();
} catch(e) {
  console.error('捕获错误:', e.message);
}

// 异步错误
setTimeout(() => {
  console.logg('拼写错误'); // 会报错
}, 500);`;

const props = withDefaults(defineProps<Props>(), {
  code: codeDefault,
  height: 500,
  title: "JS code example",
  consoleTitle: "console",
});

interface Emits {
  (e: "update:code", value: string): void;
}
const emit = defineEmits<Emits>();

// 控制台状态
const consoleState = reactive<{
  visible: boolean;
  logs: Array<{ type: string; message: string; timestamp: string }>;
  position: "bottom" | "right";
  size: number;
}>({
  visible: true,
  logs: [],
  position: "right",
  size: 50,
});

// Monaco Editor 相关
const editorContainer = ref<HTMLElement | null>(null);
let editorInstance: any = null;

// 控制台内容容器引用
const consoleContentRef = ref<HTMLElement | null>(null);

// 拖拽相关
const isDragging = ref(false);

// 初始化 Monaco Editor
onMounted(async () => {
  if (!editorContainer.value) return;

  // 动态加载 monaco-editor
  try {
    const m = await import("monaco-editor");
    monaco = m;
    editor = m.editor;
  } catch (error) {
    console.error("Failed to load Monaco Editor:", error);
    return;
  }

  // 简化配置配置 Monaco Editor Worker 环境
  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker(_: unknown, label: string) {
      // 对于 JavaScript/TypeScript，禁用 Worker 以避免路径问题
      // 编辑器仍然可以正常工作，只是部分高级功能会在主线程运行
      const blob = new Blob([""], { type: "application/javascript" });
      return new Worker(URL.createObjectURL(blob));
    },
  };

  // 创建编辑器实例
  editorInstance = monaco.editor.create(editorContainer.value, {
    value: props.code,
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true,
    fontSize: 14,
    fontFamily: "Consolas, Monaco, Courier New, monospace",
    lineNumbers: "on",
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: "on",
    tabSize: 2,
    insertSpaces: true,
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    folding: true,
    bracketPairColorization: {
      enabled: true,
    },
  });

  // 监听内容变化
  editorInstance.onDidChangeModelContent(() => {
    if (editorInstance) {
      const value = editorInstance.getValue();
      emit("update:code", value);
    }
  });
});

// 监听 props.code 变化，更新编辑器内容
watch(
  () => props.code,
  (newCode) => {
    if (editorInstance && editorInstance.getValue() !== newCode) {
      editorInstance.setValue(newCode);
    }
  },
);

// 清理编辑器
onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.dispose();
  }
});

// 切换控制台显示/隐藏
const toggleConsole = () => {
  consoleState.visible = !consoleState.visible;
};

// 切换控制台位置
const toggleConsolePosition = () => {
  consoleState.position = consoleState.position === "bottom" ? "right" : "bottom";
  consoleState.size = 50; // 重置大小为 50%
};

// 清除控制台
const clearConsole = () => {
  consoleState.logs = [];
};

// 添加日志
const addLog = (type: string, message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  consoleState.logs.push({ type, message, timestamp });

  // 滚动到底部
  scrollToBottom();
};

// 滚动到控制台底部
const scrollToBottom = () => {
  // 使用 nextTick 确保 DOM 更新后再滚动
  setTimeout(() => {
    if (consoleContentRef.value) {
      consoleContentRef.value.scrollTop = consoleContentRef.value.scrollHeight;
    }
  }, 0);
};

// 执行代码
const executeCode = () => {
  if (!editorInstance) {
    addLog("error", "编辑器未初始化");
    return;
  }

  const code = editorInstance.getValue();

  try {
    //  console 和错误处理器
    const originalConsole = { ...window.console };
    const originalErrorHandler = window.onerror;
    const originalUnhandledRejection = window.onunhandledrejection;

    // 辅助函数：安全地将值转换为字符串，处理循环引用
    const safeStringify = (value: unknown): string => {
      if (value === null) {
        return "null";
      }
      if (value === undefined) {
        return "undefined";
      }
      if (value === window) {
        return "[object Window]";
      }
      if (value === document) {
        return "[object Document]";
      }
      if (value === document.body) {
        return "[object HTMLBodyElement]";
      }

      // 检查是否为DOM元素
      if (typeof value === "object" && "nodeType" in value) {
        return `[object ${value.constructor.name}]`;
      }

      try {
        // 使用自定义 replacer 处理循环引用
        const seen = new Set();
        return JSON.stringify(
          value,
          (key, val) => {
            if (typeof val === "object" && val !== null) {
              if (seen.has(val)) {
                return "[Circular]";
              }
              seen.add(val);
            }
            return val;
          },
          2,
        );
      } catch (e) {
        // 如果JSON.stringify失败，使用toString
        return String(value);
      }
    };

    // 劫持全局 console
    window.console = {
      ...window.console,
      log: (...args: unknown[]) => {
        addLog("log", args.map((arg) => safeStringify(arg)).join(" "));
      },
      error: (...args: unknown[]) => {
        addLog("error", args.map((arg) => safeStringify(arg)).join(" "));
      },
      warn: (...args: unknown[]) => {
        addLog("warn", args.map((arg) => safeStringify(arg)).join(" "));
      },
      info: (...args: unknown[]) => {
        addLog("info", args.map((arg) => safeStringify(arg)).join(" "));
      },
      debug: (...args: unknown[]) => {
        addLog("info", args.map((arg) => safeStringify(arg)).join(" "));
      },
    } as Console;

    // 劫持全局错误处理
    window.onerror = (message, source, lineno, colno, error) => {
      const errorMsg = error ? error.toString() : String(message);
      addLog("error", `运行时错误: ${errorMsg}`);
      return true; // 阻止默认错误处理
    };

    // 劫持 Promise 未捕获错误
    window.onunhandledrejection = (event) => {
      addLog("error", `Promise 错误: ${event.reason}`);
      event.preventDefault();
    };

    // 执行代码，使用更可靠的方式确保this指向window
    // 在函数内部添加 'use strict' 移除，确保在非严格模式下执行
    const codeToExecute = `(function() {
      // 确保在非严格模式下执行，使this正确指向window
      return eval(${JSON.stringify(code)});
    }).call(window)`;

    const func = new Function(codeToExecute);
    func();

    // 延迟恢复，给异步代码足够的执行时间
    setTimeout(() => {
      window.console = originalConsole;
      window.onerror = originalErrorHandler;
      window.onunhandledrejection = originalUnhandledRejection;
    }, 5000); // 5秒后恢复
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    addLog("error", `执行错误: ${errorMessage}`);
  }
};

// 拖拽开始
const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  e.preventDefault();
  e.stopPropagation();

  // 获取容器信息
  const container = editorContainer.value?.parentElement as HTMLElement;
  if (!container) return;

  const onMouseMove = (moveEvent: MouseEvent) => {
    if (!isDragging.value) return;

    // 实时获取容器位置信息，避免滚动或窗口变化导致偏移
    const containerRect = container.getBoundingClientRect();

    if (consoleState.position === "bottom") {
      // 底部停靠：计算鼠标相对于容器底部的距离，转换为百分比
      const distanceFromBottom = containerRect.bottom - moveEvent.clientY;
      const percentage = (distanceFromBottom / containerRect.height) * 100;
      // 限制范围在 10% 到 90%
      consoleState.size = Math.max(5, Math.min(percentage, 90));
    } else {
      // 右侧停靠：计算鼠标相对于容器右边的距离，转换为百分比
      const distanceFromRight = containerRect.right - moveEvent.clientX;
      const percentage = (distanceFromRight / containerRect.width) * 100;
      // 限制范围在 10% 到 90%
      consoleState.size = Math.max(20, Math.min(percentage, 80));
    }
  };

  const onMouseUp = () => {
    isDragging.value = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

// 计算样式
const containerClass = computed(() => ({
  "console-bottom": consoleState.position === "bottom",
  "console-right": consoleState.position === "right",
}));

const consoleStyle = computed(() => {
  if (!consoleState.visible) return { display: "none" };

  if (consoleState.position === "bottom") {
    return { height: `${consoleState.size}%` };
  } else {
    return { width: `${consoleState.size}%` };
  }
});

const getLogClass = (type: string) => {
  return `log-item log-${type}`;
};
</script>

<template>
  <div class="code-executor" :class="containerClass" :style="{ height: `${height}px` }">
    <!-- 头部标题栏 -->
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <div class="header-actions">
        <button
          @click="toggleConsolePosition"
          class="btn btn-toggle"
          :title="consoleState.position === 'bottom' ? '切换到右侧' : '切换到底部'"
        >
          <span v-if="consoleState.position === 'bottom'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="#fff" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.25 15.084H2.75" />
                <rect width="18.5" height="18.5" x="2.75" y="2.75" rx="6" />
              </g>
            </svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="#fff" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.917 21.25V2.75" />
                <rect width="18.5" height="18.5" x="2.75" y="2.75" rx="6" />
              </g>
            </svg>
          </span>
        </button>
        <button
          @click="toggleConsole"
          class="btn btn-toggle"
          :title="consoleState.visible ? '隐藏控制台' : '显示控制台'"
        >
          <span v-if="consoleState.visible">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M20 19V7H4v12zm0-16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-7 14v-2h5v2zm-3.42-4L5.57 9H8.4l3.3 3.3c.39.39.39 1.03 0 1.42L8.42 17H5.59z"
              />
            </svg>
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M13 19v-3h8v3zm-4.5-6L2.47 7h4.24l4.96 4.95c.58.59.58 1.55 0 2.12L6.74 19H2.5z"
              />
            </svg>
          </span>
        </button>
        <button @click="executeCode" class="btn btn-run" title="运行代码">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path
              fill="#fff"
              d="M3.44 13.557a1.5 1.5 0 0 0 1.795.244l8-4.5a1.5 1.5 0 0 0 0-2.61l-8.01-4.507A1.52 1.52 0 0 0 3 3.496v9c0 .398.158.78.44 1.06m.706-10.414a.5.5 0 0 1 .599-.082l8 4.5a.5.5 0 0 1 0 .87l-7.99 4.494A.492.492 0 0 1 4 12.496v-9a.5.5 0 0 1 .146-.353m6.614 8.693l1.22-.68q.018.125.02.25a1.51 1.51 0 0 1-.76 1.31l-5.08 2.86a3.6 3.6 0 0 1-1.66.42a3 3 0 0 1-.91-.13a3.33 3.33 0 0 1-1.59-.93a3.46 3.46 0 0 1-1-2.44v-5.59a1.48 1.48 0 0 1 1-1.39v6.98a2.513 2.513 0 0 0 3.7 2.19l5.05-2.84a.01.01 0 0 0 .01-.01"
            />
          </svg>
        </button>
        <button @click="clearConsole" class="btn btn-clear" title="清除控制台">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
            <path
              fill="none"
              stroke="#fff"
              d="M4.5 3V1.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V3M0 3.5h15m-13.5 0v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-10M7.5 7v5m-3-3v3m6-3v3"
              stroke-width="1"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- Monaco Editor 编辑器 -->
      <div ref="editorContainer" class="monaco-editor-container"></div>

      <!-- 控制台 -->
      <div v-if="consoleState.visible" class="console-panel" :style="consoleStyle">
        <!-- 拖拽 -->
        <div
          class="resize-handle"
          :class="{
            'handle-horizontal': consoleState.position === 'bottom',
            'handle-vertical': consoleState.position === 'right',
          }"
          @mousedown="startDrag"
        ></div>

        <!-- 控制台标题 -->
        <div class="console-header">
          <span class="console-title">console</span>
        </div>

        <!-- 控制台内容 -->
        <div ref="consoleContentRef" class="console-content">
          <div v-if="consoleState.logs.length === 0" class="console-empty">
            Click the run button to execute the code ...
          </div>
          <div v-else>
            <div
              v-for="(log, index) in consoleState.logs"
              :key="index"
              :class="getLogClass(log.type)"
            >
              <span class="log-time">{{ log.timestamp }}</span>
              <span class="log-type">[{{ log.type.toUpperCase() }}]</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.code-executor {
  display: flex;
  flex-direction: column;
  max-height: 600px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: "Consolas", "Monaco", monospace;
  position: relative;
  overflow: hidden;
  border-radius: 1%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #2d2d30;
  border-bottom: 1px solid #3e3e42;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #cccccc;
}

.header-actions {
  user-select: none;
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #0e639c;
  color: white;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}

.btn:hover {
  background: #1177bb;
}

.btn-toggle {
  background: #5a5a5a;
}

.btn-toggle:hover {
  background: #6e6e6e;
}

.btn-clear {
  background: #d73a49;
}

.btn-clear:hover {
  background: #e74856;
}

.btn-position {
  background: #6a4c93;
}

.btn-position:hover {
  background: #7d5ba6;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.console-bottom .main-content {
  flex-direction: column;
}

.console-right .main-content {
  flex-direction: row;
}

.monaco-editor-container {
  flex: 1;
  overflow: hidden;
  background: #1e1e1e;
}

.console-panel {
  position: relative;
  background: #252526;
  border-top: 1px solid #3e3e42;
  display: flex;
  flex-direction: column;
  min-height: 40px;
  min-width: 100px;
}

.console-right .console-panel {
  border-top: none;
  border-left: 1px solid #3e3e42;
}

.resize-handle {
  position: absolute;
  background: #3e3e42;
  z-index: 10;
  transition: background 0.2s;
  user-select: none;
}

.resize-handle:hover {
  background: #007acc;
}

.handle-horizontal {
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  cursor: ns-resize;
}

.handle-vertical {
  top: 0;
  left: 0;
  bottom: 0;
  width: 6px;
  cursor: ew-resize;
}

.console-header {
  padding: 8px 16px;
  background: #2d2d30;
  border-bottom: 1px solid #3e3e42;
  font-size: 13px;
  font-weight: 500;
}

.console-title {
  color: #cccccc;
}

.console-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  font-size: 13px;
  line-height: 1.5;
}

.console-empty {
  display: flex;
  text-align: start;
  align-items: center;
  color: #858585;
  font-style: italic;
  padding: 20px;
}

.log-item {
  padding: 4px 8px;
  margin-bottom: 4px;
  border-radius: 3px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.log-time {
  color: #858585;
  font-size: 11px;
  flex-shrink: 0;
}

.log-type {
  font-weight: 600;
  flex-shrink: 0;
}

.log-message {
  flex: 1;
  word-break: break-word;
  white-space: pre-wrap;
}

.log-log {
  background: rgba(255, 255, 255, 0.05);
}

.log-log .log-type {
  color: #4ec9b0;
}

.log-error {
  background: rgba(231, 72, 86, 0.1);
  border-left: 3px solid #e74856;
}

.log-error .log-type {
  color: #e74856;
}

.log-warn {
  background: rgba(252, 207, 49, 0.1);
  border-left: 3px solid #fcce31;
}

.log-warn .log-type {
  color: #fcce31;
}

.log-info {
  background: rgba(23, 155, 215, 0.1);
  border-left: 3px solid #179bd7;
}

.log-info .log-type {
  color: #179bd7;
}

.log-success {
  background: rgba(106, 153, 85, 0.1);
  border-left: 3px solid #6a9955;
}

.log-success .log-type {
  color: #6a9955;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
}

::-webkit-scrollbar-thumb {
  background: #424242;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4e4e4e;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 12px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .btn {
    flex: 1;
    font-size: 11px;
    padding: 8px 6px;
  }
}
</style>
