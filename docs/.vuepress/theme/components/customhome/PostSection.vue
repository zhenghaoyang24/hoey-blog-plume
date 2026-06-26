<template>
  <div class="post-section">
    <SectionTemplate title="Posts" description="My latest posts">
      <div class="post-container">
        <div v-for="post in recentPosts" :key="post.path" class="post-item">
          <div class="post-content">
            <div class="post-title">
              <span v-if="post?.sticky" class="sticky">TOP</span>
              <h3>
                <router-link :to="post.path">{{ post.title }}</router-link>
              </h3>
            </div>
            <div class="post-info">
              <div class="post-info-item" v-if="post.categoryList && post.categoryList.length > 0">
                <span class="icon vpi-folder"></span>
                <router-link
                  v-for="category in post.categoryList"
                  :to="'/blog/categories/?id=' + category.id"
                  >{{ category.name }}</router-link
                >
              </div>
              <div class="post-info-item" v-if="post.readingTime">
                <span class="icon vpi-books"></span>
                <span>{{ post.readingTime?.words }} words,</span>
                <span>{{ Math.ceil(post.readingTime?.minutes || 1) }} min</span>
              </div>
              <div class="post-info-item" v-if="post.tags && post.tags.length > 0">
                <span class="icon vpi-tag"></span>
                <router-link class="tag" v-for="tag in post.tags" :to="'/blog/tags/?tag=' + tag"
                  >{{ tag }}
                </router-link>
              </div>
              <div class="post-info-item">
                <span class="icon vpi-clock"></span>
                <span>{{
                  new Date(post.createTime).toLocaleDateString().replace(/\//g, "-")
                }}</span>
              </div>
            </div>
            <div class="post-excerpt-container">
              <div v-html="post.excerpt" class="vp-doc excerpt post-excerpt"></div>
            </div>
          </div>
          <div v-if="post.cover" class="post-cover">
            <img :src="post.cover" :alt="post.title" />
          </div>
        </div>
      </div>
      <div class="all-posts-link">
        <router-link to="/blog/">View all posts</router-link>
      </div>
    </SectionTemplate>
  </div>
</template>

<script setup lang="ts">
import SectionTemplate from "./components/SectionTemplate.vue";
import { computed } from "vue";
import { usePostsData } from "vuepress-theme-plume/composables";
import { sortByTime, sortBySticky } from "./composables/sort.ts";

const postsData = usePostsData();
const recentPosts = computed(() => {
  const posts = postsData.value["/blog/"];
  if (!posts || posts.length === 0) return [];

  // 按时间降序排序（最新的在前）
  const timeSorted = sortByTime(posts);

  // 再按 sticky 属性排序（sticky 的在前）
  const finalSorted = sortBySticky(timeSorted);

  return finalSorted.slice(0, 5);
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
  @media (max-width: 770px) {
    gap: 16px;
  }
}

.post-item {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  width: 100%;
  padding: 18px;
  padding-bottom: 6px;
  background-color: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 0 10px 2px var(--vp-blog-post-item-hover-shadow);
  border: 1px solid transparent;
  transition: all 0.2s ease-out;
  &:hover {
    border-color: var(--vp-blog-post-item-hover-border);
  }
  @media (max-width: 770px) {
    flex-direction: column-reverse;
  }
}

.post-content {
  display: grid;
  grid-template-columns: 1fr;
}

.post-title {
  display: flex;
  align-items: center;
  gap: 8px;
  > h3 {
    width: fit-content;
    color: var(--vp-c-text-1);
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover {
      color: var(--vp-c-brand-soft);
    }
  }
  > span {
    display: inline-block;
    padding: 3px 6px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    color: var(--vp-c-text-2);
    background-color: var(--vp-c-brand-soft);
    border-radius: 4px;
    box-sizing: border-box;
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
    border-color: var(--vp-c-brand-1);
  }
}

.post-excerpt {
  word-break: break-word;
  overflow-wrap: break-word;
}

.post-cover {
  width: 240px;
  flex-shrink: 0;
  img {
    object-fit: contain;
    width: 100%;
    transition: all 0.3s ease;
  }

  @media (max-width: 770px) {
    width: 80%;
  }
}
.post-item:hover .post-cover img {
  transform: scale(1.05);
}

.all-posts-link {
  margin-top: 20px;
  width: 100%;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--vp-shadow-1);
  position: relative;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: left;
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: var(--vp-c-brand-1);
    pointer-events: none;
    opacity: 0;
    transition: all 0.3s ease;
  }
  > a {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    color: var(--vp-c-brand-1);
    font-weight: 500;
    transition: color 0.3s ease;
    &:hover {
      color: white;
    }
  }
  &:hover::before {
    transform: scaleX(1);
    opacity: 1;
  }
}
</style>
