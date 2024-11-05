---
title: CSS3
createTime: 2024/10/31 15:41:27
permalink: /patch/CSS3/
---

## 1. 背景
**box的区域：**  
![img.png](../../../assets/patch_css3_01.jpg)
::: tabs
@tab background-origin  
**作用**：指定了背景图像的位置区域。  
**属性值：** content-box | padding-box | border-box
@tab background-clip
**作用**：指定背景剪裁的开始位置。  
**属性值：** content-box | padding-box | border-box
:::
**CSS3允许在元素上添加多个背景图像:**
```css
background-image:url(xxx.png),url(xxx.jpg);
background-position: right bottom, left top;
background-repeat: no-repeat, repeat;
```

## 1. 渐变
### 1. 线性渐变

