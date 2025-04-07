<script setup>
import FRIENDS from '../data/friends.json'
</script>

<template>
  <div class="friends-content">
    <a :href="item.link" target="_blank" class="vp-blog-post-item friend-item" v-for="(item, index) in FRIENDS"
       :key="index">
      <img :src="item.avatar" alt="头像">
      <div>
        <p class="friend-item-name">{{ item.name }}</p>
        <p class="friend-item-desc">{{ item.desc }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.friends-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  @media screen and (max-width: 770px) {
    grid-template-columns: 1fr;
  }

  > a {
    text-decoration: none;
  }
}

.friend-item {
  border-radius: 10px;
  padding: 0 10px;
  background-color: var(--main-card-background);
  border: 1px solid var(--main-card-border);
  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    border-radius: 10px;
    width: 80px;
    height: 80px;
  }

  > div {
    margin-left: 10px;
    flex: 1;
    display: block;
  }
}

.friend-item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--vp-c-text-1);
}

.friend-item-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--vp-c-text-2);
}
</style>
