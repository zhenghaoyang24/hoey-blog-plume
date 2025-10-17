<template>
  <div class="grid-home-container">
    <canvas ref="canvasRef"></canvas>
    <div class="head-social">
      <a href="https://github.com/zhenghaoyang24" target="_blank" class="head-social-btn">
        <icon name="grommet-icons:github" />
      </a>
      <a href="https://gitee.com/zhenghaoyang24" target="_blank" class="head-social-btn">
        <icon name="simple-icons:gitee" />
      </a>
      <router-link to="/blog/" class="head-social-avatar"><img src="/avatar.jpg" alt="avatar"></router-link>
      <a href="https://codepen.io/zhenghaoyang24" target="_blank" class="head-social-btn">
        <icon class="head-social-btn" name="simple-icons:codepen"></icon>
      </a>
      <a href="mailto:zhenghaoyang24@foxmail.com" target="_blank" class="head-social-btn">
        <icon class="head-social-btn" name="streamline-flex:mail-send-email-message-circle-solid"></icon>
      </a>
    </div>
    <div class="about-me">
      <div class="card-content grid-row-3-2">
        <AboutMeName />
        <AboutMeText>
          <template #motto>
            <slot name="motto">
              <p class="about-me-card-title-normal">座右铭</p>
              <p class="about-me-card-text-big">老师，</p>
              <p class="about-me-card-text-big about-me-card-text-color">我太想进步了。</p>
            </slot>
          </template>
        </AboutMeText>
      </div>
      <div class="card-content grid-row-3-2">
        <AboutMeSkill />
        <AboutMeLife />
      </div>
      <div class="card-content grid-row-1-1">
        <AboutMeText>
          <template #motto>
            <slot name="motto">
              <p class="about-me-card-title-normal">追求</p>
              <p class="about-me-card-text-big about-me-card-text-soft">用心去<span style="color: #3a5ccc">感受</span>
              </p>
              <p class="about-me-card-text-big">用热爱去<span style="color: #d53737">创造</span></p>
            </slot>
          </template>
        </AboutMeText>
        <AboutMeCharacter />
      </div>
      <div class="card-content grid-row-1">
        <AboutMeFriendLink />
      </div>
    </div>
  </div>
</template>

<style>
/*颜色*/
:root {
  /*卡片背景*/
  --main-card-background: rgba(255, 255, 255, 0.7);
  /*卡片边框*/
  --main-card-border: #e3e8f7;
  /*卡片阴影*/
  --main-border-shadow: #1a1a1a15;
  /*卡片 hover */
  --about-card-hover-bg: rgba(100, 190, 190, 0.8);
  /*按钮 背景*/
  --home-action-bnt-bg:rgb(235, 235, 239);
  /*语言 span 背景*/
  --about-me-skill-item-bg: #f4f2ed;
  /* ai 摘要 */
  --ai-summary-shadow-color: rgba(109, 196, 196, 0.35);
  /* 头像阴影 */
  --avatartar-shadow-color: rgb(70, 70, 70);
}
[data-theme="dark"] {
  --main-card-background: rgba(27, 28, 32, 0.7);
  --main-card-border: #3d3d3f;
  --main-border-shadow: #6d6d6d1e;
  --about-card-hover-bg: rgba(100, 190, 190, 0.8);
  --home-action-bnt-bg:rgb(50, 54, 63);
  --about-me-skill-item-bg: #15191c;
  --ai-summary-shadow-color: rgba(100, 190, 190, 0.2);
  --avatartar-shadow-color: rgb(0, 0, 0);
}

/*卡片背景*/
.about-me-card-bg{
  padding: 1rem;
  border-radius: 12px;
  background-color: var(--main-card-background);
  border: 1px solid var(--main-card-border);
  box-shadow: 0 0 7px 2px var(--main-border-shadow);
  overflow: hidden;
}

/*卡片文字 小号*/
.about-me-card-title-normal{
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin-bottom: 10px;
}

/*卡片文字 大号*/
.about-me-card-text-big{
  color: var(--vp-c-text-1);
  margin: 10px 0;
  font-size: 36px;
  font-weight: 700;
  line-height: 1.1;
  @media screen and (max-width: 770px) {
    font-size: 24px;
    margin: 7px 0;
  }
}

/*卡片文字 暗色*/
.about-me-card-text-soft{
  color: var(--vp-c-text-2);
}

/*卡片文字 彩色*/
.about-me-card-text-color{
  background: var(--vp-bg-home-hero-name, linear-gradient(315deg, var(--vp-c-purple-1) 10%, var(--vp-c-brand-2) 75%, var(--vp-c-brand-2) 100%));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}


.grid-home-container {
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

canvas {
  z-index: -1;
  position: fixed;
  top: -1px;
  left: -1px;
  pointer-events: none;
  /* 允许鼠标事件穿透 */
  overflow: hidden;
}

.head-social {
  display: flex;
  width: fit-content;
  margin: 0 auto;
  align-items: center;

  .head-social-avatar {
    margin: 20px;
    border-radius: 30%;
    overflow: hidden;
    width: 60px;
    transition: all 0.2s;
    box-shadow: 0 4px 6px var(--avatartar-shadow-color, rgba(0, 0, 0, 0.1));

    /* 更柔和的阴影 */
    &:hover {
      transform: translateY(-2px);
      /* 轻微上浮效果替代缩放 */
      box-shadow: 0 6px 12px var(--avatartar-shadow-color, rgba(0, 0, 0, 0.2));
      /* 悬停时阴影扩散 */
    }
  }

  .head-social-btn {
    cursor: pointer;
    font-size: 30px;
    margin: 0px;
    transition: transform 0.2s, color 0.3s;
    color: var(--vp-c-text-2);

    &:hover {
      color: var(--vp-c-brand-1);
      transform: scale(1.2);
    }
  }
}

.about-me {
  max-width: 1380px;
  margin: 0 auto;
  width: 90%;

  @media screen and (max-width: 770px) {
    width: 94%;
  }
}

.card-content {
  margin-top: 20px;
  display: grid;
  gap: 20px;

  @media screen and (max-width: 770px) {
    display: flex;
    flex-direction: column;
  }
}

.grid-row-3-2 {
  grid-template-columns: 3fr 2fr;
}

.grid-row-1-1 {
  grid-template-columns: 1fr 1fr;
}

.grid-row-1 {
  grid-template-columns: 1fr;
}
</style>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AboutMeName from "./AboutMeName.vue";
import AboutMeText from "./AboutMeText.vue";
import AboutMeSkill from "./AboutMeSkill.vue";
import AboutMeCharacter from "./AboutMeCharacter.vue";
import AboutMeLife from "./AboutMeLife.vue";
import AboutMeFriendLink from "./AboutMeFriendLink.vue";

interface Comet {
  direction: 'horizontal' | 'vertical'
  position: number
  progress: number
  speed: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const linesGap = 80
const comets = ref<Comet[]>([])
const mouseX = ref(-1)
const mouseY = ref(-1)
let animationFrameId: number

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx.value = canvas.getContext('2d')
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas || !ctx.value) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const drawGrid = () => {
  const canvas = canvasRef.value
  const context = ctx.value
  if (!canvas || !context) return

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.lineWidth = 1

  // 绘制带渐变效果的网格
  const radius = 100 // 颜色影响半径
  const hasMouse = mouseX.value >= 0 && mouseY.value >= 0

  // 水平线
  for (let y = 0; y < canvas.height; y += linesGap) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(canvas.width, y)

    let alpha = 0.1
    if (hasMouse) {
      const dy = Math.abs(y - mouseY.value)
      if (dy < radius) {
        alpha = 0.1 + (1 - dy / radius) * 0.9
      }
    }
    context.strokeStyle = `rgba(80, 134, 161, ${alpha})`
    context.stroke()
  }

  // 垂直线
  for (let x = 0; x < canvas.width; x += linesGap) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, canvas.height)

    let alpha = 0.1
    if (hasMouse) {
      const dx = Math.abs(x - mouseX.value)
      if (dx < radius) {
        alpha = 0.1 + (1 - dx / radius) * 0.9
      }
    }
    context.strokeStyle = `rgba(80, 134, 161, ${alpha})`
    context.stroke()
  }
}

// 彗星函数
const createComet = () => {
  const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical'
  const maxPosition = direction === 'horizontal'
    ? Math.floor(window.innerHeight / linesGap)
    : Math.floor(window.innerWidth / linesGap)

  const position = Math.floor(Math.random() * maxPosition) * linesGap

  comets.value.push({
    direction,
    position,
    progress: 0,
    speed: Math.random() * 0.005 + 0.002,
  })
}

const drawComet = (comet: Comet) => {
  const context = ctx.value
  const canvas = canvasRef.value
  if (!context || !canvas) return

  const length = 80
  const { direction, position, progress } = comet

  if (direction === 'horizontal') {
    const x = progress * canvas.width
    const y = position

    const gradient = context.createLinearGradient(x - length, y, x, y)
    gradient.addColorStop(0, 'rgba(80, 134, 161, 0)')
    gradient.addColorStop(0.4, 'rgba(80,134,161,0.3)')
    gradient.addColorStop(1, '#4483a2')

    context.strokeStyle = gradient
    context.beginPath()
    context.moveTo(x - length, y)
    context.lineTo(x, y)
    context.stroke()
  } else {
    const x = position
    const y = progress * canvas.height

    const gradient = context.createLinearGradient(x, y - length, x, y)
    gradient.addColorStop(0, 'rgba(80, 134, 161, 0)')
    gradient.addColorStop(0.4, 'rgba(80,134,161,0.3)')
    gradient.addColorStop(1, '#4483a2')

    context.strokeStyle = gradient
    context.beginPath()
    context.moveTo(x, y - length)
    context.lineTo(x, y)
    context.stroke()
  }
}

const animate = () => {
  const canvas = canvasRef.value
  const context = ctx.value
  if (!canvas || !context) return

  context.clearRect(0, 0, canvas.width, canvas.height)
  drawGrid()

  comets.value = comets.value.filter(comet => {
    comet.progress += comet.speed
    drawComet(comet)
    return comet.progress < 1.2
  })

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  initCanvas()
  animate()
  setInterval(createComet, 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(animationFrameId)
})
</script>
