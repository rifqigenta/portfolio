<script setup lang="ts">
import ProjectCard from "../ui/ProjectCard.vue";
import type { Project } from "~/data/projects";

defineProps<{
  projects: Project[];
}>();

// Expose refs for GSAP animations
const aboutSection = ref(null);
const aboutTrack = ref(null);

defineExpose({
  aboutSection,
  aboutTrack,
});
</script>

<template>
  <section ref="aboutSection" class="h-screen flex flex-col justify-center">
    <h2 class="text-center text-4xl font-bold mb-10">Selected Projects</h2>
    <div class="overflow-hidden">
      <div ref="aboutTrack" class="flex gap-20 px-[10vw] w-fit">
        <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </div>
    </div>
  </section>
</template>
