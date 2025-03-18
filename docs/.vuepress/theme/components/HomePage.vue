<template>
  <div class="container">
    <canvas ref="canvasRef"></canvas>
    <h1 class="title">老师我太想进步了。</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

  // 鼠标移动监听
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX.value = e.clientX - rect.left
    mouseY.value = e.clientY - rect.top
  })

  canvas.addEventListener('mouseleave', () => {
    mouseX.value = -1
    mouseY.value = -1
  })
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

// 保持原有彗星相关函数不变
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
    gradient.addColorStop(0.4, '#5086a1')
    gradient.addColorStop(1, 'rgba(80, 134, 161, 0)')

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
    gradient.addColorStop(0.4, '#5086a1')
    gradient.addColorStop(1, 'rgba(80, 134, 161, 0)')

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
  setInterval(createComet, 1500)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.container {
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none; /* 允许鼠标事件穿透 */
}

.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4em;
  font-weight: 900;
  line-height: 1.25;
  background: var(--vp-bg-home-hero-name, linear-gradient(315deg, var(--vp-c-purple-1) 15%, var(--vp-c-brand-2) 65%, var(--vp-c-brand-2) 100%));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.7); }
  50% { text-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 50px rgba(255, 255, 255, 0.7); }
}
</style>
