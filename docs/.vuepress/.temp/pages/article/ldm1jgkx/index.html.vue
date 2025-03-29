<template><div><p>这篇文章主要介绍零成本部署静态博客的三种方式：netlify, vercel, cloudflare。<br>
它们的主要优点为：当你的更新 push 到 Github 仓库后，托管站可自动拉取、构建、部署，无需再次手动操作，同时三个平台每月均有大量免费额度，对于
个人博客而言已经足够。</p>
<p>在这之前，你需要注册一个 <a href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a> 账号（必须），注册 <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">netlify</a>, <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer">vercel</a>, <a href="https://www.cloudflare-cn.com/" target="_blank" rel="noopener noreferrer">cloudflare</a> 账号，并注册一个域名（可选）。</p>
<h2 id="创建仓库" tabindex="-1"><a class="header-anchor" href="#创建仓库"><span>创建仓库</span></a></h2>
<p>首先你需要创建一个博客仓库用于存放你的内容，并把仓库的访问权限设置为 <code v-pre>public</code>，选择一个博客主题或模板、或自行开发一个博客主题，
并将代码推送到仓库中。这里我推荐本博客主题 <a href="https://theme-plume.vuejs.press/" target="_blank" rel="noopener noreferrer">vuepress-theme-plume</a> ，当然你可以选择其他主题。</p>
<p><img src="/assets/25032901_01.png" alt="25032301_01.png"></p>
<h2 id="平台托管" tabindex="-1"><a class="header-anchor" href="#平台托管"><span>平台托管</span></a></h2>
<p>三个平台的托管操作步骤基本类似，这里先以 <code v-pre>netlify</code> 为例。</p>
<p>进入 <code v-pre>netlify</code> 后点击侧边栏 <code v-pre>site</code> ，点击右边 <code v-pre>Add new site</code> ，选择 <code v-pre>Import an existing project</code>。</p>
<p><img src="/assets/25032901_02.png" alt="img.png"></p>
<p>点击 GitHub ，并通过必要的授权后，选择你的博客仓库。</p>
<p><img src="/assets/25032901_03.png" alt="img.png"></p>
<p>紧接着你需要进行一些必要配置则可开始部署，而这一步对于许多新手来说往往是最容易出错的。在三个部署平台当中，你都需要填写正确的
<code v-pre>Base directory</code>（跟路径）, <code v-pre>Build command</code>（构建命令）, <code v-pre>Output Directory</code>（输出目录），<code v-pre>Environment variables</code>（环境变量） 通常来说在你使用的主题文档里都有相应的说明，
<strong>各个主题的配置可能不同。</strong> 准确填写后便可以点击 <code v-pre>Deploy</code> 进行部署。</p>
<p>三个平台部署阶段均有 <strong>初始化、构建、部署 三个阶段</strong>，初始化阶段主要是下载依赖，构建阶段主要是构建静态文件，部署阶段则是将静态文件部署到托管站。配置信息的正确填写
是保证部署成功的关键因素，另外你还可能由于 依赖缺失、存在死链 等原因导致部署失败，你需要根据具体提示进行修复。</p>
<p>下面是 <code v-pre>Cloudflare</code> 与 <code v-pre>vercel</code> 的大体构建方式，操作较简单只进行文字说明。</p>
<p>在 <code v-pre>Cloudflare</code> 中，进入 <strong>账户主页</strong>， 点击 <strong>创建应用程序</strong>，选择 <code v-pre>Pages</code> 并 <strong>连接到Git</strong> ，选择你的博客仓库，填写配置信息。<br>
在 <code v-pre>vercel</code> 中，进入 <code v-pre>Overview</code>  点击，<code v-pre>Import Project</code> 或者 <code v-pre>Add New Project</code>，选择你的博客仓库，填写配置信息。</p>
<h2 id="自定义域名" tabindex="-1"><a class="header-anchor" href="#自定义域名"><span>自定义域名</span></a></h2>
<p>在三个平台部署成功后，平台会基于你输入的 项目名称（Cloudflare、vercel）或 Site name ( Netlify) 生成可访问的免费域名，后缀分别为
<code v-pre>pages.dev</code>、<code v-pre>vercel.app</code>、<code v-pre>netlify.app</code>。</p>
<p>其中<code v-pre>pages.dev</code> , <code v-pre>netlify.app</code> 虽然偶尔速度较慢，但仍然可用（<code v-pre>netlify.app</code> 两者间更快更稳定），但 <code v-pre>vercel.app</code> 在国内若不使用
<strong>VPN</strong> 几乎为无法访问状态，因此如果使用 <code v-pre>vercel</code> 进行部署，你需要自定义域名。</p>
<h3 id="vercel" tabindex="-1"><a class="header-anchor" href="#vercel"><span>vercel</span></a></h3>
<p>进入 <code v-pre>vercel</code> 选择你已经部署好的博客项目，点击 <code v-pre>Settings</code> ，在 <code v-pre>General</code> 中点击 <code v-pre>Domains</code> ，点击 <code v-pre>Add domain</code> ，输入你的域名。</p>
<p><img src="/assets/25032901_04.png" alt="img.png"></p>
<p>随后选择推荐的重定向类型并点击 <code v-pre>Add</code>：</p>
<p><img src="/assets/25032901_05.png" alt="img.png"></p>
<p>此时会出现 <code v-pre>Invalid Configuration</code> ，因为还未对域名进行映射。这时会提供一个 <code v-pre>CNAME</code> 与 A 记录 ，
你需要到你的域名解析服务商中添加对应的记录（<code v-pre>Type</code>、<code v-pre>Name</code>、<code v-pre>Value</code>），并等待生效。</p>
<p><img src="/assets/25032901_06.png" alt="img.png"></p>
</div></template>


