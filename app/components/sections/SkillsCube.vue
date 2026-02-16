<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);
const cubeSection = ref<HTMLElement | null>(null);

defineExpose({
  canvas,
  cubeSection,
});
</script>

<template>
  <section ref="cubeSection" class="relative min-h-screen flex flex-col items-center justify-center bg-[#050505]">
    <div class="absolute z-20 pointer-events-none text-center">
      <h2 class="text-emerald-500 uppercase tracking-[0.5em] text-xs mb-4 opacity-70">Tech Stack Mastery</h2>
      <div id="skill-name-display" class="text-7xl font-black italic text-white min-h-[100px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase"></div>
    </div>

    <canvas ref="canvas" class="w-full h-full"></canvas>

    <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)]"></div>
  </section>
</template>

<style scoped>
#skill-name-display {
  font-family: "Inter", sans-serif;
  transition: all 0.3s ease-in-out;
}
</style>
