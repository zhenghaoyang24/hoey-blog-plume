<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

// 动态导入 monaco-editor，仅在客户端加载
let monaco: any = null
let editor: any = null

interface Props {
  code?: string
  title?: string
}

interface Emits {
  (e: 'update:code', value: string): void
}

const codeDefault = `// JavaScript 代码执行器示例

console.log('=== 欢迎使用代码执行器 ===');
console.log('当前时间:', new Date().toLocaleString());

console.info('ℹ️ 这是一条提示信息');
console.warn('⚠️ 注意：这是一个警告！');
console.error('❌ 这是一个错误示例');`

const props = withDefaults(defineProps<Props>(), {
  code: codeDefault,
  title: 'JS 代码示例'
})

const emit = defineEmits<Emits>()

// 控制台状态
const consoleVisible = ref(true)
const consoleLogs = ref<Array<{ type: string; message: string; timestamp: string }>>([])
const consolePosition = ref<'bottom' | 'right'>('bottom')
const consoleSize = ref(300) // 高度或宽度

// Monaco Editor 相关
const editorContainer = ref<HTMLElement | null>(null)
let editorInstance: any = null

// 控制台内容容器引用
const consoleContentRef = ref<HTMLElement | null>(null)

// 拖拽相关
const isDragging = ref(false)

// 初始化 Monaco Editor
onMounted(async () => {
  if (!editorContainer.value) return

  // 动态加载 monaco-editor
  try {
    const m = await import('monaco-editor')
    monaco = m
    editor = m.editor
  } catch (error) {
    console.error('Failed to load Monaco Editor:', error)
    return
  }

  // 配置 Monaco Editor Worker 环境（使用简化配置）
  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker(_: unknown, label: string) {
      // 对于 JavaScript/TypeScript，禁用 Worker 以避免路径问题
      // 编辑器仍然可以正常工作，只是部分高级功能会在主线程运行
      const blob = new Blob([''], { type: 'application/javascript' })
      return new Worker(URL.createObjectURL(blob))
    }
  }

  // 创建编辑器实例
  editorInstance = monaco.editor.create(editorContainer.value, {
    value: props.code,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true,
    fontSize: 14,
    fontFamily: 'Consolas, Monaco, Courier New, monospace',
    lineNumbers: 'on',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    tabSize: 2,
    insertSpaces: true,
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    folding: true,
    bracketPairColorization: {
      enabled: true
    }
  })

  // 监听内容变化
  editorInstance.onDidChangeModelContent(() => {
    if (editorInstance) {
      const value = editorInstance.getValue()
      emit('update:code', value)
    }
  })
})

// 监听 props.code 变化，更新编辑器内容
watch(() => props.code, (newCode) => {
  if (editorInstance && editorInstance.getValue() !== newCode) {
    editorInstance.setValue(newCode)
  }
})

// 清理编辑器
onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.dispose()
  }
})

// 切换控制台显示/隐藏
const toggleConsole = () => {
  consoleVisible.value = !consoleVisible.value
}

// 切换控制台位置
const toggleConsolePosition = () => {
  consolePosition.value = consolePosition.value === 'bottom' ? 'right' : 'bottom'
  consoleSize.value = 300 // 重置大小
}

// 清除控制台
const clearConsole = () => {
  consoleLogs.value = []
}

// 添加日志
const addLog = (type: string, message: string) => {
  const timestamp = new Date().toLocaleTimeString()
  consoleLogs.value.push({ type, message, timestamp })
  
  // 滚动到底部
  scrollToBottom()
}

// 滚动到控制台底部
const scrollToBottom = () => {
  // 使用 nextTick 确保 DOM 更新后再滚动
  setTimeout(() => {
    if (consoleContentRef.value) {
      consoleContentRef.value.scrollTop = consoleContentRef.value.scrollHeight
    }
  }, 0)
}

// 执行代码
const executeCode = () => {
  // clearConsole()

  if (!editorInstance) {
    addLog('error', '编辑器未初始化')
    return
  }

  const code = editorInstance.getValue()

  try {
    // 创建沙箱环境
    const sandbox = {
      console: {
        log: (...args: unknown[]) => addLog('log', args.map(arg =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')),
        error: (...args: unknown[]) => addLog('error', args.map(arg => String(arg)).join(' ')),
        warn: (...args: unknown[]) => addLog('warn', args.map(arg => String(arg)).join(' ')),
        info: (...args: unknown[]) => addLog('info', args.map(arg => String(arg)).join(' '))
      }
    }

    // 使用 Function 构造器创建隔离环境
    const func = new Function('console', code)
    func(sandbox.console)

    addLog('success', '代码执行完成')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    addLog('error', `执行错误: ${errorMessage}`)
  }
}

// 拖拽开始
const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  e.preventDefault()
  e.stopPropagation()

  // 获取容器信息
  const container = (editorContainer.value?.parentElement?.parentElement) as HTMLElement
  if (!container) return

  const containerRect = container.getBoundingClientRect()

  const onMouseMove = (moveEvent: MouseEvent) => {
    if (!isDragging.value) return

    if (consolePosition.value === 'bottom') {
      // 底部停靠：计算鼠标相对于容器底部的距离
      const distanceFromBottom = containerRect.bottom - moveEvent.clientY
      const newHeight = Math.max(100, Math.min(distanceFromBottom, containerRect.height - 100))
      consoleSize.value = newHeight
    } else {
      // 右侧停靠：计算鼠标相对于容器右边的距离
      const distanceFromRight = containerRect.right - moveEvent.clientX
      const newWidth = Math.max(200, Math.min(distanceFromRight, containerRect.width - 200))
      consoleSize.value = newWidth
    }
  }

  const onMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

// 计算样式
const containerClass = computed(() => ({
  'console-bottom': consolePosition.value === 'bottom',
  'console-right': consolePosition.value === 'right'
}))

const consoleStyle = computed(() => {
  if (!consoleVisible.value) return { display: 'none' }

  if (consolePosition.value === 'bottom') {
    return { height: `${consoleSize.value}px` }
  } else {
    return { width: `${consoleSize.value}px` }
  }
})

const getLogClass = (type: string) => {
  return `log-item log-${type}`
}
</script>

<template>
  <div class="code-executor" :class="containerClass">
    <!-- 头部标题栏 -->
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <div class="header-actions">
        <button @click="toggleConsolePosition" class="btn btn-position"
          :title="consolePosition === 'bottom' ? '切换到右侧' : '切换到底部'">
          <span v-if="consolePosition === 'bottom'">⬅️</span>
          <span v-else>⬇️</span>
        </button>
        <button @click="toggleConsole" class="btn btn-toggle" :title="consoleVisible ? '隐藏控制台' : '显示控制台'">
          <span v-if="consoleVisible">👁️</span>
          <span v-else>👁️‍🗨️</span>
        </button>
        <button @click="executeCode" class="btn btn-run" title="运行代码">
          ▶️ 运行
        </button>
        <button @click="clearConsole" class="btn btn-clear" title="清除控制台">
          🗑️ 清除
        </button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- Monaco Editor 编辑器 -->
      <div ref="editorContainer" class="monaco-editor-container"></div>

      <!-- 控制台 -->
      <div v-if="consoleVisible" class="console-panel" :style="consoleStyle">
        <!-- 拖拽手柄 -->
        <div class="resize-handle"
          :class="{ 'handle-horizontal': consolePosition === 'bottom', 'handle-vertical': consolePosition === 'right' }"
          @mousedown="startDrag"></div>

        <!-- 控制台标题 -->
        <div class="console-header">
          <span class="console-title">控制台输出</span>
        </div>

        <!-- 控制台内容 -->
        <div ref="consoleContentRef" class="console-content">
          <div v-if="consoleLogs.length === 0" class="console-empty">
            点击运行按钮执行代码...
          </div>
          <div v-else>
            <div v-for="(log, index) in consoleLogs" :key="index" :class="getLogClass(log.type)">
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
  height: 600px;
  max-height: 600px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', monospace;
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
  min-height: 200px;
}

.console-panel {
  position: relative;
  background: #252526;
  border-top: 1px solid #3e3e42;
  display: flex;
  flex-direction: column;
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
}

.resize-handle:hover {
  background: #007acc;
}

.handle-horizontal {
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  cursor: ns-resize;
}

.handle-vertical {
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
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
  color: #858585;
  font-style: italic;
  text-align: center;
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
