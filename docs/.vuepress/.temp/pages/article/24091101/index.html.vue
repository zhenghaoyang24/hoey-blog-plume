<template><div><p><a href="https://nodejs.cn/api/corepack.html" target="_blank" rel="noopener noreferrer">corepack</a>是一个nodejs自带的包管理器的管理工具，主要是用来管理诸多的包管理器的。当在多人开发环境中，不同开发者用的包管理器不同、版本不同，这时候就可以
用到 <code v-pre>corepack</code> 了。
现在<code v-pre>corepack</code>已经随 <code v-pre>node</code> 一起安装的，就如同npm一样，但如何使用 <code v-pre>corepack</code> 安装 <code v-pre>pnpm</code>，并在之后可以更换包管理器呢？</p>
<div class="language-npm" data-highlighter="shiki" data-ext="npm" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span>corepack enable</span></span>
<span class="line"><span>corepack install --global pnpm@latest</span></span></code></pre>
</div><p>在 <code v-pre>package.json</code> 中添加 <code v-pre>&quot;packageManager&quot;: &quot;pnpm@8.6.6&quot;</code>，删除 <code v-pre>node_modules</code> 并用 <code v-pre>pnpm</code>
重新安装依赖。之后如需换为 <code v-pre>npm</code> 则删除 <code v-pre>node_modules</code> ，<code v-pre>pnpm-lock.yml</code> ，<code v-pre>packageManager字段</code>，然后重新用
<code v-pre>npm</code> 安装依赖即可。</p>
</div></template>


