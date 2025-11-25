<template>
  <div class="music-widget-container" :class="{ 'expanded': isExpanded, 'collapsed': !isExpanded }"
    :style="{ left: position.left + 'px', top: position.top + 'px' }" @mouseenter="expandWidget"
    @mouseleave="scheduleCollapse" ref="widgetRef">
    <!-- 封面部分 -->
    <div class="album-cover" @mousedown="startDrag">
      <img v-if="currentTrack.cover" :src="currentTrack.cover" alt="Album Cover" />
      <div v-else class="default-cover">🎵</div>
    </div>

    <!-- 控制部分 -->
    <div class="controls">
      <!-- 歌曲信息 -->
      <div class="track-info">
        <div class="track-title">{{ currentTrack.title }}</div>
        <div class="track-artist">{{ currentTrack.artist }}</div>
      </div>

      <!-- 进度条 -->
      <div class="progress-container">
        <span class="time">{{ formatTime(currentProgress) }}</span>
        <div class="progress-bar" @click="seekTo" ref="progressBarRef">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <span class="time">{{ formatTime(currentTrack.duration) }}</span>
      </div>

      <!-- 控制按钮 -->
      <div class="control-buttons">
        <button class="control-btn" @click="prevTrack">⏮</button>
        <button class="control-btn play-pause" @click="togglePlay">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="control-btn" @click="nextTrack">⏭</button>
      </div>

      <!-- 音量控制 -->
      <div class="volume-control">
        <span>🔊</span>
        <input type="range" min="0" max="100" v-model="volume" @input="setVolume" class="volume-slider" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 状态管理
const isExpanded = ref(false)
const isPlaying = ref(false)
const volume = ref(80)
const currentProgress = ref(0)
const progressPercent = ref(0)

// 拖拽相关
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })
const position = reactive({ left: 20, top: window.innerHeight / 2 })
const widgetRef = ref<HTMLElement | null>(null)

// 定时器
let collapseTimer: NodeJS.Timeout | null = null

// 音乐数据
const tracks = ref<any[]>([])
const currentTrackIndex = ref(0)
const currentTrack = ref({
  title: '',
  artist: '',
  url: '',
  cover: '',
  duration: 0
})

// 格式化时间
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// 展开控件
const expandWidget = () => {
  isExpanded.value = true
  if (collapseTimer) {
    clearTimeout(collapseTimer)
    collapseTimer = null
  }
}

// 设置收起定时器
const scheduleCollapse = () => {
  if (collapseTimer) {
    clearTimeout(collapseTimer)
  }
  collapseTimer = setTimeout(() => {
    isExpanded.value = false
  }, 5000)
}

// 切换播放状态
const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

// 上一首
const prevTrack = () => {
  if (tracks.value.length === 0) return
  currentTrackIndex.value = (currentTrackIndex.value - 1 + tracks.value.length) % tracks.value.length
  currentTrack.value = tracks.value[currentTrackIndex.value]
  currentProgress.value = 0
  progressPercent.value = 0
}

// 下一首
const nextTrack = () => {
  if (tracks.value.length === 0) return
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.value.length
  currentTrack.value = tracks.value[currentTrackIndex.value]
  currentProgress.value = 0
  progressPercent.value = 0
}

// 设置音量
const setVolume = () => {
  // 实际项目中这里会调用音频API设置音量
  console.log('Setting volume to:', volume.value)
}

// 跳转到指定位置
const seekTo = (event: MouseEvent) => {
  if (!widgetRef.value || tracks.value.length === 0) return
  const progressBar = widgetRef.value.querySelector('.progress-bar') as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  currentProgress.value = percent * currentTrack.value.duration
  progressPercent.value = percent * 100
}

// 开始拖拽
const startDrag = (event: MouseEvent) => {
  isDragging.value = true
  dragStart.x = event.clientX - position.left
  dragStart.y = event.clientY - position.top
  expandWidget()

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

// 拖拽中
const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return

  position.left = event.clientX - dragStart.x
  position.top = event.clientY - dragStart.y
}

// 停止拖拽
const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)

  // 吸附到边缘
  if (widgetRef.value) {
    const widgetWidth = widgetRef.value.offsetWidth
    const screenWidth = window.innerWidth

    // 如果离左边缘更近，吸附到左边缘；否则吸附到右边缘
    if (position.left < screenWidth - position.left - widgetWidth) {
      position.left = 0 // 左边缘
    } else {
      position.left = screenWidth - widgetWidth// 右边缘
    }

    // 垂直方向限制在屏幕内
    const widgetHeight = widgetRef.value.offsetHeight
    if (position.top < 0) position.top = 0
    if (position.top > window.innerHeight - widgetHeight) {
      position.top = window.innerHeight - widgetHeight
    }
  }
}

// 模拟播放进度
let progressInterval: NodeJS.Timeout | null = null

const startProgress = () => {
  if (progressInterval) clearInterval(progressInterval)
  
  progressInterval = setInterval(() => {
    if (isPlaying.value && tracks.value.length > 0) {
      currentProgress.value += 1
      progressPercent.value = (currentProgress.value / currentTrack.value.duration) * 100
      
      // 播放完毕自动下一首
      if (currentProgress.value >= currentTrack.value.duration) {
        nextTrack()
      }
    }
  }, 1000)
}

import MUSICS from './musics'

// 加载音乐列表
const loadMusicList = () => {
  // 从导入的文件加载音乐列表
  if (MUSICS && MUSICS.length > 0) {
    tracks.value = MUSICS
    currentTrack.value = tracks.value[0]
  } else {
    // 如果没有找到音乐列表，使用默认数据
    tracks.value = [
      {
        title: '默认歌曲',
        artist: '未知艺术家',
        url: '',
        cover: '',
        duration: 180
      }
    ]
    currentTrack.value = tracks.value[0]
  }
}

// 组件挂载
onMounted(() => {
  // 加载音乐列表
  loadMusicList()

  // 初始化位置居中
  if (widgetRef.value) {
    position.top = (window.innerHeight - widgetRef.value.offsetHeight) / 2
  }

  // 开始模拟进度更新
  startProgress()

  // 添加窗口大小变化监听
  window.addEventListener('resize', () => {
    if (widgetRef.value) {
      // 确保挂件不会超出屏幕边界
      const widgetWidth = widgetRef.value.offsetWidth
      const widgetHeight = widgetRef.value.offsetHeight

      if (position.left < 0) position.left = 0
      if (position.left > window.innerWidth - widgetWidth) {
        position.left = window.innerWidth - widgetWidth
      }

      if (position.top < 0) position.top = 0
      if (position.top > window.innerHeight - widgetHeight) {
        position.top = window.innerHeight - widgetHeight
      }
    }
  })
})

// 组件卸载
onUnmounted(() => {
  if (collapseTimer) clearTimeout(collapseTimer)
  if (progressInterval) clearInterval(progressInterval)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style scoped>
.music-widget-container {
  position: fixed;
  z-index: 999999;
  display: flex;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  min-height: 60px;
  overflow: hidden;
  user-select: none;
}

.music-widget-container.expanded {
  width: 350px;
  padding: 15px;
}

.music-widget-container.collapsed {
  width: 70px;
  padding: 5px;
}

.album-cover {
  width: 50px;
  height: 50px;
  min-width: 50px;
  border-radius: 8px;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  font-size: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.album-cover img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.music-widget-container.collapsed .controls {
  opacity: 0;
  pointer-events: none;
}

.track-info {
  margin-bottom: 10px;
  color: white;
  overflow: hidden;
}

.track-title {
  font-weight: bold;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.track-artist {
  font-size: 14px;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 8px;
}

.time {
  font-size: 12px;
  color: #aaa;
  min-width: 35px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #444;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: #2575fc;
  border-radius: 3px;
  width: 0%;
}

.control-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
}

.control-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.play-pause {
  font-size: 20px;
  width: 45px;
  height: 45px;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
}

.volume-slider {
  flex: 1;
  height: 5px;
  background: #444;
  border-radius: 3px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .music-widget-container.expanded {
    width: 300px;
    padding: 12px;
  }

  .control-buttons {
    gap: 10px;
  }

  .control-btn {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .play-pause {
    width: 40px;
    height: 40px;
  }
}
</style>