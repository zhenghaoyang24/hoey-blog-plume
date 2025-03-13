---
title: HTML5
createTime: 2023/5/7 18:59:16
permalink: /patch/HTML5/
tags:
  - HTML
---

## 1. 多表单元素-datalist
:::tip
\<datalist> 标签规定了\<input> 元素可能的选项列表，是 HTML5 中的新标签。
:::
::: normal-demo 代码演示
```html
<input list="data">
<datalist id="data">
  <option value="篮球">
  <option value="唱歌">
  <option value="跳舞">
  <option value="rape">
</datalist>
```
:::
## 2. 语义和结构元素
### 1.details
::: tip
\<details> 标签规定了用户可见的或者隐藏的需求的补充细节。  
\<details> 标签用来供用户开启关闭的交互式控件。任何形式的内容都能被放在\<details> 标签里边。  
\<details> 元素的内容对用户是不可见的，除非设置了 open 属性。
:::
::: normal-demo 代码演示  
```html
<details open>
    <summary>点击我</summary>
    <p>这是隐藏内容。</p>
</details>
```
:::
### 2.progress
\<progress> 标签定义运行中的任务进度（进程）。
::: normal-demo 代码演示  
```html
下载进度:
<progress value="22" max="100">
</progress>
```
:::
### 3.ruby
\<ruby> 标签定义 ruby 注释（中文注音或字符）。  
将 \<ruby> 标签与 \<rt> 和 \<rp> 标签一起使用，\<rp>定义当浏览器不支持 "ruby" 元素时显示的内容。  
::: normal-demo 代码演示  
```html
<ruby>
汉 <rp>(</rp><rt>Han</rt><rp>)</rp>
字 <rp>(</rp><rt>zi</rt><rp>)</rp>
</ruby>
```
:::
### 4.meter
\<meter> 标签定义度量衡。仅用于已知最大和最小值的度量。  
::: caution
\<meter> 不能作为一个进度条来使用， 进度条使用 \<progress> 标签。
:::
::: normal-demo 代码演示  
```html
<meter value="2" min="0" max="10">2 out of 10</meter>
<meter value="0.6">60%</meter>  
```
:::  

### 5.其他结构元素
|     元素     | 描述                     |
|:----------:|:-----------------------|
| \<article> | 定义页面独立的内容区域。           |
|  \<aside>  | 定义页面的侧边栏内容。            |
| \<header>  | 定义了文档的头部区域。            |
| \<footer> | 定义 section 或 document 的页脚。 |
| \<nav> | 定义导航链接的部分。             |
| \<section> | 定义文档中的节（section、区段）。   |

HTML5引入了许多语义化标签，如\<header>、\<footer>、\<article>、\<section>等，这些标签能够更清晰地描述网页的结构和内容。
搜索引擎通过解析这些标签，可以更准确地理解网页的主题和重点，从而提高网页在搜索结果中的排名。

## 3. Canvas
