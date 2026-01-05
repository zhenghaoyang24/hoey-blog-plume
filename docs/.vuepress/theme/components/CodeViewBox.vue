<template>
  <div class="code-view-box" :class="{ 'loading': !iframeLoaded, 'error': hasError }">
    <!-- 标题栏 -->
    <div class="code-view-header">
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
        <div v-if="isLoading" class="loading-indicator">
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
        </div>
      </div>
    </div>

    <!-- StackBlitz iframe容器或错误提示 -->
    <div class="iframe-container">
      <!-- 正常状态显示iframe -->
      <iframe
        v-if="!hasError"
        ref="iframeRef"
        :src="processedUrl"
        :title="title"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        loading="lazy"
        class="stackblitz-iframe"
        @load="handleIframeLoad"
        @error="handleIframeError"
      ></iframe>

      <!-- 错误状态显示错误信息 -->
      <div v-else class="error-container">
        <div class="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24">
            <path fill="#f44336" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
        <h3 class="error-title">无法加载StackBlitz示例</h3>
        <p class="error-message">{{ errorMessage }}</p>
        <div class="error-actions">
          <button @click="reloadIframe" class="action-btn primary">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            重新加载
          </button>
          <a :href="originalUrl" target="_blank" class="action-btn secondary">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
            在新标签页打开
          </a>
        </div>
        <p class="error-tip">
          提示：某些StackBlitz项目可能需要在新标签页中打开才能正常预览
        </p>
      </div>
      
      <!-- 加载遮罩 -->
      <div v-if="isLoading && !hasError" class="loading-overlay">
        <div class="loading-spinner"></div>
        <p>正在加载StackBlitz项目...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  /** StackBlitz分享链接 */
  url: string
  /** 组件标题 */
  title?: string
  /** 是否显示重新加载按钮 */
  showReload?: boolean
  /** 初始高度 */
  height?: string
  /** 是否启用调试模式 */
  debug?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '代码示例',
  showReload: true,
  height: '600px',
  debug: false
})

const iframeRef = ref<HTMLIFrameElement | null>(null)
const iframeLoaded = ref(false)
const isLoading = ref(true)
const hasError = ref(false)
const errorMessage = ref('')

// 获取原始URL（不带embed参数）
const originalUrl = computed(() => {
  return props.url.trim()
})

// 处理URL，确保正确的格式
const processedUrl = computed(() => {
  const url = props.url.trim()
  
  if (props.debug) {
    console.log('原始URL:', url)
  }
  
  // 首先检查是否是有效的StackBlitz链接
  if (!url.includes('stackblitz.com/')) {
    hasError.value = true
    errorMessage.value = '请输入有效的StackBlitz链接'
    return ''
  }
  
  try {
    // 解析URL
    const urlObj = new URL(url)
    
    // 获取路径和查询参数
    const pathname = urlObj.pathname
    const searchParams = new URLSearchParams(urlObj.search)
    
    // 确保必要的参数
    if (!searchParams.has('embed')) {
      searchParams.set('embed', '1')
    }
    
    // 设置视图模式
    if (!searchParams.has('view')) {
      searchParams.set('view', 'editor')
    }
    
    // 设置主题
    if (!searchParams.has('theme')) {
      searchParams.set('theme', 'dark')
    }
    
    // 确保ctl参数正确（控制面板显示）
    if (!searchParams.has('ctl')) {
      searchParams.set('ctl', '1')
    }
    
    // 隐藏导航栏以获得更干净的视图
    if (!searchParams.has('hideNavigation')) {
      searchParams.set('hideNavigation', '1')
    }
    
    // 重新构建URL
    const newUrl = `https://stackblitz.com${pathname}?${searchParams.toString()}`
    
    if (props.debug) {
      console.log('处理后的URL:', newUrl)
    }
    
    return newUrl
  } catch (error) {
    console.error('URL处理错误:', error)
    hasError.value = true
    errorMessage.value = '链接格式不正确'
    return ''
  }
})

// 监听iframe加载完成
const handleIframeLoad = () => {
  iframeLoaded.value = true
  isLoading.value = false
  hasError.value = false
  
  if (props.debug) {
    console.log(`CodeViewBox "${props.title}" loaded successfully`)
  }
  
  // 尝试向iframe发送消息获取状态
  setTimeout(() => {
    if (iframeRef.value && iframeRef.value.contentWindow) {
      try {
        iframeRef.value.contentWindow.postMessage({ type: 'ping' }, '*')
      } catch (error) {
        console.error('发送消息失败:', error)
      }
    }
  }, 1000)
}

// 监听iframe错误
const handleIframeError = () => {
  console.error('iframe加载失败')
  isLoading.value = false
  hasError.value = true
  errorMessage.value = '无法加载项目，可能是安全限制或项目配置问题'
}

// 重新加载iframe
const reloadIframe = () => {
  if (!iframeRef.value) return
  
  isLoading.value = true
  iframeLoaded.value = false
  hasError.value = false
  
  // 通过重新设置src来强制重新加载
  const currentSrc = iframeRef.value.src
  iframeRef.value.src = ''
  
  setTimeout(() => {
    if (iframeRef.value) {
      iframeRef.value.src = currentSrc
    }
  }, 50)
}

// 监听来自iframe的消息
const handleMessage = (event: MessageEvent) => {
  // 只处理来自StackBlitz域名的消息
  if (!event.origin.includes('stackblitz.com')) {
    return
  }
  
  if (props.debug) {
    console.log('收到iframe消息:', event.data)
  }
  
  if (event.data && event.data.type === 'stackblitz-ready') {
    iframeLoaded.value = true
    isLoading.value = false
    hasError.value = false
  }
  
  if (event.data && event.data.type === 'stackblitz-error') {
    isLoading.value = false
    hasError.value = true
    errorMessage.value = event.data.message || 'StackBlitz项目加载失败'
  }
}

// 添加超时检查
let loadTimeout: number

const checkLoadTimeout = () => {
  loadTimeout = window.setTimeout(() => {
    if (!iframeLoaded.value && !hasError.value) {
      hasError.value = true
      errorMessage.value = '加载超时，请检查网络连接或在新标签页中打开'
      isLoading.value = false
    }
  }, 15000) // 15秒超时
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
  checkLoadTimeout()
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
  if (loadTimeout) {
    clearTimeout(loadTimeout)
  }
})

// 暴露方法给父组件
defineExpose({
  reloadIframe,
  getIframeElement: () => iframeRef.value
})
</script>

<style scoped>
.code-view-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: v-bind(height);
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.code-view-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0 16px;
  position: relative;
  flex-shrink: 0;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: white;
  text-align: center;
  line-height: 1.2;
}

/* 加载指示器 */
.loading-indicator {
  display: flex;
  gap: 4px;
}

.loading-dot {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  animation: pulse 1.4s ease-in-out infinite;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 60%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  30% {
    transform: scale(1);
    opacity: 1;
  }
}

/* iframe容器 */
.iframe-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 0;
  background: #f5f5f5;
}

.stackblitz-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

/* 错误容器 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px 20px;
  text-align: center;
  background: #fefefe;
}

.error-icon {
  margin-bottom: 20px;
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}

.error-title {
  margin: 0 0 12px 0;
  color: #f44336;
  font-size: 18px;
  font-weight: 600;
}

.error-message {
  margin: 0 0 24px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  max-width: 400px;
}

.error-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  border: none;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.action-btn.secondary {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.action-btn.secondary:hover {
  background: #e5e5e5;
  transform: translateY(-2px);
}

.error-tip {
  margin: 0;
  color: #999;
  font-size: 12px;
  font-style: italic;
  max-width: 400px;
}

/* 加载遮罩 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(245, 245, 245, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-overlay p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .code-view-box {
    height: 500px;
    border-radius: 6px;
  }
  
  .code-view-header {
    height: 44px;
    padding: 0 12px;
  }
  
  .title {
    font-size: 14px;
  }
  
  .error-actions {
    flex-direction: column;
    width: 100%;
    max-width: 200px;
  }
  
  .action-btn {
    width: 100%;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .code-view-box {
    background: #1e1e1e;
    border-color: #333;
  }
  
  .code-view-header {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  }
  
  .iframe-container {
    background: #1a1a1a;
  }
  
  .error-container {
    background: #2d2d2d;
  }
  
  .error-title {
    color: #ff6b6b;
  }
  
  .error-message {
    color: #bbb;
  }
  
  .error-tip {
    color: #888;
  }
  
  .action-btn.secondary {
    background: #3a3a3a;
    color: #ddd;
    border-color: #555;
  }
  
  .action-btn.secondary:hover {
    background: #444;
  }
  
  .loading-overlay {
    background: rgba(26, 26, 26, 0.95);
  }
  
  .loading-overlay p {
    color: #aaa;
  }
}
</style>