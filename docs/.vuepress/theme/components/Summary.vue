<!-- components/AISummary.vue -->
<template>
  <div class="ai-card" :class="{ 'ai-card--active': summary || loading }">
    <!-- 左上角小标题 -->
    <div class="ai-card__header">
      <div class="ai-card__badge">
        <span class="ai-card__title">AI 总结</span>
      </div>
    </div>

    <!-- 中间内容区 -->
    <div class="ai-card__body">
      <!-- 空状态 -->
      <div v-if="!summary && !loading && !error" class="ai-card__empty">
        <div class="ai-illustration">
          <div class="ai-brain">
            <div class="brain-wave wave-1"></div>
            <div class="brain-wave wave-2"></div>
            <div class="brain-wave wave-3"></div>
          </div>
        </div>
        <p class="ai-hint">点击下方按钮，AI 将为您生成文章摘要</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading && !summary" class="ai-card__loading">
        <div class="ai-typing">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
        <p class="ai-status">正在理解文章内容...</p>
      </div>

      <!-- 内容展示（限流时也保持显示） -->
      <div v-if="summary" class="ai-card__content">
        <div class="ai-summary-text" v-html="formattedSummary"></div>
        <div v-if="streaming" class="ai-streaming-indicator">
          <span class="streaming-bar"></span>
        </div>
      </div>

      <!-- 错误提示（限流时不显示错误） -->
      <div v-if="error && !isRateLimited" class="ai-card__error">
        <span class="error-shake">⚠️</span>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- 底部按钮区 -->
    <div class="ai-card__footer">
      <!-- 限流提示文字（按钮左侧红色小字） -->
      <span v-if="isRateLimited" class="rate-limit-hint">请求过于频繁，稍后再试</span>

      <button
        @click="handleSummarize"
        :disabled="loading || isRateLimited"
        class="ai-btn"
        :class="{
          'ai-btn--loading': loading,
          'ai-btn--limited': isRateLimited,
          'ai-btn--reset': summary && !loading && !isRateLimited,
        }"
      >
        <span class="btn-glow"></span>
        <span class="btn-content">
          <span v-if="loading" class="btn-spinner"></span>
          <span v-else-if="isRateLimited" class="btn-icon">⏳</span>
          <span v-else-if="summary" class="btn-icon">🔄</span>
          <span v-else class="btn-icon">✨</span>
          <span class="btn-text">{{ buttonText }}</span>
        </span>
      </button>
    </div>

    <!-- 装饰元素 -->
    <div class="ai-card__glow"></div>
    <div class="ai-card__border"></div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";

const loading = ref(false);
const streaming = ref(false);
const summary = ref("");
const error = ref("");
const isRateLimited = ref(false);
let countdownTimer = null;

const buttonText = computed(() => {
  if (isRateLimited.value) return "请等待";
  if (loading.value) return "生成中";
  if (summary.value) return "重新生成";
  return "开始总结";
});

// 格式化总结（支持换行）
const formattedSummary = computed(() => {
  if (!summary.value) return "";
  return summary.value.replace(/\n/g, "<br>");
});

// 开始倒计时（仅用于控制限流状态，不显示）
const startCountdown = (seconds) => {
  isRateLimited.value = true;

  // 清除之前的定时器
  if (countdownTimer) clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      isRateLimited.value = false;
      error.value = "";
    }
  }, 1000);
};

// 清理
onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});

// 获取页面内容
const getPageContent = () => {
  const titleEl = document.querySelector(".page-title");
  const title = titleEl?.textContent?.trim() || document.title || "无标题";

  const contentEl = document.querySelector(".vp-doc");
  if (!contentEl) {
    throw new Error("未找到文章内容");
  }

  const clone = contentEl.cloneNode(true);
  const removeSelectors = [
    "pre",
    ".line-numbers",
    "style",
    "script",
    ".demo-wrapper",
    "blockquote",
  ];

  removeSelectors.forEach((sel) => {
    clone.querySelectorAll(sel).forEach((el) => el.remove());
  });

  let content = clone.textContent || "";
  content = content.replace(/\s+/g, " ").trim();

  const maxChars = 6000;
  if (content.length > maxChars) {
    content = content.slice(0, maxChars) + "...";
  }

  return { title, content };
};

const handleSummarize = async () => {
  if (isRateLimited.value || loading.value) return;

  loading.value = true;
  streaming.value = false;
  // 关键：不清空之前的 summary，限流时保持显示
  error.value = "";

  try {
    const { title, content } = getPageContent();

    if (!content || content.length < 50) {
      throw new Error("文章内容太短，无法总结");
    }

    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
      body: JSON.stringify({ title, content }),
    });

    // 处理限流（429）
    if (response.status === 429) {
      const data = await response.json();
      const retryAfter = data.retryAfter || 60;
      startCountdown(retryAfter);
      // 关键：不清空 summary，保持之前的内容显示
      loading.value = false;
      return; // 直接返回，不抛错误（避免显示 error 区域）
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `请求失败: ${response.status}`);
    }

    // 新请求成功，清空旧总结开始新的流式输出
    summary.value = "";

    // 读取 SSE 流
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    streaming.value = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);

          if (data === "[DONE]") {
            streaming.value = false;
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              summary.value += parsed.text;
            }
          } catch (e) {
            if (e.message !== "Stream error") {
              console.debug("Parse error:", line);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("总结失败:", err);
    // 只有非限流错误才显示错误提示
    if (!isRateLimited.value) {
      error.value = err.message || "生成失败，请稍后重试";
    }
  } finally {
    loading.value = false;
    streaming.value = false;
  }
};

const copySummary = () => {
  navigator.clipboard.writeText(summary.value).then(() => {
    // 可以添加复制成功的视觉反馈
  });
};
</script>

<style scoped>
.ai-card {
  position: relative;
  background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  padding: 10px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.ai-card--active {
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
}

/* 发光背景 */
.ai-card__glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.ai-card:hover .ai-card__glow {
  opacity: 1;
}

/* 边框动画 */
.ai-card__border {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.ai-card:hover .ai-card__border {
  opacity: 1;
}

/* 头部 */
.ai-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-bottom: 4px;
  z-index: 1;
}

.ai-card__badge {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  background: rgba(102, 126, 234, 0.15);
  border-radius: 20px;
}

.ai-card__icon {
  font-size: 14px;
  filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.8));
}

.ai-card__title {
  font-size: 12px;
  font-weight: 600;
  color: #a5b4fc;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 移除倒计时样式 */

/* 内容区 */
.ai-card__body {
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 空状态 */
.ai-card__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #64748b;
}

.ai-illustration {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-brain {
  position: relative;
  width: 60px;
  height: 60px;
}

.brain-wave {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
}

.wave-2 {
  animation-delay: 0.5s;
}

.wave-3 {
  animation-delay: 1s;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.ai-hint {
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #94a3b8;
}

/* 加载状态 */
.ai-card__loading {
  text-align: center;
}

.ai-typing {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 16px;
  height: 20px;
  align-items: center;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  animation: typing-bounce 1.4s ease-in-out infinite both;
}

.typing-dot:nth-child(1) {
  animation-delay: -0.32s;
}
.typing-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing-bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.ai-status {
  font-size: 14px;
  color: #a5b4fc;
  animation: pulse 2s infinite;
}

/* 内容展示 */
.ai-card__content {
  color: #e2e8f0;
  font-size: 14px;
  line-height: 1.8;
  max-height: 300px;
  overflow-y: auto;
  padding-inline: 8px;
}

.ai-card__content::-webkit-scrollbar {
  width: 4px;
}

.ai-card__content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.ai-card__content::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.5);
  border-radius: 2px;
}

.ai-summary-text {
  text-align: left;
}

.ai-streaming-indicator {
  margin-top: 12px;
  height: 2px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 1px;
  overflow: hidden;
}

.streaming-bar {
  display: block;
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, transparent, #667eea, transparent);
  animation: streaming 1.5s infinite;
}

@keyframes streaming {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

/* 错误提示 */
.ai-card__error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 12px;
  color: #fca5a5;
  font-size: 14px;
}

.error-shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* 移除限流提示区域样式 */

/* 底部按钮区 */
.ai-card__footer {
  padding-top: 4px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px; /* 提示文字和按钮之间的间距 */
  position: relative;
  z-index: 1;
}

/* 限流提示文字（红色小字） */
.rate-limit-hint {
  font-size: 12px;
  color: #f87171; /* 红色 */
  font-weight: 500;
  margin-right: auto; /* 靠左显示 */
  animation: pulse 2s infinite;
}

.ai-btn {
  position: relative;
  padding: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  flex-shrink: 0; /* 防止按钮被压缩 */
}

.ai-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.ai-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.ai-btn:hover:not(:disabled) .btn-glow {
  transform: translateX(100%);
}

.btn-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
}

.btn-icon {
  font-size: 16px;
}

.btn-text {
  letter-spacing: 0.5px;
}

/* 按钮状态变体 */
.ai-btn--loading {
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  box-shadow: none;
}

.ai-btn--limited {
  background: linear-gradient(135deg, #92400e 0%, #b45309 100%);
  box-shadow: 0 4px 15px rgba(180, 83, 9, 0.4);
}

.ai-btn--reset {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 响应式 */
@media (max-width: 640px) {
  .ai-card {
    padding: 6px;
    min-height: 180px;
  }

  .ai-card__content {
    max-height: 120px;
  }

  .ai-btn {
    padding: 6px;
  }

  .btn-icon {
    font-size: 14px;
  }

  .ai-card__empty {
    gap: 0px;
  }

  .rate-limit-hint {
    font-size: 11px;
  }
}
</style>
