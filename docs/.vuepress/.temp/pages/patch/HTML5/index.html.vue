<template><div><h2 id="_1-多表单元素-datalist" tabindex="-1"><a class="header-anchor" href="#_1-多表单元素-datalist"><span>1. 多表单元素-datalist</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>&lt;datalist&gt; 标签规定了&lt;input&gt; 元素可能的选项列表，是 HTML5 中的新标签。</p>
</div>
<CodeDemo id="code-demo-8" type="normal" title="%E4%BB%A3%E7%A0%81%E6%BC%94%E7%A4%BA" code="eJyrVsooyc1RslKyycwrKC1RyMksLrGNUUpJLEmMUbKLybMBsUCCCpkpyOIKCjb5BSWZ+XkKZYk5palAqefr1z2f0IxD8umUjc/W9uCQfLF984uOeTgkixILUiEu0Yc5BchRqgUA4Q1FkQ==">
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> list</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">data</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">datalist</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> id</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">data</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">篮球</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">唱歌</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">跳舞</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">option</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">rape</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">datalist</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<h2 id="_2-语义和结构元素" tabindex="-1"><a class="header-anchor" href="#_2-语义和结构元素"><span>2. 语义和结构元素</span></a></h2>
<h3 id="_1-details" tabindex="-1"><a class="header-anchor" href="#_1-details"><span>1.details</span></a></h3>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>&lt;details&gt; 标签规定了用户可见的或者隐藏的需求的补充细节。<br>
&lt;details&gt; 标签用来供用户开启关闭的交互式控件。任何形式的内容都能被放在&lt;details&gt; 标签里边。<br>
&lt;details&gt; 元素的内容对用户是不可见的，除非设置了 open 属性。</p>
</div>
<CodeDemo id="code-demo-22" type="normal" title="%E4%BB%A3%E7%A0%81%E6%BC%94%E7%A4%BA" code="eJyrVsooyc1RslKySUktSczMKVbIL0jNs4vJUwACm+LS3NzEokq75007n7bvftYx0UYfJgRVUWD3Yv/MZzPWv5w14cX0/qdtrU/X7Xzc0GSjXwBUYaMPNRTIVqoFAEwsLpI=">
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">details</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> open</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">summary</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">点击我</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">summary</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">p</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">这是隐藏内容。</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">p</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">details</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<h3 id="_2-progress" tabindex="-1"><a class="header-anchor" href="#_2-progress"><span>2.progress</span></a></h3>
<p>&lt;progress&gt; 标签定义运行中的任务进度（进程）。</p>
<CodeDemo id="code-demo-31" type="normal" title="%E4%BB%A3%E7%A0%81%E6%BC%94%E7%A4%BA" code="eJyrVsooyc1RslJ6sqP7xd69L/bPfrprmVVMnk1BUX56UWpxsUJZYk5pqm2MkpFRjJJCbmIFkGloYBCjZAdUpA9TBeQo1QIA/7seLw==">
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">下载进度:</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">progress</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">22</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> max</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">100</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">progress</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<h3 id="_3-ruby" tabindex="-1"><a class="header-anchor" href="#_3-ruby"><span>3.ruby</span></a></h3>
<p>&lt;ruby&gt; 标签定义 ruby 注释（中文注音或字符）。<br>
将 &lt;ruby&gt; 标签与 &lt;rt&gt; 和 &lt;rp&gt; 标签一起使用，&lt;rp&gt;定义当浏览器不支持 &quot;ruby&quot; 元素时显示的内容。</p>
<CodeDemo id="code-demo-40" type="normal" title="%E4%BB%A3%E7%A0%81%E6%BC%94%E7%A4%BA" code="eJyrVsooyc1RslKyKSpNqrSLyXu2sVPBpqjATsNGH0jaFJXYeSTmAdklQHaBnSZYNCbv6drpaKqqMjEUASmImUq1AF+yI94=">
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">ruby</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">汉 </span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">(</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rt</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Han</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rt</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">字 </span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">(</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rt</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">zi</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rt</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">rp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">ruby</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<h3 id="_4-meter" tabindex="-1"><a class="header-anchor" href="#_4-meter"><span>4.meter</span></a></h3>
<p>&lt;meter&gt; 标签定义度量衡。仅用于已知最大和最小值的度量。</p>
<div class="hint-container caution">
<p class="hint-container-title">警告</p>
<p>&lt;meter&gt; 不能作为一个进度条来使用， 进度条使用 &lt;progress&gt; 标签。</p>
</div>
<CodeDemo id="code-demo-54" type="normal" title="%E4%BB%A3%E7%A0%81%E6%BC%94%E7%A4%BA" code="eJyrVsooyc1RslKyyU0tSS1SKEvMKU21jVEyilFSyM3MA7IMQKzECiDLEMi0M1LILy1RyE9TMDSw0QfrsYvJQ9NsoGcGVGlmoApToaAQk6dUCwAnOCEo">
<div class="language-html line-numbers-mode" data-ext="html" data-title="html"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">meter</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">2</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> min</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">0</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> max</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">10</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">2 out of 10</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">meter</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">meter</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">0.6</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">60%</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">meter</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></CodeDemo>
<h3 id="_5-其他结构元素" tabindex="-1"><a class="header-anchor" href="#_5-其他结构元素"><span>5.其他结构元素</span></a></h3>
<table>
<thead>
<tr>
<th style="text-align:center">元素</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">&lt;article&gt;</td>
<td style="text-align:left">定义页面独立的内容区域。</td>
</tr>
<tr>
<td style="text-align:center">&lt;aside&gt;</td>
<td style="text-align:left">定义页面的侧边栏内容。</td>
</tr>
<tr>
<td style="text-align:center">&lt;header&gt;</td>
<td style="text-align:left">定义了文档的头部区域。</td>
</tr>
<tr>
<td style="text-align:center">&lt;footer&gt;</td>
<td style="text-align:left">定义 section 或 document 的页脚。</td>
</tr>
<tr>
<td style="text-align:center">&lt;nav&gt;</td>
<td style="text-align:left">定义导航链接的部分。</td>
</tr>
<tr>
<td style="text-align:center">&lt;section&gt;</td>
<td style="text-align:left">定义文档中的节（section、区段）。</td>
</tr>
</tbody>
</table>
<p>HTML5引入了许多语义化标签，如&lt;header&gt;、&lt;footer&gt;、&lt;article&gt;、&lt;section&gt;等，这些标签能够更清晰地描述网页的结构和内容。
搜索引擎通过解析这些标签，可以更准确地理解网页的主题和重点，从而提高网页在搜索结果中的排名。</p>
<h2 id="_3-canvas" tabindex="-1"><a class="header-anchor" href="#_3-canvas"><span>3. Canvas</span></a></h2>
</div></template>


