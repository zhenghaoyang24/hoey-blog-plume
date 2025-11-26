<template>
  <div 
    ref="musicWidgetRef"
    class="music-widget"
    :class="{ 
      'collapsed': isCollapsed,
      'left': position === 'left',
      'right': position === 'right'
    }"
    :style="{ top: `${positionY}px` }"
  >
    <!-- 封面区域 -->
    <div class="cover-section" @click="toggleCollapse">
      <img 
        v-if="currentSong.cover" 
        :src="currentSong.cover" 
        :alt="currentSong.title"
        class="cover-image"
      >
      <div v-else class="cover-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
    </div>

    <!-- 信息和控制区域 -->
    <div class="info-controls">
      <div class="song-info">
        <div class="song-title">{{ currentSong.title || '未知歌曲' }}</div>
        <div class="song-artist">{{ currentSong.artist || '未知艺术家' }}</div>
      </div>

      <div class="controls">
        <button class="control-btn" @click="prevSong">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 19 2 12 11 5 11 19"></polygon>
            <polygon points="22 19 13 12 22 5 22 19"></polygon>
          </svg>
        </button>

        <button class="control-btn play-pause" @click="togglePlay">
          <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>

        <button class="control-btn" @click="nextSong">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 19 22 12 13 5 13 19"></polygon>
            <polygon points="2 19 11 12 2 5 2 19"></polygon>
          </svg>
        </button>
      </div>

      <div class="progress-volume">
        <div class="progress-container">
          <span class="time">{{ formatTime(currentTime) }}</span>
          <input 
            type="range" 
            min="0" 
            :max="duration" 
            v-model="currentTime" 
            @input="onProgressChange"
            class="progress-slider"
          >
          <span class="time">{{ formatTime(duration) }}</span>
        </div>

        <div class="volume-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            v-model="volume" 
            @input="onVolumeChange"
            class="volume-slider"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// 定义歌曲接口
interface Song {
  title: string
  artist: string
  cover?: string
  url: string
}

// 定义 props
const props = withDefaults(defineProps<{
  songs?: Song[]
  autoplay?: boolean
  defaultVolume?: number
  defaultSongIndex?: number
}>(), {
  songs: () => [],
  autoplay: false,
  defaultVolume: 0.5,
  defaultSongIndex: 0
})

// 响应式数据
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(props.defaultVolume)
const currentSongIndex = ref(0)
const isCollapsed = ref(true)
const position = ref<'left' | 'right'>('left')
const positionY = ref(100)
const audio = ref<HTMLAudioElement | null>(null)
const musicWidgetRef = ref<HTMLElement | null>(null)

// 计算属性
const currentSong = computed(() => {
  if (!props.songs.length) return { title: '', artist: '', url: '' }
  const index = currentSongIndex.value < props.songs.length ? currentSongIndex.value : 0
  return props.songs[index] || { title: '', artist: '', url: '' }
})

// 格式化时间
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// 初始化音频元素
const initAudio = () => {
  if (audio.value) {
    audio.value.pause()
  }
  
  audio.value = new Audio()
  audio.value.volume = volume.value
  
  watch(currentSong, (newSong) => {
    if (audio.value) {
      audio.value.src = newSong.url
      if (props.autoplay) {
        play()
      }
    }
  }, { immediate: true })
  
  if (audio.value) {
    audio.value.addEventListener('loadedmetadata', () => {
      duration.value = audio.value!.duration
    })
    
    audio.value.addEventListener('timeupdate', () => {
      currentTime.value = audio.value!.currentTime
    })
    
    audio.value.addEventListener('ended', () => {
      nextSong()
    })
  }
}

// 播放功能
const play = () => {
  if (audio.value && currentSong.value.url) {
    audio.value.play().then(() => {
      isPlaying.value = true
    }).catch(err => {
      console.error('播放失败:', err)
    })
  }
}

// 暂停功能
const pause = () => {
  if (audio.value) {
    audio.value.pause()
    isPlaying.value = false
  }
}

// 切换播放/暂停
const togglePlay = () => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

// 上一首
const prevSong = () => {
  if (props.songs.length <= 1) return
  currentSongIndex.value = (currentSongIndex.value - 1 + props.songs.length) % props.songs.length
  currentTime.value = 0
  if (isPlaying.value) {
    play()
  }
}

// 下一首
const nextSong = () => {
  if (props.songs.length <= 1) return
  currentSongIndex.value = (currentSongIndex.value + 1) % props.songs.length
  currentTime.value = 0
  if (isPlaying.value) {
    play()
  }
}

// 进度条变化
const onProgressChange = () => {
  if (audio.value) {
    audio.value.currentTime = currentTime.value
  }
}

// 音量变化
const onVolumeChange = () => {
  if (audio.value) {
    audio.value.volume = volume.value
  }
}

// 切换展开/收起状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// 拖动相关功能
let isDragging = false
let dragStartX = 0
let dragStartY = 0
let widgetStartX = 0
let widgetStartY = 0

const onMouseDown = (e: MouseEvent) => {
  if (!musicWidgetRef.value) return
  
  isDragging = true
  dragStartX = e.clientX
  dragStartY = e.clientY
  widgetStartX = musicWidgetRef.value.getBoundingClientRect().left
  widgetStartY = musicWidgetRef.value.getBoundingClientRect().top
  
  document.addEventListener('mousemove', onMouseMove as EventListener)
  document.addEventListener('mouseup', onMouseUp as EventListener)
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging || !musicWidgetRef.value) return
  
  const deltaX = e.clientX - dragStartX
  const deltaY = e.clientY - dragStartY
  
  // 更新垂直位置
  positionY.value = widgetStartY + deltaY
  
  // 限制在视窗范围内
  const windowHeight = window.innerHeight
  const widgetHeight = musicWidgetRef.value.offsetHeight
  positionY.value = Math.max(0, Math.min(positionY.value, windowHeight - widgetHeight))
}

const onMouseUp = () => {
  if (!isDragging) return
  
  isDragging = false
  document.removeEventListener('mousemove', onMouseMove as EventListener)
  document.removeEventListener('mouseup', onMouseUp as EventListener)
  
  // 自动吸附到最近的边界
  if (musicWidgetRef.value) {
    const widgetRect = musicWidgetRef.value.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const distanceToLeft = widgetRect.left
    const distanceToRight = windowWidth - widgetRect.right
    
    if (distanceToLeft <= distanceToRight) {
      position.value = 'left'
    } else {
      position.value = 'right'
    }
  }
}

// 初始化
onMounted(() => {
  initAudio()
  
  // 设置初始歌曲索引
  if (props.songs.length > 0) {
    currentSongIndex.value = Math.min(props.defaultSongIndex, props.songs.length - 1)
  }
  
  // 添加拖动事件监听
  if (musicWidgetRef.value) {
    const dragHandle = musicWidgetRef.value.querySelector('.cover-section')
    if (dragHandle) {
      dragHandle.addEventListener('mousedown', onMouseDown as EventListener)
    }
  }
  
  // 监听窗口大小变化
  window.addEventListener('resize', onWindowResize as EventListener)
})

// 清理
onUnmounted(() => {
  if (audio.value) {
    audio.value.pause()
  }
  
  document.removeEventListener('mousemove', onMouseMove as EventListener)
  document.removeEventListener('mouseup', onMouseUp as EventListener)
  window.removeEventListener('resize', onWindowResize as EventListener)
})

// 窗口大小变化处理
const onWindowResize = () => {
  if (!musicWidgetRef.value) return
  
  const widgetRect = musicWidgetRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const widgetHeight = widgetRect.height
  
  // 确保挂件在视窗内
  positionY.value = Math.max(0, Math.min(positionY.value, windowHeight - widgetHeight))
}
</script>

<style scoped>
.music-widget {
  position: fixed;
  display: flex;
  align-items: center;
  height: 50px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background-color: var(--vp-c-brand-soft);
  border: 1px solid var(--vp-c-brand-3);
}

.music-widget.left {
  left: 0;
  transform: translateX(0);
}

.music-widget.right {
  right: 0;
  transform: translateX(0);
}

.music-widget.collapsed {
  transform: translateX(-10px);
}

.music-widget.right.collapsed {
  transform: translateX(10px);
}

.music-widget:hover {
  transform: translateX(0);
}

.cover-section {
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-brand-1);
  color: white;
  border-radius: 8px 0 0 8px;
}

.info-controls {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  gap: 10px;
}

.song-info {
  min-width: 120px;
  overflow: hidden;
}

.song-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 12px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-1);
}

.control-btn:hover {
  background-color: var(--vp-c-brand-2);
  color: white;
}

.progress-volume {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 150px;
}

.progress-container,
.volume-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.time {
  font-size: 10px;
  color: var(--vp-c-text-2);
  min-width: 30px;
}

.progress-slider,
.volume-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  background: var(--vp-c-brand-3);
  border-radius: 2px;
  outline: none;
}

.progress-slider::-webkit-slider-thumb,
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  cursor: pointer;
}

/* 收起状态下隐藏信息和控制区域 */
.music-widget.collapsed .info-controls {
  display: none;
}

/* 展开状态下显示完整内容 */
.music-widget:not(.collapsed) {
  width: 400px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .music-widget:not(.collapsed) {
    width: 300px;
  }
  
  .song-info {
    min-width: 80px;
  }
  
  .progress-volume {
    min-width: 100px;
  }
}
</style>