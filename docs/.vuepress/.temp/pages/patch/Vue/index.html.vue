<template><div><h2 id="一、vue中的常用指令" tabindex="-1"><a class="header-anchor" href="#一、vue中的常用指令"><span>一、Vue中的常用指令</span></a></h2>
<p><strong>概念：<strong>指令（Directives）是 Vue 提供的带有 <strong>v- 前缀</strong> 的 特殊 标签</strong>属性</strong>。<br>
vue 中的指令按照不同的用途可以分为如下 6 大类：</p>
<ul>
<li>内容渲染指令（v-html、v-text）</li>
<li>条件渲染指令（v-show、v-if、v-else、v-else-if）</li>
<li>事件绑定指令（v-on）</li>
<li>属性绑定指令 （v-bind）</li>
<li>双向绑定指令（v-model）</li>
<li>列表渲染指令（v-for）</li>
</ul>
<p>指令是 vue 开发中最基础、最常用、最简单的知识点。</p>
<h2 id="二、内容渲染指令" tabindex="-1"><a class="header-anchor" href="#二、内容渲染指令"><span>二、内容渲染指令</span></a></h2>
<p>内容渲染指令用来辅助开发者渲染 DOM 元素的文本内容。常用的内容渲染指令有如下2 个：</p>
<ul>
<li>
<p>v-text（类似innerText）</p>
</li>
<li>
<ul>
<li>使用语法：<code v-pre>&lt;p v-text=&quot;uname&quot;&gt;hello&lt;/p&gt;</code>，意思是将 uame 值渲染到 p 标签中</li>
</ul>
</li>
<li>
<p>类似 innerText，使用该语法，会覆盖 p 标签原有内容</p>
</li>
<li>
<p>v-html（类似 innerHTML）</p>
</li>
<li>
<ul>
<li>使用语法：<code v-pre>&lt;p v-html=&quot;intro&quot;&gt;hello&lt;/p&gt;</code>，意思是将 intro 值渲染到 p 标签中</li>
</ul>
</li>
<li>
<p>类似 innerHTML，使用该语法，会覆盖 p 标签原有内容</p>
</li>
<li>
<p>类似 innerHTML，使用该语法，能够将HTML标签的样式呈现出来。</p>
</li>
</ul>
<h2 id="三、条件渲染指令" tabindex="-1"><a class="header-anchor" href="#三、条件渲染指令"><span>三、条件渲染指令</span></a></h2>
<p>条件判断指令，用来辅助开发者按需控制 DOM 的显示与隐藏。条件渲染指令有如下两个，分别是：</p>
<ol>
<li>v-show</li>
</ol>
<ul>
<li>
<ol>
<li>作用：  控制元素显示隐藏</li>
</ol>
</li>
<li>
<ol start="2">
<li>语法：  v-show = &quot;表达式&quot;   表达式值为 true 显示， false 隐藏</li>
</ol>
</li>
<li>
<ol start="3">
<li>原理：  切换 display:none 控制显示隐藏</li>
</ol>
</li>
<li>
<ol start="4">
<li>场景：频繁切换显示隐藏的场景</li>
</ol>
</li>
</ul>
<ol start="2">
<li>v-if</li>
</ol>
<ul>
<li>
<ol>
<li>作用：  控制元素显示隐藏（条件渲染）</li>
</ol>
</li>
<li>
<ol start="2">
<li>语法：  v-if= &quot;表达式&quot;          表达式值 true显示， false 隐藏</li>
</ol>
</li>
<li>
<ol start="3">
<li>原理：  基于条件判断，是否创建 或 移除元素节点</li>
</ol>
</li>
<li>
<ol start="4">
<li>场景：  要么显示，要么隐藏，不频繁切换的场景</li>
</ol>
</li>
</ul>
<ol start="3">
<li>v-else 和 v-else-if</li>
</ol>
<ul>
<li>
<ol>
<li>作用：辅助v-if进行判断渲染</li>
</ol>
</li>
<li>
<ol start="2">
<li>语法：v-else  v-else-if=&quot;表达式&quot;</li>
</ol>
</li>
<li>
<ol start="3">
<li>需要紧接着v-if使用</li>
</ol>
</li>
</ul>
<h2 id="四、事件绑定指令" tabindex="-1"><a class="header-anchor" href="#四、事件绑定指令"><span>四、事件绑定指令</span></a></h2>
<p>使用Vue时，如需为DOM注册事件，及其的简单，语法如下：</p>
<ul>
<li>&lt;button v-on:事件名=&quot;内联语句&quot;&gt;按钮&lt;/button&gt;</li>
<li>&lt;button v-on:事件名=&quot;处理函数&quot;&gt;按钮&lt;/button&gt;</li>
<li>&lt;button v-on:事件名=&quot;处理函数(实参)&quot;&gt;按钮&lt;/button&gt;</li>
<li><code v-pre>v-on:</code> 简写为 <strong>@</strong></li>
</ul>
<ol>
<li>内联语句</li>
</ol>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">app</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> @click="count--">-&#x3C;/button></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    &#x3C;span>{{ count }}&#x3C;/span></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    &#x3C;button</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-on</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">count++</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">+</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">     &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">       const app = new Vue(</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">         el</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">#app</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">         data</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">           count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 100</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">         }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">       }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">     &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>事件处理函数
注意：</li>
</ol>
<ul>
<li>事件处理函数应该写到一个跟data同级的配置项（methods）中</li>
<li>methods中的函数内部的this都指向Vue实例</li>
</ul>
<ol start="3">
<li>给事件处理函数传参</li>
</ol>
<ul>
<li>如果不传递任何参数，则方法无需加小括号；methods方法中可以直接使用 e 当做事件对象</li>
<li>如果传递了参数，则实参 <code v-pre>$event</code> 表示事件对象，固定用法。</li>
</ul>
<h2 id="五、属性绑定指令" tabindex="-1"><a class="header-anchor" href="#五、属性绑定指令"><span>五、属性绑定指令</span></a></h2>
<ol>
<li><strong>作用</strong>： 动态设置html的标签属性 比如：src、url、title</li>
<li><strong>语法</strong> ：<strong>v-bind:</strong> 属性名=“表达式”</li>
<li><strong>v-bind:</strong> 可以简写成 =&gt;   <strong>:</strong></li>
</ol>
<p>比如，有一个图片，它的 <code v-pre>src</code> 属性值，是一个图片地址。这个地址在数据 data 中存储。</p>
<p>则可以这样设置属性值：</p>
<ul>
<li><code v-pre>&lt;img v-bind:src=&quot;url&quot; /&gt;</code></li>
<li><code v-pre>&lt;img :src=&quot;url&quot; /&gt;</code>   （v-bind可以省略）</li>
</ul>
<h2 id="六、列表渲染指令" tabindex="-1"><a class="header-anchor" href="#六、列表渲染指令"><span>六、列表渲染指令</span></a></h2>
<p>Vue 提供了 v-for 列表渲染指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。</p>
<p>v-for 指令需要使用 <code v-pre>(item, index) in arr</code> 形式的特殊语法，其中：</p>
<ul>
<li>item 是数组中的每一项</li>
<li>index 是每一项的索引，不需要可以省略</li>
<li>arr 是被遍历的数组</li>
</ul>
<p>此语法也可以遍历<strong>对象和数字</strong></p>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">//遍历对象</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">(value, key, index) in object</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">{{value}}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">/*</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">value:对象中的值</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">key:对象中的键</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">index:遍历索引从0开始</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">*/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">//遍历数字</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">p</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">item in 10</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">{{item}}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">p</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// item从1 开始</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="七、key" tabindex="-1"><a class="header-anchor" href="#七、key"><span>七、key</span></a></h2>
<p><strong>语法：</strong> key=&quot;唯一值&quot;<br>
<strong>作用：<strong>给列表项添加的</strong>唯一标识</strong>。便于Vue进行列表项的<strong>正确排序复用</strong>。<br>
<strong>为什么加key：</strong> Vue 的默认行为会尝试原地修改元素（<strong>就地复用</strong>）<br>
实例代码：</p>
<div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">ul</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">li</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">(item, index) in booksList</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> :key="item.id"></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    &#x3C;span>{{ item.name }}&#x3C;/span></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    &#x3C;span>{{ item.author }}&#x3C;/span></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    &#x3C;button</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> @click="del(item.id)">删除&#x3C;/button></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">  &#x3C;/li></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">&#x3C;/ul></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p>
<ol>
<li>key 的值只能是字符串 或 数字类型</li>
<li>key 的值必须具有唯一性</li>
<li>推荐使用  id 作为 key（唯一），不推荐使用 index 作为 key（会变化，不对应）</li>
</ol>
<h3 id="_1-用-key-管理可复用的元素" tabindex="-1"><a class="header-anchor" href="#_1-用-key-管理可复用的元素"><span>1.用 key 管理可复用的元素</span></a></h3>
<p>当不希望元素复用，而是两个元素独立时，只需添加一个具有唯一值的<code v-pre>key</code>attribute 即可。</p>
<h2 id="八、v-model" tabindex="-1"><a class="header-anchor" href="#八、v-model"><span>八、v-model</span></a></h2>
<p>所谓双向绑定就是：</p>
<ol>
<li>数据改变后，呈现的页面结果会更新</li>
<li>页面结果更新后，数据也会随之而变</li>
<li></li>
</ol>
<p><strong>作用：</strong> 给<strong>表单元素</strong>（input、radio、select）使用，双向绑定数据，可以快速 <strong>获取</strong> 或 <strong>设置</strong> 表单元素内容<br>
<strong>v-model</strong>是一个语法糖。</p>
<CodeDemo id="code-demo-422" type="vue" title="%E6%BC%94%E7%A4%BA" code="eJyVVMtq20AU/ZVBmyRQoy7aLlRV0GZX6APaXd3FWJrgqfUY5JHjYASmLaWhDrSl2aSrQDbJInhpiP8mUUJW+YXcmdEoI+XlCAxz5845554jjUfWICOWY7mcRCzEnHjtGCFUbG2fzA6Kva3z8ebp7o+L+eTs6E9xuFP8nBazb8X0XzGeX8z/q7N7O7ee/T05mY2he7o9PTv6fjz+6nZSpeDSmGUc8Q1GXrQtv0v8XicZti1EA6i/YL8H6wEOM9F+XZatKAlIqM+T4C2OSL9tlYwh7pAQrSVpReAJoGvLxkKySTc2ZcvyAbIS4QngA2Qj2iOG7JuyXFxWEXgCWJet0u4zHHurigfFgshBoxEymVGeu7Y8V2HFDz4F8WInm+d/D1UjoAM1Nxli+GhI64ke6prTFAc00TaT2HT5TlWVSUbFJCaT6VBiPcDU/JkW79bm62KptT+qakFtifUAc6e2TO69JJLRKs5mqDaEd5WvCPbXPlyaFlwiKJarm2Nem5VK41ryz4yZ5RAkJD43nKkN4Q1FWcgpgFCfb4QihXUa8K6Dnj5mw+d1HkGVME6T2Hvp2uXq5v6re/qrN/UhEjlXbc8Is8rzQzm+TFR7aWTaiLVcurbxj+b2/ZSyUo4MWZJyFJA1DImgkSYJMMfLK1e1eFLCszSubcFj3hrn0+dHjbZ6887SUrOhDQDG7OS6yBUAavCnJ7byS6bl8go=">
<div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">   单个复选框，绑定到布尔值；</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">   多个复选框，绑定到同一个数组。</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">checkbox</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">jack</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Jack</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">checkedNames</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">jack</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Jack</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">checkbox</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">john</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">John</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">checkedNames</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">john</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">John</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">checkbox</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">mike</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Mike</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">checkedNames</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">mike</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Mike</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Checked names: {{ checkedNames }}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">单选按钮</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">example-4</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">radio</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">one</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">One</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">picked</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">one</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">One</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">radio</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">two</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Two</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">picked</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> for</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">two</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Two</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">label</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Picked: {{ picked }}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">选择框-多选(绑定到一个数组)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">example-6</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">         &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">select</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">selected</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> multiple</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">width</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 50</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">            &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">A</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">            &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">B</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">            &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">C</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">         &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">select</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">         &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">         &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Selected: {{ selected }}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">span</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">   export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">      data</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">          return</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">             checkedNames</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:[],</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">             picked</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">''</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">             selected</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:[]</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">          }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<h2 id="九、指令修饰符" tabindex="-1"><a class="header-anchor" href="#九、指令修饰符"><span>九、指令修饰符</span></a></h2>
<p>修饰符就是通过“.”指明一些指令<strong>后缀</strong> 不同的<strong>后缀</strong>封装了不同的处理操作，从而简化代码。</p>
<h3 id="_1-按键修饰符" tabindex="-1"><a class="header-anchor" href="#_1-按键修饰符"><span>1. 按键修饰符</span></a></h3>
<ul>
<li>@keyup.enter —&gt; 当点击enter键的时候才触发</li>
</ul>
<h3 id="_2-v-model修饰符" tabindex="-1"><a class="header-anchor" href="#_2-v-model修饰符"><span>2. v-model修饰符</span></a></h3>
<ul>
<li>v-model.trim  —&gt;去除首位空格。</li>
<li>v-model.number —&gt;转为数字。</li>
<li>v-model.lazy  —&gt;取消数据同步，而转为在 change 事件之后进行同步。</li>
</ul>
<CodeDemo id="code-demo-461" type="vue" title="lazy%E6%BC%94%E7%A4%BA" code="eJyFT0sOgjAQvUrTjZr42ZPqCTxCNxXGSFKgqQMBSW/gwpUb1y5NXHglOYctoOAncTadvnnz3puSZilQjzKESEmBsOAxIYSFsUqRYKFgzilCjpySbBIlAcgOsAs+bBIZgLbg/bCvLufqdKuOV04bHUf0ytI9xrCV/q8+lWJXtOjStl82bv5D3nGN4TGb9S5hW1+HChsy5CrRSAJYi1QiKWvQViBQDEfd35UGTHX8Brmq/QaD8Qf+9Lej/sSmaZtmoU73SkTNAy5Pfg0=">
<div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">text</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">text</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> placeholder</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">同步更新</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">   text:{{text}}</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">br</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">text</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">lazy</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">textLazy</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> placeholder</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">lazy</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">   text:{{textLazy}}</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">   export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">      data</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">          return</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">              text</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">''</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">             textLazy</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">''</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">          }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<h3 id="_3-事件修饰符" tabindex="-1"><a class="header-anchor" href="#_3-事件修饰符"><span>3. 事件修饰符</span></a></h3>
<ul>
<li>@事件名.stop —&gt; 阻止冒泡</li>
<li>@事件名.prevent  —&gt;阻止默认行为（如a标签上添加事件）</li>
<li>@事件名.stop.prevent —&gt;可以连用 即阻止事件冒泡也阻止默认行为</li>
</ul>
<h2 id="十、v-bind绑定html-class" tabindex="-1"><a class="header-anchor" href="#十、v-bind绑定html-class"><span>十、v-bind绑定HTML-Class</span></a></h2>
<p>为了方便开发者进行样式控制， Vue 扩展了 v-bind 的语法，可以针对 <strong>class 类名</strong> 和 <strong>style 行内样式</strong> 进行控制 。</p>
<h3 id="_1-对象语法" tabindex="-1"><a class="header-anchor" href="#_1-对象语法"><span>1.对象语法</span></a></h3>
<p>当class动态绑定的是<strong>对象</strong>时，<strong>键就是类名，值就是布尔值</strong>，如果值是<strong>true</strong>，就有这个类，否则没有这个类</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">box</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> :class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">{ 类名1: 布尔值, 类名2: 布尔值 }</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>适用场景：一个类名，来回切换</p>
<h3 id="_2-数组语法" tabindex="-1"><a class="header-anchor" href="#_2-数组语法"><span>2.数组语法</span></a></h3>
<p>当class动态绑定的是<strong>数组</strong>时 → 数组中所有的类，都会添加到盒子上，本质就是一个 class 列表</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">box</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> :class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">[ 类名1, 类名2, 类名3 ]</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>使用场景:批量添加或删除类</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<ul>
<li>在数组语法中也可以使用对象语法</li>
<li>可以绑定一个返回对象的计算属性</li>
</ul>
</div>
<ul>
<li></li>
</ul>
<CodeDemo id="code-demo-528" type="vue" title="%E5%AF%B9%E8%B1%A1%E4%B8%8E%E6%95%B0%E7%BB%84%E8%AF%AD%E6%B3%95%E6%BC%94%E7%A4%BA" code="eJyFU82O0zAQfpXZCLGp1KQgxMV4K2CvvAHl4CbOroVrR/Y0KlR9AI4cuCAucIcVcEI8z0J5C+y4SetstTsne36+b/zNeJ00S56QBKjFN5JPZwqc5YWW2jwrUDQc1sEH0DoJGF4+Ca7NLtuKtzxjg+xKK8x8hMCjB/XqsIROOjKKfFFLhh0xPcmyv7/fX3/7eH31a/v9c5Z1gVI0jrk6myXMmHPJrJ0l0MI4V83KUqiLbK4R9YLA43rloqTwaS78ch16Dw8igHyF596xGYPvsIV7NUumgXR79fXPzw904igDO50vHa6Cp4UUxWsH2KKlPczIlf778mn77gedhNQp3FdzW4dH3yj3nM9RpbfV0UkkDbWFETXu1OCrWhuEkldsKbGXHEqGLB3tZ+DNcFwaFbmc9b0TqJi0fDyI97KQ04Ppnh5m7abvT/vqBcdLXVoS8QW5mkFjbRuXwuZ9L3AGJ01EMYbDa6/bTaBCK4t+QRxGC3rPnW3e78ogXVSQuoS83ZAXwqLbeIVMKJtG7x0dodqxaclzqS/Sh6MjCZ3FHIYvdMMHDMPqvazBuJtOpMJRaPcB7sD1Fmu7n1/8N7tNSzb/AQ45P9A=">
<div class="language-vue line-numbers-mode" data-ext="vue" data-title="vue"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666"> &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">colorActive</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      color</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> red</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    .</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">size-active</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      font-size</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 30</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    &#x3C;!--绑定对象--></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">arrClass</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">padding-bottom</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 5</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">px</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> :</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">[{ </span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">colorActive</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">textColor</span><span style="--shiki-light:#999999;--shiki-dark:#666666">},</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> sizeClass</span><span style="--shiki-light:#999999;--shiki-dark:#666666">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">对象语法</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">color</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">textColor</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">颜色</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#999999;--shiki-dark:#666666"> &#x26;</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">nbsp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">   &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> @</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">click</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">sizeBtn</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">颜色</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#999999;--shiki-dark:#666666"> &#x26;</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">nbsp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">    export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">       data</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">          return</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">             textColor</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> false</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">             sizeClass</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">size-active</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">          }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">       },</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">       methods</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">          color</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">v</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">              this</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">textColor</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> !</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">v</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">          },</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">          sizeBtn</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">              const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> this</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">$refs</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">arrClass</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">              if</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">classList</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">contains</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">size-active</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">))</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">                 console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">                         ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">classList</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">remove</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">size-active</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">              }</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">             else</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">                 ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">classList</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">add</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">size-active</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">                  </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">          },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">       }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<h2 id="十一-v-bind绑定内联样式" tabindex="-1"><a class="header-anchor" href="#十一-v-bind绑定内联样式"><span>十一.v-bind绑定内联样式</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p><code v-pre>v-bind:style</code>同样有对象语法与数组语法</p>
</div>
<h3 id="_1-多重值" tabindex="-1"><a class="header-anchor" href="#_1-多重值"><span>1.多重值</span></a></h3>
<p>可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：</p>
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> :style</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>这样写只会渲染数组中最后一个被浏览器支持的值。
如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。</p>
</div></template>


