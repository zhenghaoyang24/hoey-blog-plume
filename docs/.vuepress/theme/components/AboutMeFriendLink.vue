<script setup>
import FRIENDS from '../data/friends.json'
</script>

<template>
  <div class="about-me-card-bg vp-blog-post-item about-me-friends">
    <p class="about-me-card-title-normal">友情链接</p>
    <div class="about-me-friends-title">
      <p class="about-me-card-text-big about-me-card-text-color">我的好友们</p>
      <router-link to="/more/friends/">
        <icon name="game-icons:three-friends"/>
        所有好友
      </router-link>
    </div>
    <div class="about-me-friends-content">
      <a :href="item.link" target="_blank" class="about-me-friends-item" v-for="(item, index) in FRIENDS" :key="index"
         :title="item.name+':'+item.link">
        <img :src="item.avatar" alt="头像">
      </a>
    </div>
  </div>
</template>

<style scoped>
.about-me-friends-item {
  user-select: none;
  cursor: pointer;
  position: relative;
  border-radius: 20%;
  width: 80px;
  height: 80px;
  overflow: hidden;
  margin: 10px;

  &:hover > img {
    transform: scale(1.2);
  }

  @media screen and (max-width: 770px) {
    margin: 5px;
    width: 60px;
    height: 60px;
  }

  > img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;
  }
}

.about-me-friends-content {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  max-height: 300px;
  line-height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 770px) {
    max-height: 200px;
  }
}

.about-me-friends {
  padding: 20px;
  overflow: inherit;
}

.about-me-friends-title {
  display: flex;
  justify-content: space-between;

  > a {
    font-size: 16px;
    color: var(--vp-c-text-1);
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    border-radius: 10px;
    padding: 10px;
    height: 40px;
    transition: background-color 0.2s;
    background: var(--vp-c-brand-2);

    &:hover {
      background: var(--vp-c-brand-1);
    }

    @media screen and (max-width: 770px) {
      padding: 7px;
      font-size: 14px;
      height: 30px;
      border-radius: 5px;
    }
  }

  > p {
    display: inline-flex;
  }
}
</style>
