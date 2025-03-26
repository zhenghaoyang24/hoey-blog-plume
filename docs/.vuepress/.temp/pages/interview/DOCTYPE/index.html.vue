<template><div><div class="hint-container tip">
<p class="hint-container-title">提问</p>
<ol>
<li>什么是DOCTYPE？</li>
<li>DOCTYPE的作用是什么？</li>
<li>标准模式和兼容模式</li>
<li>HTML5 <code v-pre>&lt;!DOCTYPE HTML&gt;</code></li>
<li>什么是 DTD？</li>
</ol>
</div>
<h2 id="什么是doctype" tabindex="-1"><a class="header-anchor" href="#什么是doctype"><span>什么是DOCTYPE</span></a></h2>
<p><code v-pre>DOCTYPE</code> 是 文档类型， 用于声明当前文档使用哪种文档模式进行解析和渲染。</p>
<h2 id="doctype的作用是什么" tabindex="-1"><a class="header-anchor" href="#doctype的作用是什么"><span>DOCTYPE的作用是什么？</span></a></h2>
<p><code v-pre>&lt;!DOCTYPE&gt;</code> 声明一般位于文档的第一行，它的作用是告知浏览器以哪种模式进行解析文档。
一般指定之后，会使用标准模式进行文档解析，否则就以兼容模式进行解析。</p>
<h2 id="标准模式和兼容模式" tabindex="-1"><a class="header-anchor" href="#标准模式和兼容模式"><span>标准模式和兼容模式</span></a></h2>
<ul>
<li>标准模式 是指 浏览器以该浏览器支持的最高标准进行文档解析和渲染，包括JS引擎。</li>
<li>兼容模式 是指 文档以宽松的向后兼容的方式渲染，模拟老式浏览器的行为以防止站点无法工作。</li>
</ul>
<h2 id="html5的doctype声明" tabindex="-1"><a class="header-anchor" href="#html5的doctype声明"><span>HTML5的DOCTYPE声明</span></a></h2>
<p>HTML5的 不需要对 DTD 进行引用。但是需要 DOCTYPE 来规范浏览器的行为。
所以HTML的DOCTYPE 声明为</p>
<div class="language-html" data-highlighter="shiki" data-ext="html" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;!</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">doctype</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> html</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>
</div><h2 id="什么是-dtd" tabindex="-1"><a class="header-anchor" href="#什么是-dtd"><span>什么是 DTD？</span></a></h2>
<p>DTD 全称： <code v-pre>Document Type Definition (文档类型定义)</code>，是一组机器可读的规则。</p>
<p>DTD 定义了 XML 或者 HTML 的特定版本中所有允许元素和它们的属性和层级关系的定义。
解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。</p>
</div></template>


