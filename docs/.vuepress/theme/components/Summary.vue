<!-- components/AISummary.vue -->
<template>
  <div class="ai-summary-wrap">
    <button 
      @click="handleSummarize" 
      :disabled="loading"
      class="ai-summary-btn"
      :class="{ loading }"
    >
      <span v-if="loading" class="ai-spinner"></span>
      <span v-else class="ai-icon">✨</span>
      {{ loading ? 'AI 总结中...' : 'AI 总结' }}
    </button>

    <Transition name="fade">
      <div v-if="summary || error" class="ai-summary-result">
        <div v-if="summary" class="ai-summary-content">
          <div class="ai-summary-header">
            <span class="ai-label">AI 总结</span>
            <button @click="copySummary" class="ai-copy-btn" title="复制">
              📋
            </button>
          </div>
          <div class="ai-summary-text">{{ summary }}</div>
        </div>
        
        <div v-if="error" class="ai-summary-error">
          <span class="ai-error-icon">⚠️</span>
          {{ error }}
          <button @click="handleSummarize" class="ai-retry-btn">重试</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const summary = ref('')
const error = ref('')

// 从 DOM 获取内容
const getPageContent = () => {
  // 获取标题
  const titleEl = document.querySelector('.page-title')
  const title = titleEl?.textContent?.trim() || document.title || '无标题'

  console.log('标题:', title)

  // 获取正文内容（vp-doc 是 VuePress 默认的文章内容容器）
  const contentEl = document.querySelector('.vp-doc')

  console.log('正文内容:', contentEl)
  
  if (!contentEl) {
    throw new Error('未找到文章内容')
  }

  // 提取纯文本，去掉代码块等
  const clone = contentEl.cloneNode(true)
  
  // 移除不需要的元素
  const removeSelectors = [
    'pre',           // 代码块
    'code',          // 行内代码（可选，保留用于技术文章）
    '.line-numbers', // 行号
    'table',         // 表格（可选）
    '.demo-wrapper', // VuePress 示例块
    'style',         // 内联样式
    'script'         // 脚本
  ]
  
  removeSelectors.forEach(sel => {
    clone.querySelectorAll(sel).forEach(el => el.remove())
  })

  // 获取文本并清理
  let content = clone.textContent || ''
  
  // 压缩空白字符
  content = content
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim()
  
  // 限制长度（DeepSeek 有上下文限制，这里留足余地）
  const maxChars = 6000
  if (content.length > maxChars) {
    content = content.slice(0, maxChars) + '...'
  }

  return { title, content }
}

const handleSummarize = async () => {
  loading.value = true
  error.value = ''
  summary.value = ''

  try {
    const { title, content } = getPageContent()

    if (!content || content.length < 50) {
      throw new Error('文章内容太短，无法总结')
    }

    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || data.error || '请求失败')
    }

    summary.value = data.summary

  } catch (err) {
    console.error('总结失败:', err)
    error.value = err.message || '生成总结失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

const copySummary = async () => {
  try {
    await navigator.clipboard.writeText(summary.value)
    alert('已复制到剪贴板')
  } catch {
    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = summary.value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('已复制到剪贴板')
  }
}
</script>

<style scoped>
.ai-summary-wrap {
  margin: 16px 0;
}

.ai-summary-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.ai-summary-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.ai-summary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.ai-summary-btn.loading {
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
}

.ai-icon {
  font-size: 16px;
}

.ai-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ai-summary-result {
  margin-top: 16px;
}

.ai-summary-content {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  position: relative;
}

.ai-summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.ai-label {
  font-size: 13px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ai-copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.ai-copy-btn:hover {
  background: #e2e8f0;
}

.ai-summary-text {
  font-size: 15px;
  line-height: 1.8;
  color: #334155;
  white-space: pre-wrap;
}

.ai-summary-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
}

.ai-error-icon {
  font-size: 16px;
}

.ai-retry-btn {
  margin-left: auto;
  padding: 4px 12px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.ai-retry-btn:hover {
  background: #b91c1c;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>