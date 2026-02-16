<script setup lang="ts">
import Button from "primevue/button";
import type { Project } from "~/data/projects";

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    class="group project-card min-w-[70vw] h-[60vh] rounded-3xl flex flex-col items-center justify-center border border-zinc-800 p-10 relative overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
    :style="{ background: project.gradient }"
  >
    <div class="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-700 z-10"></div>

    <img
      :src="project.mainImage"
      :alt="project.title"
      class="absolute z-20 w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter grayscale brightness-75 blur-[1px] drop-shadow-2xl transition-all duration-1000 ease-in-out group-hover:w-[200px] group-hover:left-[unset] group-hover:bottom-0 group-hover:right-5 group-hover:translate-x-0 group-hover:translate-y-16 group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-110"
    />

    <h3
      class="project-title-type text-4xl font-black text-white top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 group-hover:right-[unset] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-black group-hover:top-20 duration-1000 group-hover:left-10 ease-in-out font-borel absolute z-30 transition-all drop-shadow-lg group-hover:drop-shadow-none"
      :class="{
        'group-hover:text-zinc-700': project.id === 2,
      }"
    >
      {{ project.title }}
    </h3>

    <div class="w-[3px] h-0 transition-all duration-1000 delay-700 group-hover:h-full" :style="{ backgroundColor: project.accentColor }"></div>

    <h4
      class="absolute left-10 text-lg text-start text-zinc-700 leading-relaxed w-[45%] opacity-0 translate-y-10 transition-all duration-700 delay-1000 group-hover:opacity-100 group-hover:translate-y-0"
      :class="{
        'top-32': project.id !== 4,
        'top-28': project.id === 4,
      }"
    >
      {{ project.description }}
    </h4>

    <div class="absolute bottom-10 left-10">
      <div class="grid grid-cols-5 gap-4">
        <Button v-for="(tech, index) in project.techStack" :key="index" class="tech-icon" :class="`delay-[${400 + index * 100}ms]`" variant="text" raised>
          <img :src="tech" width="26" />
        </Button>
      </div>
    </div>

    <div
      v-if="project.image2 && project.image3"
      class="absolute top-0 -right-32 w-full h-[120%] z-10 pointer-events-none"
      :class="{
        'top-12': project.id === 4,
      }"
    >
      <img
        :src="project.image2"
        class="absolute w-3/5 top-20 right-0 translate-y-[500px] group-hover:rotate-[0deg] group-hover:translate-y-[-100px] transition-all duration-700"
        :class="{
          'right-52 w-2/5 group-hover:translate-y-[180px]': project.id === 2,
          'top-48': project.id === 3,
        }"
      />
      <img
        :src="project.image3"
        class="absolute top-0 w-3/5 -right-24 opacity-40 blur-[1px] group-hover:blur-0 z-20 translate-y-[500px] group-hover:opacity-100 group-hover:translate-y-[-100px] transition-all duration-500"
        :class="{
          '-right-56 w-3/4 group-hover:translate-y-[-250px]': project.id === 2,
          '-top-14': project.id === 3,
          '-top-28 -right-20': project.id === 4,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.tech-icon {
  @apply opacity-0 translate-y-10 transition-all duration-500 ease-out;
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 12px !important;
}

.group:hover .tech-icon {
  @apply opacity-100 translate-y-0;
}

.tech-icon:hover {
  transform: translateY(-5px) scale(1.1) !important;
  background: white !important;
}

.project-title-type {
  letter-spacing: -0.02em;
}
</style>
