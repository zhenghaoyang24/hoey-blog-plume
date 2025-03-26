<template><div><div class="hint-container tip">
<p class="hint-container-title">问题</p>
<p>变量声明的方式与它们的区别？</p>
</div>
<hr>
<p>在 JavaScript 中，有多种变量声明方式，主要包括使用 <code v-pre>var</code>、<code v-pre>let</code>、<code v-pre>const</code> 关键字，下面详细介绍它们及其区别。</p>
<h3 id="_1-var" tabindex="-1"><a class="header-anchor" href="#_1-var"><span>1. <code v-pre>var</code></span></a></h3>
<ul>
<li><strong>特点</strong>
<ul>
<li><strong>函数作用域</strong>：<code v-pre>var</code> 声明的变量具有函数作用域，意味着在函数内部任何位置声明的 <code v-pre>var</code> 变量，在整个函数内部都是可见的。</li>
<li><strong>变量提升</strong>：使用 <code v-pre>var</code> 声明的变量会被提升到当前作用域的顶部，可以在声明之前访问，但值为 <code v-pre>undefined</code>。</li>
<li><strong>可重复声明</strong>：在同一作用域内可以多次使用 <code v-pre>var</code> 声明同一个变量。</li>
</ul>
</li>
<li><strong>示例代码</strong></li>
</ul>
<div class="language-javascript" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> testVar</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">num</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出: undefined</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">    var</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> num</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 10</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">num</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出: 10</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">    var</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> num</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 20</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 可以重复声明</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">num</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出: 20</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">testVar</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span></code></pre>
</div><h3 id="_2-let" tabindex="-1"><a class="header-anchor" href="#_2-let"><span>2. <code v-pre>let</code></span></a></h3>
<ul>
<li><strong>特点</strong>
<ul>
<li><strong>块级作用域</strong>：<code v-pre>let</code> 声明的变量具有块级作用域，变量只在声明它的块（如 <code v-pre>if</code> 语句、<code v-pre>for</code> 循环、<code v-pre>while</code> 循环等）内部可见。</li>
<li><strong>不存在变量提升</strong>：<code v-pre>let</code> 声明的变量不会被提升到当前作用域的顶部，在声明之前访问会导致 <code v-pre>ReferenceError</code>。</li>
<li><strong>不可重复声明</strong>：在同一作用域内不能使用 <code v-pre>let</code> 重复声明同一个变量。</li>
</ul>
</li>
<li><strong>示例代码</strong></li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> testLet</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    // console.log(count);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 报错: ReferenceError: Cannot access 'count' before initialization</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">    let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> count</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 10</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出: 10</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    // let count = 20;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 报错: SyntaxError: Identifier 'count' has already been declared</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    if</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">true</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">        let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> innerCount</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 20</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">        console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">innerCount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出: 20</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    // console.log(innerCount);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 报错: ReferenceError: innerCount is not defined</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">testLet</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-const" tabindex="-1"><a class="header-anchor" href="#_3-const"><span>3. <code v-pre>const</code></span></a></h3>
<ul>
<li><strong>特点</strong>
<ul>
<li><strong>块级作用域</strong>：和 <code v-pre>let</code> 一样，<code v-pre>const</code> 声明的常量具有块级作用域。</li>
<li><strong>不存在变量提升</strong>：<code v-pre>const</code> 声明的常量不会被提升到当前作用域的顶部，在声明之前访问会导致 <code v-pre>ReferenceError</code>。</li>
<li><strong>必须初始化</strong>：使用 <code v-pre>const</code> 声明常量时，必须同时进行初始化，否则会报错。</li>
<li><strong>常量值不可变（基本类型）</strong>：一旦声明并初始化，基本类型的常量的值就不能再被重新赋值，但如果常量是引用类型（如对象、数组），可以修改其内部属性。</li>
<li><strong>不可重复声明</strong>：在同一作用域内不能使用 <code v-pre>const</code> 重复声明同一个常量。</li>
</ul>
</li>
<li><strong>示例代码</strong></li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> testConst</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    // const PI;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 报错: SyntaxError: Missing initializer in const declaration</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">    const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> PI</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 3.14</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    // PI = 3.14159;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 报错: TypeError: Assignment to constant variable.</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">PI</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出: 3.14</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">    const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> person</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Alice</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> };</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    person</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Bob</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 可以修改对象的属性</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">person</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出: Bob</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">testConst</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<table>
<thead>
<tr>
<th>声明方式</th>
<th>作用域</th>
<th>提升情况</th>
<th>可重复声明</th>
<th>初始化要求</th>
<th>值可变性</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>var</code></td>
<td>函数作用域</td>
<td>变量提升</td>
<td>是</td>
<td>否</td>
<td>是</td>
</tr>
<tr>
<td><code v-pre>let</code></td>
<td>块级作用域</td>
<td>无提升</td>
<td>否</td>
<td>否</td>
<td>是</td>
</tr>
<tr>
<td><code v-pre>const</code></td>
<td>块级作用域</td>
<td>无提升</td>
<td>否</td>
<td>是</td>
<td>基本类型不可变，引用类型可修改内部属性</td>
</tr>
</tbody>
</table>
<p>在实际开发中，建议优先使用 <code v-pre>const</code> 声明常量，当需要重新赋值时使用 <code v-pre>let</code>，尽量避免使用 <code v-pre>var</code> 以减少潜在的问题。</p>
</div></template>


