<template>
  <div class="code-home-container">
    <div class="home-container">
      <div class="code-container">
        <pre><code class="language-tsx" ref="codeEl"></code></pre>
      </div>
      <div class="profile-container">
        <div class="profile-card">
          <router-link to="/blog/" class="profile-avatar"
            ><img
              src="https://zhenghaoyang.cn/avatar.jpg"
              alt="Hoey"
              class="profile-avatar"
            />
          </router-link>

          <div class="profile-name">Hoey</div>
          <div class="profile-slogan">Teacher, I'm on fire to improve!</div>
          <div class="profile-links-box">
            <a
              href="https://github.com/zhenghaoyang24"
              target="_blank"
              class="profile-links"
            >
              <icon class="profile-icon" name="grommet-icons:github" />
            </a>
            <a
              href="https://codepen.io/zhenghaoyang24"
              target="_blank"
              class="profile-links"
            >
              <icon class="profile-icon" name="simple-icons:codepen" />
            </a>
            <a
              href="mailto:zhenghaoyang24@foxmail.com"
              target="_blank"
              class="profile-links"
            >
              <icon
                class="profile-icon"
                name="streamline-flex:mail-send-email-message-circle-solid"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
hljs.registerLanguage("typescript", typescript);

import "../../styles/highlight-custom.css";
const codeEl = ref<HTMLElement | null>(null);

const reactCode = `export default function Profile() {

  // Profile data
  const avatar = 'https://zhenghaoyang.cn/avatar.jpg';
  const name = "Hoey";
  const slogan = "Teacher, I'm on fire to improve!";

  // Social links
  const links = [
    { label: 'GitHub', url: 'https://github.com/zhenghaoyang24' },
    { label: 'Gitee', url: 'https://gitee.com/zhenghaoyang24' },
    { label: 'CodePen', url: 'https://codepen.io/zhenghaoyang24' },
    { label: 'Email', url: 'mailto:zhenghaoyang24@foxmail.com' }
  ];

  // Open link in new tab
  const open = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Render profile
  return (
    <>
      <img src={avatar} alt="Hoey" />
      <p>{name}</p>
      <p>{slogan}</p>
      <div>
        {links.map(link => (
          <button key={link.label} onClick={() => open(link.url)}>
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
}`;

onMounted(() => {
  if (codeEl.value) {
    codeEl.value.textContent = reactCode;
    // 使用 typescript 语言高亮
    hljs.highlightElement(codeEl.value);
  }
});
</script>

<style scoped>
.code-home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* margin: 40px 0; */
}

.home-container {
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: auto;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  place-items: center;
}

.code-container {
  position: relative;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 12px;
  scrollbar-width: none;
  >pre{
    margin: 0;
  }
}

.language-tsx {
  padding: 0;
  width: 100%;
  background: none;
  font-size: 16px;
}

/* 自定义 highlight.js 高亮样式 */
pre {
  border-radius: 12px;
  padding: 1.4em;
  font-family: "Fira Code", "Consolas", monospace;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.4;
  overflow-x: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 确保代码块无额外 margin */
code {
  display: block;
}

.profile-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.profile-avatar {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 0 10px #00000077;
}

.profile-name {
  font-weight: bold;
  padding: 16px 0;
  font-size: 24px;
}

.profile-links-box {
  margin: 12px 0;
  display: flex;
}

.profile-links {
  font-size: 30px;
}

@media screen and (max-width: 770px) {
  .home-container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-container {
    position: absolute; /* 绝对定位，使其脱离文档流 */
    top: 50%; /* 垂直居中 */
    left: 50%; /* 水平居中 */
    transform: translate(-50%, -50%); /* 精确居中 */
    z-index: 2; 
    text-align: center;
  }

  .code-container {
    position: relative;
    z-index: 1; /* 确保 code-container 在下方 */
    max-height: calc( 100vh - 160px);
    height: auto;
    overflow-y: auto;
    width: 100%;
    border-radius: 12px;
    opacity: 0.6;
    filter: blur(1px);
  }

  .profile-avatar {
    width: 240px;
    height: 240px;
  }
}
</style>
