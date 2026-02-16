<script setup lang="ts">
import ProfileImage from "../ui/ProfileImage.vue";
import SocialButtons from "../ui/SocialButtons.vue";

defineProps<{
  name: string;
}>();

// Expose refs for GSAP animations
const heroText = ref(null);
const heroImage = ref(null);

defineExpose({
  heroText,
  heroImage,
});
</script>

<template>
  <section class="hero-section relative min-h-screen flex items-center px-10 lg:px-24 overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-20 bg-grid-hero"></div>

    <div class="hero-content z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
      <div ref="heroText" class="space-y-4 mt-14">
        <div class="flex items-center gap-2">
          <span class="text-xl">Hi, I'm {{ name }}</span>
        </div>
        <h1 class="font-borel font-bold leading-tight pt-6">
          <span class="typewriter text-white"></span>
          <span class="cursor">|</span>
        </h1>
        <p class="text-gray-400 text-xl max-w-md italic font-borel">"Transforming complex logic into elegant, high-performance web experiences."</p>
        <hr class="w-[70%]" />
        <SocialButtons />
      </div>

      <div class="flex justify-center lg:justify-end">
        <ProfileImage ref="heroImage" :name="name" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background-image: linear-gradient(to right bottom, #000000, #010000, #030001, #040001, #060001, #090001, #0c0002, #0e0002, #120002, #150003, #170103, #1a0103);
}

.typewriter {
  font-family: "Borel", sans-serif !important;
  font-size: 4.5rem;
}

.cursor {
  font-family: "Borel", sans-serif !important;
  font-weight: 200;
  color: #3b82f6;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
