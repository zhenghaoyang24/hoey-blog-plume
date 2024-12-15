<template><div><p>在 <code v-pre>webstorm</code> 中导入部分组件时 <code v-pre>IDE爆红</code>，运行正常，但会导致构建错误的解决办法。</p>
<!-- more -->  
<p>在使用 <code v-pre>webstorm</code> 开发 Vue3 + TS 项目时，编辑器一直有一个报错，因为不影响运行，所以就一直没在意，但有天准备部署到 <code v-pre>netlify</code>
时出现在 <code v-pre>build</code> 阶段出现错误，查看日志之后发现 <strong>找不到 .vue 的声明文件</strong> 的错误，同时错误指向
<code v-pre>import SearchInput from &quot;@/components/SearchInputResult.vue&quot;</code> ，随后尝试在 IDE 构建时也出现了相同的错误。</p>
<p><img src="/assets/24121401_01.png" alt="24121401_01.png"></p>
<p>最终找到错误原因为在 <code v-pre>.d.ts</code> 中缺少了对 <code v-pre>*.vue</code> 的 声明，解决办法是在 <code v-pre>env.d.ts</code> 加入以下代码：</p>
<div class="language-ts line-numbers-mode" data-ext="ts" data-title="ts"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">declare</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> module</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">*.vue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    import</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> type</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> ComponentOptions</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">vue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">    const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">comp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994">ComponentOptions</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> comp</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码是一个 TypeScript 的模块声明文件（通常以 <code v-pre>.d.ts</code> 扩展名保存），
用于告诉 <code v-pre>TypeScript</code> 编译器如何处理以 <code v-pre>.vue</code> 为后缀的模块导入。在使用 <code v-pre>Vue.js</code> 进行项目开发，
尤其是结合 <code v-pre>TypeScript</code> 时，<code v-pre>Vue</code> 单文件组件（<code v-pre>.vue</code> 文件）需要有相应的类型定义，
以便 <code v-pre>TypeScript</code> 能够正确理解其结构和类型，这段声明就是起到这样的作用。但为什么导入其他组件没有出现这样的错误？我还没有找到原因所在。</p>
</div></template>


