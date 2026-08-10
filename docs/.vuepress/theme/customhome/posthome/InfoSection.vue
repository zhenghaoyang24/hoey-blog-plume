<template>
  <div ref="el" class="info-section" :class="{ 'is-revealed': visible }">
    <h1 class="info-slogan">老师，<br /><span class="info-slogan-hl">我太想进步了。</span></h1>
    <p class="info-echo">Teacher, I'm on fire to improve.</p>
    <div class="info-sign">
      <span class="info-sign-line"></span>
      <HoeyIcon :color="'var(--ph-accent)'" :size="3" />
    </div>
    <p
      ref="descRef"
      class="info-description"
      :class="{ 'info-type-active': typingActive }"
      :aria-label="TYPE_ZH"
    >
      <span class="info-type-text" aria-hidden="true">{{ typeText }}</span
      ><span class="info-caret" aria-hidden="true"></span>
    </p>
    <div class="social-link-content">
      <a
        v-for="link in SOCIAL_LINKS"
        :key="link.id"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="link.name"
      >
        <icon :name="link.icon" size="1.3em" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useReveal } from "./composables/useReveal";
import HoeyIcon from "./components/HoeyIcon.vue";

const SOCIAL_LINKS = [
  { id: 1, name: "github", url: "https://github.com/zhenghaoyang24", icon: "mdi:github" },
  { id: 2, name: "email", url: "mailto:zhenghaoyang24@foxmail.com", icon: "ic:round-email" },
];

// ==================== 打字机效果 ====================
const TYPE_ZH =
  "我是 Hoey，一名爱折腾的 Coder。上班写代码，下班打游戏、看电影、听音乐。在这里写写开发相关的东西，偶尔也分享一些有意思的。感谢来访，欢迎常来。";
const TYPE_EN =
  "I'm Hoey, a Coder who loves tinkering. I write code at work; off the clock, it's games, movies, and music. I blog about dev stuff, plus some fun now and then. Thanks for stopping by, come back anytime!";

const typeText = ref("");
const typingActive = ref(false);
const descRef = ref<HTMLElement | null>(null);
let cancelled = false;

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

async function typeChars(text: string, step: number) {
  for (let i = 1; i <= text.length; i++) {
    if (cancelled) return;
    typeText.value = text.slice(0, i);
    await sleep(step);
  }
}

async function eraseChars() {
  while (typeText.value.length > 0) {
    if (cancelled) return;
    typeText.value = typeText.value.slice(0, -1);
    await sleep(12);
  }
}

// 用隐藏克隆测量英文完整高度，作为段落最小高度，避免打字过程中下方布局跳动
function measureEnHeight(): number {
  const el = descRef.value;
  if (!el?.parentElement) return 0;
  const clone = el.cloneNode(false) as HTMLElement;
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.pointerEvents = "none";
  clone.textContent = TYPE_EN;
  el.parentElement.appendChild(clone);
  const height = clone.offsetHeight;
  clone.remove();
  return height;
}

function reserveHeight() {
  const el = descRef.value;
  if (!el) return;
  const height = measureEnHeight();
  if (height > 0) el.style.minHeight = height + "px";
}

// 兜底：英文打完后再校准一次最小高度（字体加载完成后高度可能变化）
function calibrateHeight() {
  const el = descRef.value;
  if (!el) return;
  const current = parseFloat(el.style.minHeight) || 0;
  if (el.scrollHeight > current) el.style.minHeight = el.scrollHeight + "px";
}

async function runTypewriter() {
  const texts = [TYPE_ZH, TYPE_EN];
  let index = 1; // 页面初始从空开始，先打英文
  for (;;) {
    if (cancelled) return;
    await eraseChars();
    if (cancelled) return;
    await typeChars(texts[index], 35);
    if (cancelled) return;
    calibrateHeight();
    await sleep(2200);
    index = (index + 1) % texts.length;
  }
}

const { el, visible } = useReveal();

onMounted(() => {
  // 尊重系统"减少动态效果"设置：直接显示完整中文
  if (!("matchMedia" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typeText.value = TYPE_ZH;
    return;
  }
  reserveHeight();
  window.addEventListener("resize", reserveHeight);
  // 等 hero 入场动画将段落显示出来再开始从空打字
  window.setTimeout(() => {
    if (cancelled) return;
    typingActive.value = true;
    void runTypewriter();
  }, 600);
});

onBeforeUnmount(() => {
  cancelled = true;
  window.removeEventListener("resize", reserveHeight);
});
</script>

<style scoped>
.info-section {
  width: 100%;
  box-sizing: border-box;
  padding-top: 14px;
  > * {
    transition:
      opacity 0.55s ease,
      transform 0.55s ease;
  }
  &:not(.is-revealed) > * {
    opacity: 0;
    transform: translateY(16px);
  }
  &.is-revealed {
    > *:nth-child(1) {
      transition-delay: 0s;
    }
    > *:nth-child(2) {
      transition-delay: 0.06s;
    }
    > *:nth-child(3) {
      transition-delay: 0.12s;
    }
    > *:nth-child(4) {
      transition-delay: 0.18s;
    }
    > *:nth-child(5) {
      transition-delay: 0.24s;
    }
    > *:nth-child(6) {
      transition-delay: 0.3s;
    }
  }
}

.info-sign {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin: 26px 0 0;
}

.info-sign-line {
  flex-shrink: 0;
  width: 40px;
  height: 2px;
  border-radius: 1px;
  background: var(--ph-accent);
}

.info-slogan {
  margin: 8px 0 0;
  font-family: var(--ph-font-kai);
  font-weight: 700;
  font-size: clamp(2.5rem, 7vw, 4.1rem);
  line-height: 1.35;
  color: var(--vp-c-text-1);
}

.info-slogan-hl {
  color: var(--ph-accent);
}

.info-echo {
  margin: 10px 0 0;
  font-family: var(--ph-font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.02em;
  color: var(--vp-c-text-2);
}

.info-description {
  margin: 18px 0 0;
  width: 100%;
  font-size: 1.05rem;
  line-height: 1.9;
  color: var(--vp-c-text-1);
  @media (max-width: 770px) {
    font-size: 0.95rem;
  }
}

.info-caret {
  display: none;
  width: 0.45em;
  height: 1.05em;
  margin-left: 3px;
  vertical-align: text-bottom;
  border-radius: 1px;
  background: var(--ph-accent);
}

.info-type-active .info-caret {
  display: inline-block;
  animation: info-caret-blink 1s steps(1) infinite;
}

@keyframes info-caret-blink {
  0%,
  55% {
    opacity: 1;
  }
  56%,
  100% {
    opacity: 0;
  }
}

.social-link-content {
  display: flex;
  gap: 10px;
  margin-top: 22px;
  > a {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    border: 1px solid var(--ph-hairline);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--vp-c-text-2);
    transition:
      color 0.25s ease,
      border-color 0.25s ease,
      transform 0.25s ease;
    &:hover {
      color: var(--ph-accent);
      border-color: var(--ph-accent);
      transform: translateY(-2px);
    }
    &:focus-visible {
      outline: 2px solid var(--ph-accent);
      outline-offset: 2px;
    }
  }
}
</style>
