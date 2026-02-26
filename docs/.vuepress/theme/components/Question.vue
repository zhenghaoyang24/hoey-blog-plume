<template>
  <div class="q-container">
    <div class="q-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
        <g fill="var(--vp-c-text-2)">
          <path
            d="M15.999 1C11.095 1 7.313 2.654 4.763 5.423C2.226 8.178 1 11.938 1 15.999c0 2.77.57 5.4 1.738 7.666a5.5 5.5 0 0 1 1.388-1.75C3.381 20.16 3 18.154 3 16c0-3.67 1.106-6.91 3.235-9.221C8.35 4.48 11.568 3 15.999 3s7.648 1.48 9.764 3.778c2.129 2.311 3.235 5.55 3.235 9.22s-1.106 6.91-3.235 9.222c-2.116 2.298-5.333 3.778-9.764 3.778q-.474 0-.93-.023a2 2 0 0 1-.166.137a2.24 2.24 0 0 1-.246 1.843q.656.042 1.342.043c4.904 0 8.686-1.654 11.235-4.423c2.537-2.755 3.764-6.515 3.764-10.576S29.77 8.178 27.234 5.423C24.684 2.654 20.903 1 16 1"
          />
          <path
            d="M13.389 30.83a1.235 1.235 0 0 0-.072-2.172L13 28.5h.72a1 1 0 0 0 .97-.758l.067-.272A.78.78 0 0 0 14 26.5l.33-.165a1.214 1.214 0 0 0 0-2.17L14 24h1.75a1.25 1.25 0 1 0 0-2.5H10v-3.06A1.44 1.44 0 0 0 8.56 17c-.84 0-1.505.718-1.517 1.559C7.023 19.92 6.835 21.722 6 22c-3 1-4 5.5-1.5 7.5c1.89 1.513 3.781 1.506 5.25 1.5h3.014c.228 0 .441-.062.625-.17M8.146 6.146C8.543 5.75 9.63 5 11 5s2.457.75 2.854 1.146a.5.5 0 0 1-.708.708C12.876 6.584 12.03 6 11 6s-1.877.584-2.146.854a.5.5 0 1 1-.708-.708m10.034 1.97C18.65 7.724 19.92 7 21.5 7s2.85.724 3.32 1.116a.5.5 0 0 1-.64.768C23.85 8.61 22.8 8 21.5 8s-2.35.61-2.68.884a.5.5 0 0 1-.64-.768M10 14.5a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
          />
          <path
            d="M24 11.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m-10.293 8.207a2.73 2.73 0 0 1 2.374-.721c1.221.208 1.731.83 2.012 1.435a1 1 0 0 0 1.814-.842c-.515-1.108-1.526-2.23-3.488-2.565a4.73 4.73 0 0 0-4.126 1.279a1 1 0 0 0 1.414 1.414"
          />
        </g>
      </svg>
      <p>{{ title }}</p>
    </div>
    <div class="q-content">
      <ol>
        <li v-for="value in formattedQuestions">
          <span></span>
          <p v-html="value"></p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title?: string;
  questions: string[];
}
const props = withDefaults(defineProps<Props>(), { title: "思考" });

/**
 * 转义HTML特殊字符
 */
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * 将 `内容` 转换为 <code>内容</code>
 * 将 **内容** 转换为 <strong>内容</strong>
 */
const formatText = (text: string): string => {
  // 1. 先转义HTML特殊字符
  const escaped = escapeHtml(text);
  
  // 2. 替换 `内容` 为 <code>内容</code>
  //    注意：反引号在正则中需要转义
  const withCode = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // 3. 替换 **内容** 为 <strong>内容</strong>
  const withBold = withCode.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  return withBold;
};

const formattedQuestions = computed(() => {
  return props.questions.map(q => formatText(q));
});
</script>

<style scoped>
.q-container {
  border-radius: 30px;
  width: 100%;
  padding: 20px;
  background-color: var(--vp-c-brand-soft);
  border: 1px var(--vp-c-brand-3) solid;
}
.q-title {
  display: flex;
  align-items: center;
  font-size: 0.8em;
  gap: 6px;
  > p {
    margin: 0;
    color: var(--vp-c-text-2);
  }
}
.q-content {
  ol {
    margin: 10px 0 0 0;
    padding: 0;
    li {
      display: flex;
      align-items: center;
      list-style-type: none;
      gap: 10px;
      > span {
        transition: all 0.3s ease;
        width: 4px;
        border-radius: 2px;
        height: 1.3em;
        background-color: var(--vp-c-brand-1);
      }
      > p {
        font-size: 0.9em;
        margin: 0;
      }
      &:hover{
        > span {
         width: 8px;
        }
      }
    }
  }
}
</style>
