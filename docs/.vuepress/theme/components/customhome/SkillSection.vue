<template>
  <div class="skill-section">
    <SectionTemplate title="Skills" description="Skills and tools">
      <div class="skill-content">
        <div class="marquee-content to-left" style="animation-duration: 140s">
          <!-- 第一份内容 -->
          <div class="skill-set">
            <span v-for="(item, index) in SKILLS1" :key="index" @click="openUrl(item.url)">
              <SkillIcon :name="item.icon" :size="SIZE" />
              <p>{{ item.name }}</p>
            </span>
          </div>
          <!-- 第二份内容（用于无缝衔接） -->
          <div class="skill-set">
            <span
              v-for="(item, index) in SKILLS1"
              :key="index + SKILLS1.length"
              @click="openUrl(item.url)"
            >
              <SkillIcon :name="item.icon" :size="SIZE" />
              <p>{{ item.name }}</p>
            </span>
          </div>
        </div>
        <div class="marquee-content to-right" style="animation-duration: 70s">
          <!-- 第一份内容 -->
          <div class="skill-set">
            <span v-for="(item, index) in SKILLS2" :key="index" @click="openUrl(item.url)">
              <SkillIcon :name="item.icon" :size="SIZE" />
              <p>{{ item.name }}</p>
            </span>
          </div>
          <!-- 第二份内容（用于无缝衔接） -->
          <div class="skill-set">
            <span
              v-for="(item, index) in SKILLS2"
              :key="index + SKILLS2.length"
              @click="openUrl(item.url)"
            >
              <SkillIcon :name="item.icon" :size="SIZE" />
              <p>{{ item.name }}</p>
            </span>
          </div>
        </div>
        <div class="marquee-content to-left" style="animation-duration: 30s">
          <!-- 第一份内容 -->
          <div class="skill-set">
            <span v-for="(item, index) in WORKFLOW" :key="index" @click="openUrl(item.url)">
              <SkillIcon :name="item.icon" :size="SIZE" />
              <p>{{ item.name }}</p>
            </span>
          </div>
          <!-- 第二份内容（用于无缝衔接） -->
          <div class="skill-set">
            <span
              v-for="(item, index) in WORKFLOW"
              :key="index + WORKFLOW.length"
              @click="openUrl(item.url)"
            >
              <SkillIcon :name="item.icon" :size="SIZE" />
              <p>{{ item.name }}</p>
            </span>
          </div>
        </div>
      </div>
    </SectionTemplate>
  </div>
</template>

<script setup lang="ts">
import SectionTemplate from "./components/SectionTemplate.vue";
import SkillIcon from "./components/SkillIcon.vue";
const SIZE = 22;

const SKILLS1 = [
  {
    id: 1,
    name: "HTML",
    icon: "logos:html-5",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    id: 2,
    name: "CSS",
    icon: "logos:css-3",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  { id: 3, name: "Sass", icon: "logos:sass", url: "https://sass-lang.com/" },
  { id: 4, name: "Less", icon: "logos:less", url: "https://lesscss.org/" },
  { id: 5, name: "Tailwind", icon: "logos:tailwindcss-icon", url: "https://tailwindcss.com/" },
  {
    id: 6,
    name: "JavaScript",
    icon: "vscode-icons:file-type-js",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: 7,
    name: "TypeScript",
    icon: "vscode-icons:file-type-typescriptdef",
    url: "https://www.typescriptlang.org/",
  },
  { id: 8, name: "Vue", icon: "logos:vue", url: "https://vuejs.org/" },
  { id: 9, name: "Pinia", icon: "logos:pinia", url: "https://pinia.vuejs.org/" },
  { id: 10, name: "React", icon: "logos:react", url: "https://react.dev/" },
  { id: 11, name: "Zustand", icon: "devicon:zustand", url: "https://zustand-demo.pmnd.rs/" },
  { id: 12, name: "React Router", icon: "devicon:reactrouter", url: "https://reactrouter.com/" },
  {
    id: 13,
    name: "Mini Program",
    icon: "tabler:brand-miniprogram",
    url: "https://developers.weixin.qq.com/miniprogram/dev/framework/",
  },
  { id: 14, name: "Electron", icon: "logos:electron", url: "https://www.electronjs.org/" },
  { id: 15, name: "Element Plus", icon: "logos:element", url: "https://element-plus.org/" },
  { id: 16, name: "Naive UI", icon: "logos:naiveui", url: "https://www.naiveui.com/" },
  { id: 17, name: "Ant Design", icon: "logos:ant-design", url: "https://ant.design/" },
  { id: 18, name: "Vuetify", icon: "logos:vuetifyjs", url: "https://vuetifyjs.com/" },
  { id: 19, name: "Bootstrap", icon: "logos:bootstrap", url: "https://getbootstrap.com/" },
  { id: 20, name: "Vite", icon: "devicon:vitejs", url: "https://vitejs.dev/" },
  { id: 21, name: "Webpack", icon: "logos:webpack", url: "https://webpack.js.org/" },
];

const SKILLS2 = [
  { id: 101, name: "NodeJS", icon: "vscode-icons:file-type-node", url: "https://nodejs.org/" },
  { id: 108, name: "Express", icon: "devicon:express", url: "https://expressjs.com/" },
  { id: 102, name: "Koa", icon: "simple-icons:koa", url: "https://koajs.com/" },
  { id: 105, name: "Java", icon: "devicon:java", url: "https://www.java.com/" },
  { id: 106, name: "Spring", icon: "devicon:spring", url: "https://spring.io/" },
  {
    id: 107,
    name: "Spring AI",
    icon: "custom:spring-ai",
    url: "https://spring.io/projects/spring-ai",
  },
  { id: 108, name: "MySQL", icon: "devicon:mysql", url: "https://www.mysql.com/" },
  { id: 109, name: "Netlify", icon: "devicon:netlify", url: "https://www.netlify.com/" },
  {
    id: 110,
    name: "Vercel",
    icon: "vscode-icons:file-type-light-vercel",
    url: "https://vercel.com/",
  },
  { id: 112, name: "Cloudflare", icon: "devicon:cloudflare", url: "https://www.cloudflare.com/" },
];

// 3. AI 赋能与极客工作流
const WORKFLOW = [
  {
    id: 201,
    name: "VSCode",
    icon: "vscode-icons:file-type-vscode",
    url: "https://code.visualstudio.com/",
  },
  { id: 202, name: "Cursor", icon: "devicon:cursor", url: "https://cursor.sh/" },
  { id: 203, name: "Trae", icon: "custom:trae", url: "https://trae.ai/" },
  { id: 204, name: "Claude Code", icon: "logos:claude-icon", url: "https://claude.ai/" },
  { id: 205, name: "ChatGPT", icon: "custom:chatgpt", url: "https://chat.openai.com/" },
  { id: 206, name: "DeepSeek", icon: "logos:deepseek-icon", url: "https://deepseek.com/" },
  {
    id: 207,
    name: "WebStorm",
    icon: "devicon:webstorm",
    url: "https://www.jetbrains.com/webstorm/",
  },
  { id: 208, name: "Obsidian", icon: "skill-icons:obsidian-dark", url: "https://obsidian.md/" },
  { id: 207, name: "VuePress", icon: "custom:vuepress", url: "https://vuepress.vuejs.org/" },
  { id: 209, name: "Git", icon: "devicon:git", url: "https://git-scm.com/" },
  { id: 210, name: "pnpm", icon: "vscode-icons:file-type-light-pnpm", url: "https://pnpm.io/" },
];

// 跳转方法
const openUrl = (url: string | undefined) => {
  if (url && url !== "#") {
    window.open(url, "_blank");
  }
};
</script>

<style scoped>
.skill-section {
  width: 100%;
}

.skill-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  overflow: hidden;
  @media (max-width: 770px) {
    gap: 12px; /* 小屏幕时减少间距 */
  }
}

.marquee-content {
  display: flex;
  gap: 20px;
  @media (max-width: 770px) {
    gap: 12px; /* 小屏幕时减少间距 */
  }
  width: fit-content;
  will-change: transform;
  &:hover {
    animation-play-state: paused; /* 鼠标悬停时暂停动画 */
  }
}

.skill-set {
  display: flex;
  gap: 20px; /* 每个 skill 图标之间的间距 */
  @media (max-width: 770px) {
    gap: 12px; /* 小屏幕时减少间距 */
  }
}

.skill-set span {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px 8px;
  background-color: var(--icon-bg);
  white-space: nowrap;
  cursor: pointer;
  > p {
    margin-left: 4px;
  }
  @media (max-width: 770px) {
    padding: 8px 6px;
    gap: 1px;
  }
}

.skill-set p {
  font-size: 0.9em;
  color: var(--vp-c-text-1);
}

/* 向左滚动 */
.to-left {
  animation: marquee-left linear infinite;
}

.to-right {
  animation: marquee-right linear infinite;
}

@keyframes marquee-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
