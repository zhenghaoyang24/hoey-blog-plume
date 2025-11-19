<template>
    <div class="code-executor" :class="`console-${consolePosition}`">
      <div class="editor-section">
        <div class="toolbar">
          <h3>代码编辑器</h3>
          <div class="toolbar-actions">
            <button class="btn run-btn" @click="runCode">
              <span class="icon">▶</span> 运行代码
            </button>
            <button class="btn clear-btn" @click="clearConsole">
              <span class="icon">🗑️</span> 清空控制台
            </button>
            <div class="console-position-selector">
              <label>控制台位置:</label>
              <select v-model="internalConsolePosition" @change="updateConsolePosition">
                <option value="bottom">下方</option>
                <option value="right">右侧</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="editor-container">
          <div ref="editorRef" class="editor"></div>
        </div>
      </div>
  
      <div class="console-section" :style="consoleStyles">
        <div class="console-header">
          <h4>console</h4>
          <div class="console-info">
            <span class="log-count">
              日志: {{ consoleLogs.length }} 条
            </span>
          </div>
        </div>
        
        <div 
          class="resize-handle" 
          :class="`handle-${consolePosition}`"
          @mousedown="startResize"
        >
          <div class="handle-indicator"></div>
        </div>
        
        <div class="console-content" ref="consoleContentRef">
          <div v-if="consoleLogs.length === 0" class="empty-console">
            <div class="empty-icon">📝</div>
            <p>代码执行结果将显示在这里</p>
          </div>
          
          <div v-else class="log-entries">
            <div 
              v-for="(log, index) in consoleLogs" 
              :key="index" 
              class="log-entry"
              :class="`log-${log.type}`"
            >
              <span class="log-timestamp">{{ log.timestamp }}</span>
              <span class="log-type" :class="`badge-${log.type}`">
                {{ log.type.toUpperCase() }}
              </span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
  
  // 定义组件属性
  interface Props {
    initialCode?: string
    consolePosition?: 'bottom' | 'right'
    consoleSize?: number
    externalFileUrl?: string
  }
  
  const props = withDefaults(defineProps<Props>(), {
    initialCode: `// 欢迎使用 JavaScript 代码执行器
  // 在此处编写您的 JavaScript 代码
  // 点击"运行代码"按钮执行
  
  console.log("Hello, Vue3!");
  
  // 示例：计算斐波那契数列
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  console.log("斐波那契数列前10项:");
  for (let i = 0; i < 10; i++) {
    console.log(\`F(\${i}) = \${fibonacci(i)}\`);
  }
  
  // 示例：处理数组
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(n => n * 2);
  console.log("原数组:", numbers);
  console.log("加倍后:", doubled);
  
  // 示例：错误处理
  try {
    // 故意抛出一个错误
    throw new Error("这是一个示例错误");
  } catch (error) {
    console.error("捕获到错误:", error.message);
  }
  
  console.log("代码执行完成！");`,
    consolePosition: 'bottom',
    consoleSize: 200
  })
  
  // 定义日志接口
  interface LogEntry {
    type: 'log' | 'info' | 'warn' | 'error' | 'success'
    message: string
    timestamp: string
  }
  
  // 响应式数据
  const editorRef = ref<HTMLElement>()
  const consoleContentRef = ref<HTMLElement>()
  const internalConsolePosition = ref(props.consolePosition)
  const consoleSize = ref(props.consoleSize)
  const isResizing = ref(false)
  const consoleLogs = ref<LogEntry[]>([])
  let editor: any = null
  
  // 计算控制台样式
  const consoleStyles = computed(() => {
    if (internalConsolePosition.value === 'bottom') {
      return { height: `${consoleSize.value}px` }
    } else {
      return { width: `${consoleSize.value}px` }
    }
  })
  
  // 初始化编辑器
  const initEditor = async () => {
    if (typeof window !== 'undefined' && (window as any).monaco) {
      const monaco = (window as any).monaco
      editor = monaco.editor.create(editorRef.value, {
        value: props.initialCode,
        language: 'javascript',
        theme: 'vs-dark',
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true
      })
      return
    }
  
    // 动态加载 Monaco Editor
    const loaderScript = document.createElement('script')
    loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/loader.js'
    loaderScript.onload = () => {
      const require = (window as any).require
      require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' } })
      
      require(['vs/editor/editor.main'], () => {
        const monaco = (window as any).monaco
        editor = monaco.editor.create(editorRef.value, {
          value: props.initialCode,
          language: 'javascript',
          theme: 'vs-dark',
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true
        })
      })
    }
    document.head.appendChild(loaderScript)
  }
  
  // 加载外部代码文件
  const loadExternalCode = async () => {
    if (!props.externalFileUrl) return
    
    try {
      const response = await fetch(props.externalFileUrl)
      const code = await response.text()
      if (editor) {
        editor.setValue(code)
      }
    } catch (error) {
      addLog('error', `加载外部文件失败: ${error}`)
    }
  }
  
  // 添加日志
  const addLog = (type: LogEntry['type'], ...args: any[]) => {
    const timestamp = new Date().toLocaleTimeString()
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2)
        } catch {
          return String(arg)
        }
      }
      return String(arg)
    }).join(' ')
    
    consoleLogs.value.push({
      type,
      message,
      timestamp
    })
    
    // 滚动到底部
    nextTick(() => {
      if (consoleContentRef.value) {
        consoleContentRef.value.scrollTop = consoleContentRef.value.scrollHeight
      }
    })
  }
  
  // 运行代码
  const runCode = () => {
    // 清空控制台
    consoleLogs.value = []
    
    // 获取代码
    const codeToRun = editor ? editor.getValue() : props.initialCode
    
    // 保存原始 console 方法
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
    }
    
    // 重写 console 方法
    console.log = (...args: any[]) => {
      originalConsole.log(...args)
      addLog('log', ...args)
    }
    
    console.info = (...args: any[]) => {
      originalConsole.info(...args)
      addLog('info', ...args)
    }
    
    console.warn = (...args: any[]) => {
      originalConsole.warn(...args)
      addLog('warn', ...args)
    }
    
    console.error = (...args: any[]) => {
      originalConsole.error(...args)
      addLog('error', ...args)
    }
    
    // 执行代码
    try {
      const result = new Function(codeToRun)()
      if (result !== undefined) {
        addLog('success', '返回值:', result)
      } else {
        addLog('success', '代码执行完成')
      }
    } catch (error: any) {
      addLog('error', `执行错误: ${error.message}`)
    } finally {
      // 恢复原始 console 方法
      console.log = originalConsole.log
      console.info = originalConsole.info
      console.warn = originalConsole.warn
      console.error = originalConsole.error
    }
  }
  
  // 清空控制台
  const clearConsole = () => {
    consoleLogs.value = []
  }
  
  // 更新控制台位置
  const updateConsolePosition = () => {
    // 重置尺寸为默认值
    consoleSize.value = props.consoleSize
  }
  
  // 调整大小功能
  const startResize = (e: MouseEvent) => {
    e.preventDefault()
    isResizing.value = true
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.value) return
      
      const containerRect = (e.target as HTMLElement).closest('.code-executor')!.getBoundingClientRect()
      
      if (internalConsolePosition.value === 'bottom') {
        const newHeight = containerRect.bottom - moveEvent.clientY
        if (newHeight >= 100 && newHeight <= 500) {
          consoleSize.value = newHeight
        }
      } else {
        const newWidth = containerRect.right - moveEvent.clientX
        if (newWidth >= 200 && newWidth <= 800) {
          consoleSize.value = newWidth
        }
      }
    }
    
    const handleMouseUp = () => {
      isResizing.value = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  // 监听属性变化
  watch(() => props.initialCode, (newCode) => {
    if (editor) {
      editor.setValue(newCode)
    }
  })
  
  watch(() => props.consolePosition, (newPosition) => {
    internalConsolePosition.value = newPosition
  })
  
  // 生命周期
  onMounted(() => {
    initEditor()
    if (props.externalFileUrl) {
      loadExternalCode()
    }
  })
  
  onUnmounted(() => {
    if (editor) {
      editor.dispose()
    }
  })
  </script>
  
  <style scoped>
  .code-executor {
    display: flex;
    width: 100%;
    height: 600px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .console-bottom {
    flex-direction: column;
  }
  
  .console-right {
    flex-direction: row;
  }
  
  /* 编辑器区域 */
  .editor-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }
  
  .toolbar h3 {
    margin: 0;
    color: #495057;
    font-size: 16px;
    font-weight: 600;
  }
  
  .toolbar-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .run-btn {
    background: #28a745;
    color: white;
  }
  
  .run-btn:hover {
    background: #218838;
    transform: translateY(-1px);
  }
  
  .clear-btn {
    background: #6c757d;
    color: white;
  }
  
  .clear-btn:hover {
    background: #5a6268;
  }
  
  .console-position-selector {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #495057;
  }
  
  .console-position-selector select {
    padding: 6px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background: white;
    cursor: pointer;
  }
  
  .editor-container {
    flex: 1;
    position: relative;
    min-height: 0;
  }
  
  .editor {
    width: 100%;
    height: 100%;
  }
  
  /* 控制台区域 */
  .console-section {
    display: flex;
    flex-direction: column;
    background: #1e1e1e;
    color: #e0e0e0;
    position: relative;
  }
  
  .console-bottom .console-section {
    border-top: 1px solid #444;
  }
  
  .console-right .console-section {
    border-left: 1px solid #444;
  }
  
  .console-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #2d2d2d;
    border-bottom: 1px solid #444;
  }
  
  .console-header h4 {
    margin: 0;
    color: #e0e0e0;
    font-size: 14px;
    font-weight: 600;
  }
  
  .console-info {
    font-size: 12px;
    color: #aaa;
  }
  
  .resize-handle {
    background: #444;
    cursor: row-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
  }
  
  .resize-handle:hover {
    background: #555;
  }
  
  .handle-bottom {
    height: 6px;
  }
  
  .handle-right {
    width: 6px;
    cursor: col-resize;
  }
  
  .handle-indicator {
    width: 20px;
    height: 3px;
    background: #777;
    border-radius: 2px;
  }
  
  .console-content {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    font-family: 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.4;
  }
  
  .empty-console {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #777;
    text-align: center;
  }
  
  .empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.5;
  }
  
  /* 日志条目样式 */
  .log-entries {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .log-entry {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;
    word-break: break-all;
  }
  
  .log-timestamp {
    color: #6a9955;
    font-size: 11px;
    min-width: 70px;
    opacity: 0.7;
  }
  
  .log-type {
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 600;
    min-width: 40px;
    text-align: center;
  }
  
  .badge-log, .badge-info {
    background: #007acc;
    color: white;
  }
  
  .badge-warn {
    background: #ff8c00;
    color: black;
  }
  
  .badge-error {
    background: #f44747;
    color: white;
  }
  
  .badge-success {
    background: #4ec9b0;
    color: black;
  }
  
  .log-message {
    flex: 1;
    color: #d4d4d4;
  }
  
  .log-log .log-message,
  .log-info .log-message {
    color: #9cdcfe;
  }
  
  .log-warn .log-message {
    color: #ffd700;
  }
  
  .log-error .log-message {
    color: #f48771;
  }
  
  .log-success .log-message {
    color: #4ec9b0;
  }
  
  /* 滚动条样式 */
  .console-content::-webkit-scrollbar {
    width: 8px;
  }
  
  .console-content::-webkit-scrollbar-track {
    background: #2d2d2d;
  }
  
  .console-content::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 4px;
  }
  
  .console-content::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
  </style>