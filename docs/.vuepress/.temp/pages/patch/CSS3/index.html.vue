<template><div><h2 id="_1-背景" tabindex="-1"><a class="header-anchor" href="#_1-背景"><span>1. 背景</span></a></h2>
<p><strong>box的区域：</strong><br>
<img src="/assets/patch_css3_01.jpg" alt="img.png"></p>
<Tabs id="6" :data='[{"id":"background-origin"},{"id":"background-clip"}]'>
<template #title0="{ value, isActive }">background-origin</template><template #title1="{ value, isActive }">background-clip</template><template #tab0="{ value, isActive }"><p><strong>作用</strong>：指定了背景图像的位置区域。<br>
<strong>属性值：</strong> content-box | padding-box | border-box</p>
</template><template #tab1="{ value, isActive }"><p><strong>作用</strong>：指定背景剪裁的开始位置。<br>
<strong>属性值：</strong> content-box | padding-box | border-box</p>
</template></Tabs><p><strong>CSS3允许在元素上添加多个背景图像:</strong></p>
<div class="language-css" data-ext="css" data-title="css"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">background-image</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">:url(xxx</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">png</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">),url(xxx</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">jpg</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">);</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">background-position</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: right bottom</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> left top;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">background-repeat</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">no-repeat</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> repeat;</span></span></code></pre>

</div><h2 id="_1-渐变" tabindex="-1"><a class="header-anchor" href="#_1-渐变"><span>1. 渐变</span></a></h2>
<h3 id="_1-线性渐变" tabindex="-1"><a class="header-anchor" href="#_1-线性渐变"><span>1. 线性渐变</span></a></h3>
</div></template>


