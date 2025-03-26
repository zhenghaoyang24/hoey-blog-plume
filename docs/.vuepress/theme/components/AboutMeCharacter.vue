<script setup>

</script>

<template>
<div class="about-me-card-bg vp-blog-post-item about-me-character">
  <p class="about-me-card-title-normal">性格</p>
  <div class="about-me-character-content">
    <div class="about-me-character-type">
      <p class="about-me-card-text-big about-me-card-text-color">提倡者</p>
      <p class="about-me-card-text-big">INFJ-A</p></div>
    <div class="about-me-character-img">
    </div>


  </div>

</div>
</template>

<style scoped>
.about-me-character{
  padding: 20px;

  &:hover .about-me-character-img{
    transform: scale(1.2);
  }
}

.about-me-character-content{
  display: flex;
  justify-content: space-between;

}

.about-me-character-type{
  width: 150px;
}

.about-me-character-img{
  position: relative;
  flex: 1;
  transition: transform 1s;
  min-width: 200px;
  min-height: 200px;
  background-image: url("https://www.16personalities.com/static/images/personality-types/avatars/email/large/INFJ_male.png?v=1");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
