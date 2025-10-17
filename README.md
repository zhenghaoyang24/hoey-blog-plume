## 个人博客

博客主题为 [vuepress-theme-plume](https://theme-plume.vuejs.press/)

网址：https://zhenghaoyang.cn/

博客主页为自定义页面，若你也在使用这个博客主题并想参考本博客主页，可查看以下详细说明。

## 类别说明

本博客目前有两种自定义主页 - `CodeHome`、`GridHome`.。

一种是网格类型有各类卡片 的 GridHome，另一种是显示代码的 CodeHome。

- CodeHome:
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/a3b04aee-fc71-493e-890c-d2a204b84003" />

- GridHome:
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/abc4bc54-2e85-48ef-9078-cd51cac2fe1c" />

这两种方式在 `README.md` 切换：

```md
---
pageLayout: home
config:
  - type: 类别
---
```

## 配置

### CodeHome

CodeHome 的配置较简单。

1. 组件代码位置为：`docs/.vuepress/theme/components/codehome` 下的所有 `.vue` 文件。

2. 在 `docs/.vuepress/client.js` 中，导入 `CodeHome.vue`：

``` js
import CodeHome from './theme/components/codehome/CodeHome.vue'
  export default defineClientConfig({
    enhance({ app }) {
    app.component('CodeHome', CodeHome)
  },
})
```

3. 在 `docs/README.md` 修改主页配置：

```markdown
---
pageLayout: home
externalLinkIcon: false
config:
  - type: CodeHome
---
```

4. 在组件中 "const reactCode = ``" 更改自己想要显示的代码（个人信息也在里面）。

5. 在 `div` profile-links-box 中更改 profle 的联系方式，对应 icon 在 [iconify](https://icon-sets.iconify.design/) 里查找。

### GridHome

1. 组件代码位置为：`docs/.vuepress/theme/components/gridhome` 下的所有 `.vue` 文件。

2. 在 `docs/.vuepress/client.js` 中，导入 `GridHome.vue`：

``` js
import GridHome from './theme/components/gridhome/GridHome.vue'
  export default defineClientConfig({
    enhance({ app }) {
    app.component('GridHome', GridHome)
  },
})
```

3. 在 `docs/README.md` 修改主页配置：

```markdown
---
pageLayout: home
externalLinkIcon: false
config:
  - type: GridHome
---
```

4. AboutMeCharacter.vue 中的图表使用了 [echarts.js](https://echarts.apache.org/zh/index.html) ,因此需要安装此依赖：

```shell
npm install echarts
```

### 组件说明

#### `GridHome.vue` 为主页组件，主页内容即为以下卡片组件的组合。

#### `AboutMeName.vue` 为主页中 **自我介绍卡片**：

![image](https://github.com/user-attachments/assets/a809cdd3-838c-4218-92f7-b3423153cfbd)

#### `AboutMeSkill.vue` 为主页中 **技能卡片**：

你可以在 `AboutMeSkill.vue` 的 `script` 中修改 `technology` 与 `tools` 数组来更改卡片内容。其中 `type` 为 值，
`icon` 为 [iconify](https://icon-sets.iconify.design/) 中的 **Icon name** 。

![image](https://github.com/user-attachments/assets/53e8d05f-4d83-4fe0-a603-f4968834f51b)

#### `AboutMeCharacter.vue` 为主页中 **性格卡片**：

![image](https://github.com/user-attachments/assets/2a57a3f8-9afd-4e98-a777-e5842cecce53)

#### `AboutMeLife.vue` 为主页中 **我的日常卡片**：

![image](https://github.com/user-attachments/assets/f8bf49f4-8a5b-424f-b551-20858296f316)

#### `AboutMeFriendLink.vue` 为主页中 **友情链接卡片**：

若你的友情链接较多，你可以将链接信息写在 例如 `docs/.vuepress/theme/data/friends.json`中，
同时在 `AboutMeFriendLink.vue` 中的 `script` 将 `friends.json` 导入。

卡片右上角 **所有好友** 按钮的友情链接页面跳转路径位置在  `AboutMeFriendLink.vue` 中 的 `<router-link to="（相对路径）">` 进行更改。

若你也想自定义友情链接页面，可以参考 `docs/notes/more/friends.md`，并在 `client.js` 中导入 `AllFriendContent.vue`。

![image](https://github.com/user-attachments/assets/7a1207f0-ff82-4fba-beb4-f87ce7e6f4a7)

#### `AboutMeText.vue` 为主页中 **文本卡片**：

文本卡片使用了插槽，可以在 `GridHome.vue` 中自定义内容，满足多种文本需求。

![image](https://github.com/user-attachments/assets/d69ec01a-9012-46c4-9f60-5665c5387432)

![image](https://github.com/user-attachments/assets/615c4be7-dc1d-4c16-84b4-2b87e8a9b2d9)

### 自定义卡片宽度

卡片宽度在卡片组件的父 `div` 中使用 `class` 进行更改，`grid-row-1` 为一个卡片铺满一行，`grid-row-1-1` 为两个卡片 1:1 行排, `grid-row-3-2` 为两个卡片 3:2 行排,你可以在 `Custom.vue` 的 `style` 中写更多的布局方式，随意组合卡片。
