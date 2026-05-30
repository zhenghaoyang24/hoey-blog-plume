<template>
  <div class="post-section">
    <SectionTemplate title="Posts" description="My latest posts">
      <div class="post-container">
        <div v-for="post in recentPosts" :key="post.path" class="post-item">
          <h3>
            <router-link :to="post.path">{{ post.title }}</router-link>
          </h3>
          <div class="post-info">
            <div class="post-info-item">
              <span class="icon vpi-folder"></span>
              <router-link
                v-for="category in post.categoryList"
                :to="'/blog/categories/?id=' + category.id"
                >{{ category.name }}</router-link
              >
            </div>
            <div class="post-info-item">
              <span class="icon vpi-books"></span>
              <span>{{ post.readingTime?.words }} words,</span>
              <span>{{ Math.ceil(post.readingTime?.minutes || 1) }} min</span>
            </div>
            <div class="post-info-item">
              <span class="icon vpi-tag"></span>
              <router-link class="tag" v-for="tag in post.tags" :to="'/blog/tags/?tag=' + tag"
                >{{ tag }}
              </router-link>
            </div>
            <div class="post-info-item">
              <span class="icon vpi-clock"></span>
              <span>{{ new Date(post.createTime).toLocaleDateString().replace(/\//g, "-") }}</span>
            </div>
          </div>
          <div class="post-content-container">
            <div v-html="post.excerpt" class="vp-doc excerpt post-content"></div>
          </div>
        </div>
      </div>
    </SectionTemplate>
  </div>
</template>

<script setup lang="ts">
import SectionTemplate from "./components/SectionTemplate.vue";
import { computed, onMounted } from "vue";
import { useLocalePostList } from "vuepress-theme-plume/composables";

const postList = useLocalePostList();
const recentPosts = computed(() => {
  // 按创建时间倒序排列，取前 N 篇
  return [...postList.value]
    .sort((a, b) => {
      // createTime 格式为字符串
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
    })
    .slice(0, 5); // 取最近 5 篇
});

onMounted(() => {
  console.log("Recent Posts:", recentPosts.value);
});
</script>

<style scoped>
a {
  text-decoration: none;
  margin: 0;
  padding: 0;
}
.post-section {
  width: 100%;
}

.post-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.post-item {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  padding: 18px;
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 0 10px 2px var(--vp-blog-post-item-hover-shadow);
  border: 1px solid transparent;
  transition: all 0.2s ease-out;
  > h3 {
    color: var(--vp-c-text-1);
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: var(--vp-c-brand-1);
    }
  }
  &:hover {
    border-color: var(--vp-blog-post-item-hover-border);
  }
}

.post-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.post-info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  > a {
    &:hover {
      color: var(--vp-c-brand-2);
    }
  }
}

.tag {
  border-radius: 3px;
  padding: 0 5px;
  font-size: 12px;
  display: inline-block;
  align-items: center;
  line-height: 18px;
  border: 1px solid var(--line-color);
  transition: all 0.2s ease-out;
  &:hover {
    border-color: var(--vp-c-brand-2);
  }
}

.post-content {
  white-space: wrap;
  word-break: keep-all;
  unicode-bidi: isolate;
}
</style>
