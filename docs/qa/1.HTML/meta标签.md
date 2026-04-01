---
title: meta 标签
createTime: 2026/04/01 15:55:08
permalink: /qa/html/xjld4qzf/
---

<Question :questions="['meta 标签有什么用？','有哪些常用的 meta 标签？']" />

---

## meta 标签有什么用？

`<meta>` 标签位于 HTML 文档的 `<head>` 区域，用于提供关于页面的元数据，如作者信息，网页描述。
它们不会显示在页面上，但对浏览器、搜索引擎至关重要。

使用方式为 `<meta name="属性名" content="属性值">`：name 属性指定元数据的名称，content 用于提供与 name 属性对应的实际数据与信息。
HTTP 标准化了一些 name ，但也可以自定义name属性。

## 常用 meta 标签

1. `<meta charset="utf-8">`

charset 指定网页的字符编码，一般使用 utf-8。

2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

viewport 是为了网页响应式而设置的，以确保网页在不同设备上都能够正确的缩放和渲染。

viewport 参数：
- `width=device-width`：宽度等于设备屏幕宽度。
- `height=device-height`：高度等于设备屏幕高度。
- `initial-scale=1.0`：初始缩放比例，默认为 1.0。
- `user-scalable=no`：禁止用户缩放。
- `maximum-scale=1.0`：最大缩放比例。
- `minimum-scale=1.0`：最小缩放比例。

3. `<meta name="description" content="网页描述">`

description 用于简短描述网页，在搜索引擎中可能会作为搜索的摘要，提高SEO。

4. `<meta name="keywords" content="关键词1, 关键词2, 关键词3">`

keywords 用于描述网页的关键词，在搜索引擎中作为搜索的关键词，提高SEO。

5. `<meta name="author" content="作者">`

指明文档作者。