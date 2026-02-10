<template>
  <!-- <div ref="vantaRef" class="absolute inset-0 -z-10"></div>  -->
  <div ref="vantaRef" class="vanta-bg"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const vantaRef = ref<HTMLElement | null>(null);
let vantaEffect: any = null;

onMounted(async () => {
  if (!vantaRef.value) return;

  // Import Three.js first and make it available globally
  // Vanta uses window.THREE internally in its closure
  const THREE = await import("three");
  (window as any).THREE = THREE;

  // dynamic import (WAJIB biar aman di SSR)
  const VANTA = await import("vanta/dist/vanta.dots.min.js");

  // vantaEffect = VANTA.default({
  //   el: vantaRef.value,
  //   THREE,
  //   mouseControls: true,
  //   touchControls: true,
  //   gyroControls: false,
  //   minHeight: 200.0,
  //   minWidth: 200.0,
  //   scale: 1.0,
  //   scaleMobile: 1.0,
  //   color2: 0x9e1b1b,
  //   backgroundColor: 0xfafafa,
  //   showLines: false,
  // });
  vantaEffect = VANTA.default({
    el: vantaRef.value,
    THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    // minHeight: 200.0,
    // minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,

    // WARNA
    color: 0xb91c1c, // merah utama (glow titik)
    color2: 0x7f1d1d, // merah gelap
    backgroundColor: 0x0b0b0e, // hitam lembut (premium feel)

    showLines: false,
  });
});

onUnmounted(() => {
  if (vantaEffect) vantaEffect.destroy();
});
</script>
<style>
.vanta-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
}
</style>
