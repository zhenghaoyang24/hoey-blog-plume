<template><div><div class="hint-container tip">
<p class="hint-container-title">问题</p>
<p>说一说盒模型有哪些？<br>
它们有生么区别？</p>
</div>
<hr>
<h3 id="盒模型简述" tabindex="-1"><a class="header-anchor" href="#盒模型简述"><span>盒模型简述</span></a></h3>
<p>在网页布局中，盒模型（Box Model）是一个非常基础且重要的概念。每一个 HTML 元素在页面中都会被看作一个矩形的盒子，这个盒子由内容区（Content）、
内边距（Padding）、边框（Border）和外边距（Margin）这几个部分组成。</p>
<hr>
<h3 id="盒模型的组成部分" tabindex="-1"><a class="header-anchor" href="#盒模型的组成部分"><span>盒模型的组成部分</span></a></h3>
<ul>
<li><strong>内容区（Content）</strong>：元素实际包含的内容，如文本、图片等，其大小由 <code v-pre>width</code> 和 <code v-pre>height</code> 属性控制（对于行内元素，宽度和高度由内容决定）。</li>
<li><strong>内边距（Padding）</strong>：内容区与边框之间的距离，可通过 <code v-pre>padding-top</code>、<code v-pre>padding-right</code>、<code v-pre>padding-bottom</code>、<code v-pre>padding-left</code> 分别设置四个方向的内边距，也可以使用 <code v-pre>padding</code> 简写属性。内边距会影响元素的整体大小。</li>
<li><strong>边框（Border）</strong>：围绕在内边距和内容区周围的线条，可通过 <code v-pre>border-width</code>、<code v-pre>border-style</code> 和 <code v-pre>border-color</code> 来定义边框的宽度、样式和颜色，同样也有简写属性 <code v-pre>border</code>。边框也会计入元素的整体大小。</li>
<li><strong>外边距（Margin）</strong>：元素与其他元素之间的距离，可通过 <code v-pre>margin-top</code>、<code v-pre>margin-right</code>、<code v-pre>margin-bottom</code>、<code v-pre>margin-left</code> 分别设置四个方向的外边距，也有 <code v-pre>margin</code> 简写属性。外边距不会影响元素自身的大小，但会影响元素在页面中的布局位置。</li>
</ul>
<hr>
<h3 id="盒模型的类型及区别" tabindex="-1"><a class="header-anchor" href="#盒模型的类型及区别"><span>盒模型的类型及区别</span></a></h3>
<p>在 <code v-pre>CSS</code> 中，盒模型主要分为标准盒模型（ <code v-pre>W3C</code> 规定）和怪异盒模型（<code v-pre>IE</code> 盒模型），它们的主要区别在于元素宽度和高度的计算方式不同。</p>
<h4 id="标准盒模型-content-box" tabindex="-1"><a class="header-anchor" href="#标准盒模型-content-box"><span>标准盒模型（content-box）</span></a></h4>
<img src="/assets/interview_boxmodel_01.png" style="height: 300px">
<ul>
<li><strong>计算方式</strong>：元素的宽度（<code v-pre>width</code>）和高度（<code v-pre>height</code>）只包含内容区的宽度和高度，不包含内边距、边框和外边距。也就是说，</li>
<li>如果设置一个元素的 <code v-pre>width</code> 为 200px，那么这个 200px 仅仅是内容区的宽度，元素实际占用的宽度还需要加上左右内边距和左右边框的宽度。</li>
</ul>
<h4 id="怪异盒模型-border-box" tabindex="-1"><a class="header-anchor" href="#怪异盒模型-border-box"><span>怪异盒模型（border-box）</span></a></h4>
<img src="/assets/interview_boxmodel_02.png" style="height: 300px">
<ul>
<li><strong>计算方式</strong>：元素的宽度（<code v-pre>width</code>）和高度（<code v-pre>height</code>）包含了内容区、内边距和边框的大小，</li>
<li>但不包含外边距。当设置元素的 <code v-pre>width</code> 为 200px 时，这 200px 是内容区、内边距和边框的总宽度。如果内边距和边框占用了一定的宽度，那么内容区的宽度就会相应减少。</li>
</ul>
</div></template>


