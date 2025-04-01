<template><div><p>在使用 <code v-pre>Promise</code> 的时候，遇到一些误区，同时总结处理 <code v-pre>Promise</code> 结果的方法。<br>
对与Promise 的结果处理，需要从 JavaScript 的事件循环和 Promise 状态机角度来理解。</p>
<!-- more -->
<h3 id="_1-const-p1-new-promise" tabindex="-1"><a class="header-anchor" href="#_1-const-p1-new-promise"><span>1. <code v-pre>const p1 = new Promise(...)</code></span></a></h3>
<h4 id="正确用法" tabindex="-1"><a class="header-anchor" href="#正确用法"><span>正确用法：</span></a></h4>
<div class="language-javascript" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> new</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> Promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666">((</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> reject</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 异步操作</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  setTimeout</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">成功结果</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">),</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 1000</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 通过 .then 获取结果</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">then</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">result</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">通过 .then 获取到结果:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> result</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出："成功结果"</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">});</span></span></code></pre>
</div><h4 id="resolve-错误用法" tabindex="-1"><a class="header-anchor" href="#resolve-错误用法"><span>resolve 错误用法</span></a></h4>
<div class="language-javascript" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> new</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> Promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666">((</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // ❌ 错误！不能将自身作为 resolve 的值</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 会导致循环引用，抛出 TypeError: Chaining cycle detected for promise</span></span></code></pre>
</div><p><strong>原因</strong>：<br>
Promise 的 <code v-pre>resolve</code> 参数必须是<strong>普通值</strong>或<strong>另一个 Promise</strong>。如果传入自身，会导致无限递归（类似 <code v-pre>const a = { self: a }</code>），JavaScript 会直接抛出错误。</p>
<hr>
<h3 id="_2-const-p1-await-promise" tabindex="-1"><a class="header-anchor" href="#_2-const-p1-await-promise"><span>2. <code v-pre>const p1 = await Promise</code></span></a></h3>
<h4 id="正确场景" tabindex="-1"><a class="header-anchor" href="#正确场景"><span>正确场景：</span></a></h4>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">async</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> demo</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 假设有一个已解决的 Promise</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> Promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">结果值</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">  </span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 使用 await 提取结果</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> await</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // ✅ p1 直接是 "结果值"</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出："结果值"</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">demo</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="关键点" tabindex="-1"><a class="header-anchor" href="#关键点"><span>关键点：</span></a></h4>
<ul>
<li><code v-pre>await</code> 会<strong>自动提取 Promise 的结果值</strong>，无需手动调用 <code v-pre>.then</code>。</li>
<li>如果 Promise 被拒绝（rejected），<code v-pre>await</code> 会抛出异常，需要用 <code v-pre>try/catch</code> 捕获。</li>
</ul>
<hr>
<h3 id="_3-核心区别" tabindex="-1"><a class="header-anchor" href="#_3-核心区别"><span>3. <strong>核心区别</strong></span></a></h3>
<table>
<thead>
<tr>
<th>场景</th>
<th><code v-pre>new Promise</code> + <code v-pre>.then</code></th>
<th><code v-pre>await</code> 获取结果</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>类型</strong></td>
<td><code v-pre>p1</code> 是 Promise 对象</td>
<td><code v-pre>p1</code> 是 Promise 的结果值（非 Promise）</td>
</tr>
<tr>
<td><strong>获取结果方式</strong></td>
<td>必须通过 <code v-pre>.then</code> 或 <code v-pre>.catch</code> 处理</td>
<td>直接赋值即可</td>
</tr>
<tr>
<td><strong>错误处理</strong></td>
<td>链式调用 <code v-pre>.catch</code></td>
<td>用 <code v-pre>try/catch</code> 包裹</td>
</tr>
<tr>
<td><strong>适用环境</strong></td>
<td>所有 JavaScript 环境</td>
<td>必须在 <code v-pre>async</code> 函数中使用</td>
</tr>
</tbody>
</table>
<hr>
<h3 id="_4-常见误区" tabindex="-1"><a class="header-anchor" href="#_4-常见误区"><span>4. <strong>常见误区</strong></span></a></h3>
<h4 id="误区-1-混淆-resolve-的参数" tabindex="-1"><a class="header-anchor" href="#误区-1-混淆-resolve-的参数"><span>误区 1：混淆 <code v-pre>resolve</code> 的参数</span></a></h4>
<div class="language-javascript" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 错误：试图 resolve 自身</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">new</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> Promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">));</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // ❌ 循环引用</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 正确：resolve 一个值或另一个 Promise</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">new</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> Promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91">42</span><span style="--shiki-light:#999999;--shiki-dark:#666666">));</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // ✅ 正确</span></span></code></pre>
</div><h4 id="误区-2-误以为-await-返回-promise" tabindex="-1"><a class="header-anchor" href="#误区-2-误以为-await-返回-promise"><span>误区 2：误以为 <code v-pre>await</code> 返回 Promise</span></a></h4>
<div class="language-javascript" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">async</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> test</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> p</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> await</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> Promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">value</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">p</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出 "value"，而不是 Promise 对象</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span></code></pre>
</div><hr>
<h3 id="_5-实际应用示例" tabindex="-1"><a class="header-anchor" href="#_5-实际应用示例"><span>5. <strong>实际应用示例</strong></span></a></h3>
<h4 id="场景-1-用-then-处理结果" tabindex="-1"><a class="header-anchor" href="#场景-1-用-then-处理结果"><span>场景 1：用 <code v-pre>.then</code> 处理结果</span></a></h4>
<div class="language-javascript" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> fetchData</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">  return</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> new</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> Promise</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    setTimeout</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> resolve</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">数据</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">),</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 1000</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  });</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 通过 .then 处理</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> fetchData</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">p1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">then</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">data</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">数据:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> data</span><span style="--shiki-light:#999999;--shiki-dark:#666666">));</span></span></code></pre>
</div><h4 id="场景-2-用-await-直接获取结果" tabindex="-1"><a class="header-anchor" href="#场景-2-用-await-直接获取结果"><span>场景 2：用 <code v-pre>await</code> 直接获取结果</span></a></h4>
<div class="language-javascript" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">async</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> handleData</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> data</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> await</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> fetchData</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 直接得到 "数据"</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">数据:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> data</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">handleData</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span></code></pre>
</div><hr>
<h3 id="_6-总结" tabindex="-1"><a class="header-anchor" href="#_6-总结"><span>6. <strong>总结</strong></span></a></h3>
<ul>
<li><strong><code v-pre>new Promise</code></strong>：创建一个异步任务，通过 <code v-pre>.then</code>/<code v-pre>.catch</code> 处理结果。</li>
<li><strong><code v-pre>await</code></strong>：在 <code v-pre>async</code> 函数中直接提取 Promise 的结果值，代码更简洁。</li>
<li><strong>关键规则</strong>：
<ul>
<li><code v-pre>resolve</code> 必须传递普通值或另一个 Promise，不能引用自身。</li>
<li><code v-pre>await</code> 只能在 <code v-pre>async</code> 函数中使用，否则会语法错误。</li>
</ul>
</li>
</ul>
</div></template>


