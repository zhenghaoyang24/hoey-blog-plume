<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-skill">
    <div style="margin-left: 20px">
      <p class="about-me-card-title-normal">技能</p>
      <p class="about-me-card-text-big">我的能力</p>
    </div>
    <!-- 第一行向左移动 -->
    <div class="marquee-row first-row">
      <div class="marquee-content">
        <span v-for="(item, index) in technology" :key="index"> <icon :name="item" /> </span>
        <span v-for="(item, index) in technology" :key="index + technology.length"><icon :name="item" /></span>
      </div>
    </div>

    <!-- 第二行向右移动 -->
    <div class="marquee-row second-row">
      <div class="marquee-content">
        <span v-for="(item, index) in tools" :key="index"><icon :name="item" /></span>
        <span v-for="(item, index) in tools" :key="index + tools.length"><icon :name="item" /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const technology = ref(['logos:vue', 'logos:pinia', 'vscode-icons:file-type-js', 'vscode-icons:file-type-typescriptdef',
'logos:less','logos:css-3','logos:html-5','devicon:spring','devicon:mysql']);
const tools = ref(['devicon:webstorm', 'devicon:maven','logos:intellij-idea', 'vscode-icons:file-type-vscode', 'devicon:vitejs',
'devicon:netlify','logos:npm','vscode-icons:file-type-light-pnpm','material-symbols:markdown']);
</script>

<style scoped>
.about-me-skill{
  padding: 20px 0;
}


.marquee-row {
  overflow: hidden;
  white-space: nowrap;
  transform: rotateZ(-8deg);
}

.marquee-content {
  display: inline-flex;
  animation: marquee-left 45s linear infinite;
  >span{
    border-radius: 20%;
    align-content: center;
    align-items: center;
    background-color: var(--about-me-skill-item-bg);
    width: 80px;
    height: 80px;
    font-size: 50px;
    margin: 0 10px;
  }

}
.first-row{
  margin-top: 20px;
}
.second-row{
  margin-top: 20px;
}
.second-row .marquee-content {
  animation: marquee-right 30s linear infinite;
}

@keyframes marquee-left {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

</style>
