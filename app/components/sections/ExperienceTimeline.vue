<script setup lang="ts">
import Card from "primevue/card";
import type { Experience } from "~/data/experience";

defineProps<{
  experiences: Experience[];
}>();

// Expose refs for GSAP animations
const timelineSection = ref(null);
const timelineLine = ref(null);
const timelineItems = ref<HTMLElement[]>([]);

defineExpose({
  timelineSection,
  timelineLine,
  timelineItems,
});
</script>

<template>
  <section ref="timelineSection" class="bg-white text-black py-20 relative">
    <h2 class="text-center text-5xl font-bold mb-20">Experience</h2>
    <div class="timeline-container relative max-w-5xl mx-auto px-4">
      <div class="timeline-axis">
        <div ref="timelineLine" class="timeline-line-fill"></div>
      </div>
      <div
        v-for="(item, i) in experiences"
        :key="i"
        :ref="
          (el) => {
            if (el) timelineItems[i] = el as HTMLElement;
          }
        "
        :class="['timeline-item mb-20 flex w-full', i % 2 === 0 ? 'justify-start' : 'justify-end']"
      >
        <div class="timeline-card-wrapper w-[45%]">
          <Card class="timeline-card">
            <template #title>
              <span class="font-bold">{{ item.name }}</span>
            </template>
            <template #subtitle>{{ item.company }}</template>
            <template #content>
              <p class="text-sm">{{ item.desc }}</p>
            </template>
          </Card>
        </div>
        <div class="timeline-dot-center shadow-md">
          <i :class="item.icon"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-axis {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 100%;
  background: #f0f0f0;
}

.timeline-line-fill {
  width: 100%;
  height: 100%;
  background: #0a0a0a;
  transform: scaleY(0);
  transform-origin: top;
}

.timeline-dot-center {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 20px);
  width: 50px;
  height: 50px;
  background: white;
  border: 4px solid #0a0a0a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.timeline-card {
  border-radius: 10px;
  background: #ffffff;
  color: #0a0a0a;
  box-shadow:
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
}
</style>
