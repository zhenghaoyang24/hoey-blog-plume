<template><div><div class="hint-container tip">
<p class="hint-container-title">问题</p>
<p>vue2 与 vue3 有哪些区别？</p>
</div>
<hr>
<h3 id="_1-响应式系统" tabindex="-1"><a class="header-anchor" href="#_1-响应式系统"><span>1. 响应式系统</span></a></h3>
<ul>
<li><strong>Vue 2</strong>：基于 <code v-pre>Object.defineProperty()</code> 实现，通过劫持对象属性的 <code v-pre>getter</code> 和 <code v-pre>setter</code> 追踪变化。存在局限性，无法检测对象属性的添加或删除，对数组部分操作（如通过索引修改元素、修改数组长度）不能触发响应式更新。</li>
<li><strong>Vue 3</strong>：采用 <code v-pre>Proxy</code> 对象实现，能拦截对象多种操作，可全面追踪数据变化，解决了 Vue 2 响应式系统的局限，对对象属性的添加、删除及数组操作都能很好地进行响应式处理。</li>
</ul>
<h3 id="_2-组合式-api-与选项式-api" tabindex="-1"><a class="header-anchor" href="#_2-组合式-api-与选项式-api"><span>2. 组合式 API 与选项式 API</span></a></h3>
<ul>
<li><strong>Vue 2</strong>：使用选项式 API，通过 <code v-pre>data</code>、<code v-pre>methods</code>、<code v-pre>computed</code>、<code v-pre>watch</code> 等选项组织代码。组件逻辑复杂时，同一功能代码分散，降低了代码可读性和可维护性。</li>
<li><strong>Vue 3</strong>：引入组合式 API，有 <code v-pre>setup</code> 函数及一系列组合式函数，允许按逻辑功能组织代码，将相关代码放一起，提高了代码复用性和可维护性。</li>
</ul>
<h3 id="_3-生命周期钩子" tabindex="-1"><a class="header-anchor" href="#_3-生命周期钩子"><span>3. 生命周期钩子</span></a></h3>
<ul>
<li><strong>Vue 2</strong>：有 <code v-pre>beforeCreate</code>、<code v-pre>created</code>、<code v-pre>beforeMount</code>、<code v-pre>mounted</code>、<code v-pre>beforeUpdate</code>、<code v-pre>updated</code>、<code v-pre>beforeDestroy</code>、<code v-pre>destroyed</code> 等钩子函数。</li>
<li><strong>Vue 3</strong>：部分钩子名称改变，如 <code v-pre>beforeDestroy</code> 变为 <code v-pre>onBeforeUnmount</code>，<code v-pre>destroyed</code> 变为 <code v-pre>onUnmounted</code>；还可在 <code v-pre>setup</code> 中使用组合式 API 形式的生命周期钩子。</li>
</ul>
<h3 id="_4-性能优化" tabindex="-1"><a class="header-anchor" href="#_4-性能优化"><span>4. 性能优化</span></a></h3>
<ul>
<li><strong>Vue 2</strong>：虚拟 DOM 采用传统的 Diff 算法，在处理大规模数据更新时性能会受到一定影响。</li>
<li><strong>Vue 3</strong>：采用了静态提升、Patch Flag 等优化技术。静态提升可减少重复创建静态节点，Patch Flag 能精准标记动态节点，提高 Diff 算法效率，提升渲染性能。</li>
</ul>
<h3 id="_5-破坏性变更" tabindex="-1"><a class="header-anchor" href="#_5-破坏性变更"><span>5. 破坏性变更</span></a></h3>
<ul>
<li><code v-pre>v-model</code> 语法变更（默认使用 <code v-pre>modelValue</code> 替代 <code v-pre>value</code>）。</li>
<li>事件总线 (<span v-pre class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>o</mi><mi>n</mi><mi mathvariant="normal">/</mi></mrow><annotation encoding="application/x-tex">on/</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">o</span><span class="mord mathnormal">n</span><span class="mord">/</span></span></span></span>off) 被移除，推荐使用第三方库（如 <code v-pre>mitt</code>）。</li>
</ul>
<h3 id="_6-类型支持" tabindex="-1"><a class="header-anchor" href="#_6-类型支持"><span>6. 类型支持</span></a></h3>
<ul>
<li><strong>Vue 2</strong>：对 TypeScript 的支持相对较弱，使用时需要额外的配置和声明文件。</li>
<li><strong>Vue 3</strong>：从设计上就对 TypeScript 有更好的支持，组合式 API 能更自然地与 TypeScript 集成，代码类型更清晰。</li>
</ul>
</div></template>


