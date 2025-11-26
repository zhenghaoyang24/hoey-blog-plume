# 音乐挂件组件使用说明

音乐挂件是一个可以悬浮在页面边缘的音乐播放器组件，支持播放/暂停、上一首/下一首、进度控制和音量调节等功能。

## 功能特性

- 播放/暂停音乐
- 上一首/下一首切换
- 进度条拖拽控制
- 音量调节
- 悬浮在页面边缘，可拖动并自动吸附
- 响应式设计，适配不同屏幕尺寸

## 使用方法

### 1. 在 Markdown 中直接使用

```markdown
<MusicWidget :songs="songs" :autoplay="false" :default-volume="0.5" :default-song-index="0" />
```

### 2. 在 Vue 组件中使用

```vue
<template>
  <MusicWidget 
    :songs="songs" 
    :autoplay="false" 
    :default-volume="0.5" 
    :default-song-index="0" 
  />
</template>

<script setup>
const songs = [
  {
    title: '歌曲名称',
    artist: '艺术家',
    cover: '/path/to/cover.jpg',
    url: '/path/to/song.mp3'
  }
]
</script>
```

## Props 说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| songs | Song[] | [] | 歌曲列表 |
| autoplay | boolean | false | 是否自动播放 |
| defaultVolume | number | 0.5 | 默认音量 (0-1) |
| defaultSongIndex | number | 0 | 默认播放歌曲索引 |

## Song 对象结构

```typescript
interface Song {
  title: string    // 歌曲名称
  artist: string   // 艺术家
  cover?: string   // 封面图片路径 (可选)
  url: string      // 音频文件路径
}
```

## 自定义样式

组件使用了以下 CSS 变量，可以通过覆盖这些变量来自定义样式：

```css
:root {
  --vp-c-brand-1: #5086a1;                       /* 链接颜色、强调色 */
  --vp-c-brand-2: #6aa1b7;                       /* 链接、按钮 hover 颜色 */
  --vp-c-brand-3: #8cccd5;                       /* 背景色、边框色 */
  --vp-c-brand-soft: rgba(131, 208, 218, 0.314); /* 辅助色 */
}
```

## 注意事项

1. 音频文件需要放置在 public 目录下才能正确访问
2. 为了获得最佳体验，建议提供歌曲封面图片
3. 组件会自动保存用户的音量设置到 localStorage