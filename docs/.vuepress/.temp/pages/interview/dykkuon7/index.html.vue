<template><div><div class="hint-container tip">
<p class="hint-container-title">问题</p>
<p>v-if 与 v-show的区别？</p>
</div>
<hr>
<p><code v-pre>v-if</code> 和 <code v-pre>v-show</code> 都是 Vue.js 中用于控制元素显示与隐藏的指令，但它们在实现方式、性能表现和使用场景上存在明显区别。</p>
<h3 id="_1-实现方式" tabindex="-1"><a class="header-anchor" href="#_1-实现方式"><span>1. 实现方式</span></a></h3>
<ul>
<li><strong>v-if</strong>：是一种条件渲染指令，它会根据表达式的值的真假来动态地添加或移除 DOM 元素。当表达式的值为 <code v-pre>true</code> 时，元素会被插入到 DOM 中；当表达式的值为 <code v-pre>false</code> 时，元素会从 DOM 中移除。</li>
<li><strong>v-show</strong>：则是通过修改元素的 <code v-pre>display</code> CSS 属性来控制元素的显示与隐藏。无论表达式的值是 <code v-pre>true</code> 还是 <code v-pre>false</code>，元素始终会存在于 DOM 中，只是当表达式的值为 <code v-pre>false</code> 时，元素的 <code v-pre>display</code> 属性会被设置为 <code v-pre>none</code>，使其在页面上不可见。</li>
</ul>
<h3 id="_2-性能表现" tabindex="-1"><a class="header-anchor" href="#_2-性能表现"><span>2. 性能表现</span></a></h3>
<ul>
<li><strong>v-if</strong>：由于涉及到 DOM 元素的添加和移除操作，这会带来较高的性能开销，尤其是在频繁切换显示状态时，会不断地触发 DOM 的重排和重绘，影响页面性能。不过，如果在初始渲染时条件为 <code v-pre>false</code>，那么对应的元素不会被渲染，这在某些情况下可以节省初始渲染的时间和资源。</li>
<li><strong>v-show</strong>：只是修改元素的 <code v-pre>display</code> 属性，不会触发 DOM 的添加和移除操作，因此切换显示状态的性能开销相对较低。但无论初始条件如何，元素都会被渲染到 DOM 中，这可能会增加初始渲染的时间和资源消耗。</li>
</ul>
<h3 id="_3-使用场景" tabindex="-1"><a class="header-anchor" href="#_3-使用场景"><span>3. 使用场景</span></a></h3>
<ul>
<li><strong>v-if</strong>：适用于在运行时很少改变条件，不需要频繁切换显示状态的场景。例如，根据用户的权限来决定是否显示某个功能模块，这种情况下权限信息通常在用户登录时就确定了，不会频繁改变，使用 <code v-pre>v-if</code> 可以避免不必要的 DOM 元素存在。</li>
<li><strong>v-show</strong>：适用于需要频繁切换显示状态的场景。例如，在一个表单中，根据用户的选择显示不同的输入框，这种情况下显示状态会频繁变化，使用 <code v-pre>v-show</code> 可以提高性能。</li>
</ul>
</div></template>


