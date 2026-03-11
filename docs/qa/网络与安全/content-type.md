---
title: Content-Type
createTime: 2026/03/11 17:07:47
permalink: /qa/ns/vxx81z0o/
---

<Question :questions="['Content-Type 响应头是什么？','有哪些常用 Content-Type ？']" />

---

Content-Type 是一个 HTTP 响应头字段，用于告诉服务器或者客户端请求体或者响应体的数据格式。
设置正确的 Content-Type 至关重要，错误的 Content-Type 可能会导致服务器无法正确解析数据，从而造成数据丢失等问题。

## application/json

`application/json` 是最常用的字段，用于前后端传输结构化数据，即 JSON 字符串。
如果不设置此 Header，后端可能无法识别 JSON 字符串，而将其视为普通文本。

## application/x-www-form-urlencoded

`application/x-www-form-urlencoded` HTML 标签 `<form>` 默认的提交格式，用于提交表单数据。数据被编码为键值对字符串，
格式类似 URL 查询参数：key1=value1&key2=value2，不支持嵌套对象或数组，所有非字母数字字符都会被 URL 编码。

这种格式适用于提交表单数据，如用户登录、注册等场景。

## multipart/form-data

`multipart/form-data` 用于提交包含文件上传的表单数据。

## text/plain

用于传输未经处理的纯文本数据，不会对数据进行任何编码或格式化。
