// 导入音乐挂件组件
import MusicWidget from './MusicWidget.vue'

// 导出组件和配置类型
export { MusicWidget }

// 定义歌曲接口
export interface Song {
  title: string
  artist: string
  cover?: string
  url: string
}

// 定义音乐挂件配置接口
export interface MusicWidgetConfig {
  enable: boolean
  songs: Song[]
  autoplay: boolean
  defaultVolume: number
  defaultSongIndex: number
}