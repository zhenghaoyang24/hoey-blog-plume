<template><div><h2 id="_1-vue3简介" tabindex="-1"><a class="header-anchor" href="#_1-vue3简介"><span>1. Vue3简介</span></a></h2>
<p><strong>性能的提升</strong></p>
<ul>
<li>打包大小更小</li>
<li>初次渲染、更新渲染更快</li>
<li>内存减少</li>
</ul>
<p><strong>源码的升级</strong></p>
<ul>
<li>使用<code v-pre>Proxy</code>代替<code v-pre>defineProperty</code>实现响应式。</li>
<li>重写虚拟<code v-pre>DOM</code>的实现和<code v-pre>Tree-Shaking</code>。</li>
</ul>
<p><strong>拥抱TypeScript</strong></p>
<ul>
<li><code v-pre>Vue3</code>可以更好的支持<code v-pre>TypeScript</code>。</li>
</ul>
<p><strong>新的特性</strong></p>
<ol>
<li>
<p><code v-pre>Composition API</code>（组合<code v-pre>API</code>）：</p>
<ul>
<li><code v-pre>setup</code></li>
<li><code v-pre>ref</code>与<code v-pre>reactive</code></li>
<li><code v-pre>computed</code>与<code v-pre>watch</code>
......</li>
</ul>
</li>
<li>
<p>新的内置组件：</p>
<ul>
<li><code v-pre>Fragment</code></li>
<li><code v-pre>Teleport</code></li>
<li><code v-pre>Suspense</code>
......</li>
</ul>
</li>
<li>
<p>其他改变：</p>
<ul>
<li>新的生命周期钩子</li>
<li><code v-pre>data</code> 选项应始终被声明为一个函数</li>
<li>移除<code v-pre>keyCode</code>支持作为<code v-pre> v-on</code> 的修饰符
......</li>
</ul>
</li>
</ol>
<h2 id="_2-创建vue3工程" tabindex="-1"><a class="header-anchor" href="#_2-创建vue3工程"><span>2. 创建Vue3工程</span></a></h2>
<h3 id="_2-1-基于-vue-cli-创建" tabindex="-1"><a class="header-anchor" href="#_2-1-基于-vue-cli-创建"><span>2.1. 基于 vue-cli 创建</span></a></h3>
<p>点击查看<a href="https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create" target="_blank" rel="noopener noreferrer">官方文档</a></p>
<blockquote>
<p>目前<code v-pre>vue-cli</code>已处于维护模式，官方推荐基于 <code v-pre>Vite</code> 创建项目。</p>
</blockquote>
<div class="language-sh line-numbers-mode" data-ext="sh" data-title="sh"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">vue</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> --version</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 安装或者升级你的@vue/cli </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> install</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -g</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> @vue/cli</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 执行创建命令</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">vue</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> create</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> vue_test</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">##  随后选择3.x</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">##  Choose a version of Vue.js that you want to start the project with (Use arrow keys)</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">##  > 3.x</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">##    2.x</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 启动</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">cd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> vue_test</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> run</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> serve</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-基于-vite-创建-推荐" tabindex="-1"><a class="header-anchor" href="#_2-2-基于-vite-创建-推荐"><span>2.2 基于 vite 创建(推荐)</span></a></h3>
<p><code v-pre>vite</code> 是新一代前端构建工具，<code v-pre>vite</code>的优势如下：</p>
<ul>
<li>轻量快速的热重载（<code v-pre>HMR</code>），能实现极速的服务启动。</li>
<li>对 <code v-pre>TypeScript</code>、<code v-pre>JSX</code>、<code v-pre>CSS</code> 等支持开箱即用。</li>
<li>真正的按需编译，不再等待整个应用编译完成。</li>
<li><code v-pre>webpack</code>构建 与 <code v-pre>vite</code>构建对比图如下：</li>
</ul>
<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/patch_vue3quickStar_2-2-01.png"/>
<img src="/assets/patch_vue3quickStar_2-2-02.png"/>
</div>
<ul>
<li>具体操作如下（点击查看<a href="https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application" target="_blank" rel="noopener noreferrer">官方文档</a>）</li>
</ul>
<div class="language-powershell line-numbers-mode" data-ext="powershell" data-title="powershell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 1.创建命令</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">npm create vue</span><span style="--shiki-light:#999999;--shiki-dark:#666666">@</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 2.具体配置</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 配置项目名称</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Project name: vue3_test</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 是否添加TypeScript支持</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Add TypeScript?  Yes</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 是否添加JSX支持</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Add JSX Support?  No</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 是否添加路由环境</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Add Vue Router </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> Single Page Application development?  No</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 是否添加pinia环境</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Add Pinia </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> state management?  No</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 是否添加单元测试</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Add Vitest </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> Unit Testing?  No</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 是否添加端到端测试方案</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Add an </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">End</span><span style="--shiki-light:#999999;--shiki-dark:#666666">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">to</span><span style="--shiki-light:#999999;--shiki-dark:#666666">-</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">End Testing Solution? » No</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 是否添加ESLint语法检查</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Add ESLint </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> code quality?  Yes</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">## 是否添加Prettiert代码格式化</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">√ Add Prettier </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">for</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> code formatting?  No</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装官方推荐的<code v-pre>vscode</code>插件：</p>
<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/patch_vue3quickStar_2-2-03.png"/>
<img src="/assets/patch_vue3quickStar_2-2-04.png"/>
</div>
<p>总结：</p>
<ul>
<li><code v-pre>Vite</code> 项目中，<code v-pre>index.html</code> 是项目的入口文件，在项目最外层。</li>
<li>加载<code v-pre>index.html</code>后，<code v-pre>Vite</code> 解析 <code v-pre>&lt;script type=&quot;module&quot; src=&quot;xxx&quot;&gt;</code> 指向的<code v-pre>JavaScript</code>。</li>
<li><code v-pre>Vue3</code> 中是通过 <code v-pre>createApp</code> 函数创建一个应用实例。</li>
</ul>
<h2 id="_3-vue3核心语法" tabindex="-1"><a class="header-anchor" href="#_3-vue3核心语法"><span>3. Vue3核心语法</span></a></h2>
<h3 id="_3-1-optionsapi-与-compositionapi" tabindex="-1"><a class="header-anchor" href="#_3-1-optionsapi-与-compositionapi"><span>3.1 OptionsAPI 与 CompositionAPI</span></a></h3>
<ul>
<li><code v-pre>Vue2</code>的<code v-pre>API</code>设计是<code v-pre>Options</code>（配置）风格的。</li>
<li><code v-pre>Vue3</code>的<code v-pre>API</code>设计是<code v-pre>Composition</code>（组合）风格的。</li>
</ul>
<h5 id="options-api-的弊端" tabindex="-1"><a class="header-anchor" href="#options-api-的弊端"><span>Options API 的弊端</span></a></h5>
<p><code v-pre>Options</code>类型的 <code v-pre>API</code>，数据、方法、计算属性等，是分散在：<code v-pre>data</code>、<code v-pre>methods</code>、<code v-pre>computed</code>中的，若想新增或者修改一个需求，就需要分别修改：<code v-pre>data</code>、<code v-pre>methods</code>、<code v-pre>computed</code>，不便于维护和复用。</p>
<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/patch_vue3quickStar_3-01.gif"/>
<img src="/assets/patch_vue3quickStar_3-02.gif"/>
</div>
<h5 id="composition-api-的优势" tabindex="-1"><a class="header-anchor" href="#composition-api-的优势"><span>Composition API 的优势</span></a></h5>
<p>可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。</p>
<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/patch_vue3quickStar_3-03.gif"/>
<img src="/assets/patch_vue3quickStar_3-04.gif"/>
</div>
<h3 id="_3-2-setup" tabindex="-1"><a class="header-anchor" href="#_3-2-setup"><span>3.2 setup</span></a></h3>
<h5 id="setup-概述" tabindex="-1"><a class="header-anchor" href="#setup-概述"><span>setup 概述</span></a></h5>
<p><code v-pre>setup</code>是<code v-pre>Vue3</code>中一个新的配置项，值是一个函数，它是 <code v-pre>Composition API</code> <strong>“表演的舞台</strong><em><strong>”</strong></em>，组件中所用到的：数据、方法、计算属性、监视......等等，均配置在<code v-pre>setup</code>中。</p>
<p>特点如下：</p>
<ul>
<li><code v-pre>setup</code>函数返回的对象中的内容，可直接在模板中使用。</li>
<li><code v-pre>setup</code>中访问<code v-pre>this</code>是<code v-pre>undefined</code>。</li>
<li><code v-pre>setup</code>函数会在<code v-pre>beforeCreate</code>之前调用，它是“领先”所有钩子执行的。</li>
</ul>
<div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">person</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">h2</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">姓名：{{name}}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">h2</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">h2</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">年龄：{{age}}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">h2</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">changeName</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">修改名字</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">changeAge</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">年龄+1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">showTel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">点我查看联系方式</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> lang</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">ts</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">  export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Person</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    setup</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">      // 数据，原来写在data中（注意：此时的name、age、tel数据都不是响应式数据）</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">      let </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">张三</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">      let </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">age</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 18</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">      let </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">tel</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">13888888888</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">      // 方法，原来写在methods中</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">      function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> changeName</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        name</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> = </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">zhang-san</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> //注意：此时这么修改name页面是不变化的</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      }</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">      function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> changeAge</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        age</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> +=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 1</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> //注意：此时这么修改age页面是不变化的</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">age</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      }</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">      function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> showTel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">        alert</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">tel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">      // 返回一个对象，对象中的内容，模板中可以直接使用</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">      return</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">age</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">tel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">changeName</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">changeAge</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">showTel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="setup-的返回值" tabindex="-1"><a class="header-anchor" href="#setup-的返回值"><span>setup 的返回值</span></a></h5>
<ul>
<li>若返回一个<strong>对象</strong>：则对象中的：属性、方法等，在模板中均可以直接使用。</li>
<li>若返回一个<strong>函数</strong>：则可以自定义渲染内容，代码如下：</li>
</ul>
<div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>setup(){</span></span>
<span class="line"><span>  return ()=> '你好啊！'</span></span>
<span class="line"><span>}</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="setup-与-options-api-的关系" tabindex="-1"><a class="header-anchor" href="#setup-与-options-api-的关系"><span>setup 与 Options API 的关系</span></a></h5>
<ul>
<li><code v-pre>Vue2</code> 的配置（<code v-pre>data</code>、<code v-pre>methos</code>......）中<strong>可以访问到</strong> <code v-pre>setup</code>中的属性、方法。</li>
<li>但在<code v-pre>setup</code>中<strong>不能访问到</strong><code v-pre>Vue2</code>的配置（<code v-pre>data</code>、<code v-pre>methos</code>......）。</li>
<li>如果与<code v-pre>Vue2</code>冲突，则<code v-pre>setup</code>优先。</li>
</ul>
<h5 id="setup-语法糖" tabindex="-1"><a class="header-anchor" href="#setup-语法糖"><span>setup 语法糖</span></a></h5>
<p><code v-pre>setup</code>函数有一个语法糖，这个语法糖，可以让我们把<code v-pre>setup</code>独立出去，代码如下：</p>
<div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">person</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">h2</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">姓名：{{name}}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">h2</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">h2</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">年龄：{{age}}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">h2</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">changName</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">修改名字</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">changAge</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">年龄+1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">showTel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">点我查看联系方式</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> lang</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">ts</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">  export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Person</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">&#x3C;!-- 下面的写法是setup语法糖 --></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> setup</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> lang</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">ts</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">this</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> //undefined</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">  </span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 数据（注意：此时的name、age、tel都不是响应式数据）</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  let </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">张三</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  let </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">age</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 18</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  let </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">tel</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">13888888888</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 方法</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> changName</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    name</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">李四</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">//注意：此时这么修改name页面是不变化的</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> changAge</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">age</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    age</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> +=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 1</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> //注意：此时这么修改age页面是不变化的</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> showTel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    alert</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">tel</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>扩展：上述代码，还需要编写一个不写<code v-pre>setup</code>的<code v-pre>script</code>标签，去指定组件名字，比较麻烦，我们可以借助<code v-pre>vite</code>中的插件简化</p>
<ol>
<li>第一步：<code v-pre>npm i vite-plugin-vue-setup-extend -D</code></li>
<li>第二步：<code v-pre>vite.config.ts</code></li>
</ol>
<div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>import { defineConfig } from 'vite'</span></span>
<span class="line"><span>import VueSetupExtend from 'vite-plugin-vue-setup-extend'</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>  plugins: [ VueSetupExtend() ]</span></span>
<span class="line"><span>})</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>第三步：<code v-pre>&lt;script setup lang=&quot;ts&quot; name=&quot;Person&quot;&gt;</code></li>
</ol>
</div></template>


