# 个人博客

博客主题为 [vuepress-theme-plume](https://theme-plume.vuejs.press/)。

网址：https://www.zhenghaoyang.cn/

博客主页为自定义页面，若你想参考本博客主页，可查看以下详细说明：

### 文件与配置

1. 自定义主页代码位置为：`docs/.vuepress/theme/components` 下的所有除 `AllFriendContent.vue` 的 `.vue` 文件。
`AllFriendContent.vue` 为自定义友情链接页面所需文件，具体可参考下文 **文件说明**。

2. 在 `docs/.vuepress/client.js` 中，导入 `Custom.vue`

``` js
import Custom from './theme/components/Custom.vue'
  export default defineClientConfig({
    enhance({ app }) {
    app.component('RepoCard', RepoCard)
    app.component('Custom', Custom)
    app.component('AllFriendContent', AllFriendContent)
  },
})
```

3. 在 `docs/README.md` 修改主页配置：

```markdown
---
pageLayout: home
externalLinkIcon: false
config:
  - type: Custom
---
```

### 文件说明

`Custom.vue` 为主页页面。

`AboutMeName.vue` 为主页中 **自我介绍卡片**：

`AboutMeCharacter.vue` 为主页中 **性格卡片**：

`AboutMeFriendLink.vue` 为主页中 **友情链接卡片**：

若你的友情链接较多，你可以将链接信息写在 `docs/.vuepress/theme/data/friends.json`，
同时在 `AboutMeFriendLink.vue` 中的 `script` 将 `friends.json` 导入。

卡片右上角 **所有好友** 按钮的友情链接页面跳转路径位置在  `AllFriendContent.vue` 中 的 `<router-link to="（相对路径）">` 进行更改。

若你也想自定义友情链接页面，可以参考 `docs/notes/more/friends.md`，并在 `client.js` 中导入 `AllFriendContent.vue`。

`AboutMeLife.vue` 为主页中 **我的日常卡片**：



`AboutMeText.vue` 为主页中 **文本卡片**：

本卡片使用了插槽，可以在 `Custom.vue` 中自定义，满足多种文本卡片需求。






