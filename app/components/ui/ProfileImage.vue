<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <div class="profile-wrapper relative">
    <div class="abs-shape shape-1"></div>
    <div class="abs-shape shape-2"></div>
    <div class="grid-box"></div>

    <img src="/images/profile-line.svg" alt="" class="lineprofile" />
    <div class="profile-container overflow-hidden">
      <img src="/images/new-portfolio-profile.png" class="profile-img-styled" :alt="name" />
      <img src="/images/profile-circle4.svg" alt="" class="circle4" />
      <img src="/images/profile-rectangle.svg" alt="" class="rectangle" />
      <img src="/images/profile-rectangle2.svg" alt="" class="rectangle2" />
    </div>
  </div>
</template>

<style scoped>
.profile-wrapper {
  position: relative;
  width: 396.8px;
  height: 541.28px;
}

.profile-container {
  width: 100%;
  z-index: 2;
}

.profile-img-styled {
  width: 100%;
  border-radius: 0px 0px 200px 200px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 36.29px 36.9px;
  filter: grayscale(20%) contrast(110%);
}

.abs-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: #561317;
  bottom: -50px;
  left: -50px;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: #561317;
  top: -50px;
  right: -50px;
}

.circle4 {
  position: absolute;
  bottom: 50px;
  left: 50%;
  height: 30px;
}

.lineprofile {
  position: absolute;
  top: 40px;
  left: -30px;
  height: 120px;
  z-index: 2;
}

.rectangle {
  position: absolute;
  bottom: 168px;
  left: 56px;
  height: 86px;
}

.rectangle2 {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 150px;
}
</style>
