---
title: hash 与 history 模式
createTime: 2026/03/16 14:53:19
permalink: /qa/vue/ayep2xno/
---

<Question :questions="['hash 与 history模式有什么区别','前端资源打包部署后遇到404的原因？']" />

---

在创建路由器实例时，`history` 配置允许我们在不同的历史模式中进行选择。

## hash 模式

hash 模式使用 `createWebHashHistory()` 创建，它在传递过程中的 URL 会在域名后加上 `#`，如 `http://example.com/#/foo`。
`#` 后的内容会被浏览器忽略，不会刷新页面，不会发送给服务器，由 Vue Router 自行处理。

缺点则是不好看，且由于会忽略 `#` 后的内容，因此对 ESO 不友好。

## history 模式

history 模式使用 `createWebHistory()` 创建，它的 URL 中没有 `#`，如 `http://example.com/foo`。由于 Vue 是 SPA（只有 index.html），
因此它实际上也是一种假地址，当地址栏看上去就像真实页面一样。

因为没有 `#`，所以更好看，且不会对 ESO 产生影响。由于没有 `#`，地址会发送到服务器，而服务器又找不到对应地址的文件。
例如地址为 `/home` ，服务器找不到 `/home` 文件，所以就会返回 404 错误。因此使用 history 模式时，需要服务器配置一个 **回退路由**，
即服务器将接收到的且没有匹配资源的地址返回到 `/index.html`，交由 Vue Router 自己处理。

nginx 配置示例：
```conf
# nginx 配置
server {
    listen 80;
    server_name example.com;
    root /var/www/html;      # 前端打包后的 dist 文件夹
    
    location / {
        # 先找文件，再找文件夹，都没有就返回 index.html
        try_files $uri $uri/ /index.html;
    }
}
```

跳转流程：
```
用户访问：/product/123 → 后端：找不到这个文件夹 → 返回 index.html → Vue 接管显示商品页
```
