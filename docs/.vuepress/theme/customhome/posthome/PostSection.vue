<template>
  <div class="post-section">
    <SectionTemplate index="文" title="The Writing" description="my latest posts">
      <div class="post-container" ref="postListRef">
        <article v-for="post in recentPosts" :key="post.path" class="post-item">
          <div class="post-content">
            <div class="post-title">
              <span v-if="post?.sticky" class="sticky">top</span>
              <h3>
                <router-link :to="post.path">{{ post.title }}</router-link>
              </h3>
            </div>
            <div class="post-info">
              <div class="post-info-item" v-if="post.categoryList && post.categoryList.length > 0">
                <span class="icon vpi-folder"></span>
                <router-link
                  v-for="category in post.categoryList"
                  :key="category.id"
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
                <span>{{ formatDate(post.createTime) }}</span>
              </div>
            </div>
            <div class="post-excerpt-container">
              <div v-html="post.excerpt" class="vp-doc excerpt post-excerpt"></div>
            </div>
          </div>
          <div v-if="post.cover" class="post-cover">
            <img :src="post.cover" :alt="post.title" />
          </div>
        </article>
      </div>
      <div class="all-posts-link">
        <router-link to="/blog/">view all posts <span class="arrow">→</span></router-link>
      </div>
    </SectionTemplate>
  </div>
</template>

<script setup lang="ts">
import SectionTemplate from "./components/SectionTemplate.vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
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

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

// 文章卡片逐项滚动显现：每个卡片进入视口时渐显，并依次错开 80ms
const postListRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let revealCount = 0;

onMounted(() => {
  const container = postListRef.value;
  if (!container || !("IntersectionObserver" in window)) return;
  const items = Array.from(container.querySelectorAll(".post-item"));
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer?.unobserve(entry.target);
        const delay = revealCount * 80;
        revealCount++;
        const item = entry.target as HTMLElement;
        if (delay > 0) {
          window.setTimeout(() => item.classList.add("is-revealed"), delay);
        } else {
          item.classList.add("is-revealed");
        }
      }
    },
    { threshold: 0.15 },
  );
  items.forEach((item) => observer?.observe(item));
});

onBeforeUnmount(() => observer?.disconnect());
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
  gap: 16px;
}

.post-item {
  display: flex;
  align-items: center;
  gap: 18px;
  overflow: hidden;
  width: 100%;
  padding: 20px;
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  border: 1px solid var(--ph-card-line);
  transition:
    opacity 0.55s ease,
    transform 0.55s ease,
    border-color 0.25s ease-out,
    box-shadow 0.25s ease-out;
  &:not(.is-revealed) {
    opacity: 0;
    transform: translateY(24px);
  }
  &:hover {
    transition-duration: 0.25s, 0.25s, 0.25s, 0.25s;
    border-color: var(--ph-accent);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px -14px rgba(0, 0, 0, 0.16);
  }
  @media (max-width: 770px) {
    flex-direction: column-reverse;
    padding: 16px;
  }
}

.post-content {
  display: grid;
  grid-template-columns: 1fr;
  min-width: 0;
}

.post-title {
  display: flex;
  align-items: center;
  gap: 10px;
  > h3 {
    width: fit-content;
    color: var(--vp-c-text-1);
    margin: 0;
    font-family: var(--ph-font-kai);
    font-size: 1.22rem;
    font-weight: 700;
    line-height: 1.4;
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover {
      color: var(--ph-accent);
    }
  }
  > .sticky {
    flex-shrink: 0;
    display: inline-block;
    padding: 3px 6px;
    font-family: var(--ph-font-mono);
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    line-height: 1.2;
    color: var(--ph-accent);
    background-color: var(--ph-soft);
    border-radius: 4px;
    box-sizing: border-box;
  }
}

.post-info {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.post-info-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: var(--ph-font-mono);
  font-size: 0.74rem;
  color: var(--vp-c-text-2);
  > .icon {
    opacity: 0.65;
  }
  > a {
    &:hover {
      color: var(--ph-accent);
    }
  }
}

.tag {
  border-radius: 3px;
  padding: 0 5px;
  font-size: 0.7rem;
  display: inline-block;
  align-items: center;
  line-height: 18px;
  border: 1px solid var(--ph-hairline);
  transition: all 0.2s ease-out;
  &:hover {
    border-color: var(--ph-accent);
  }
}

.post-excerpt-container {
  margin-top: 10px;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.post-excerpt {
  word-break: break-word;
  overflow-wrap: break-word;
}

.post-cover {
  width: 208px;
  height: 108px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid var(--ph-card-line);
  background-color: var(--ph-soft);
  overflow: hidden;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }
  @media (max-width: 770px) {
    width: 100%;
    height: 160px;
  }
}
.post-item:hover .post-cover img {
  transform: scale(1.04);
}

.all-posts-link {
  margin-top: 16px;
  width: 100%;
  background-color: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--ph-card-line);
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
    background-color: var(--ph-accent);
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
    gap: 8px;
    padding: 15px;
    font-family: var(--ph-font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ph-accent);
    transition: color 0.3s ease;
    .arrow {
      transition: transform 0.3s ease;
    }
    &:hover {
      color: white;
      .arrow {
        transform: translateX(4px);
      }
    }
  }
  &:hover::before {
    transform: scaleX(1);
    opacity: 1;
  }
}
</style>
