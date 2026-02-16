<script setup lang="ts">
import HeroSection from "~/components/sections/HeroSection.vue";
import ExperienceTimeline from "~/components/sections/ExperienceTimeline.vue";
import ProjectsCarousel from "~/components/sections/ProjectsCarousel.vue";
import SkillsCube from "~/components/sections/SkillsCube.vue";
import { experience } from "~/data/experience";
import { skills } from "~/data/skills";
import { projects } from "~/data/projects";
import { useGsapAnimations } from "~/composables/useGsapAnimations";
import { useThreeScene } from "~/composables/useThreeScene";

// Disable SSR for Three.js
definePageMeta({
  layout: "default",
  ssr: false,
});

const name = "Rifqi Genta B.";

// Component refs
const heroSectionRef = ref<InstanceType<typeof HeroSection> | null>(null);
const timelineRef = ref<InstanceType<typeof ExperienceTimeline> | null>(null);
const projectsRef = ref<InstanceType<typeof ProjectsCarousel> | null>(null);
const skillsCubeRef = ref<InstanceType<typeof SkillsCube> | null>(null);

// Initialize composables
const { initAnimations, cleanup: cleanupAnimations } = useGsapAnimations();
const { initScene, cleanup: cleanupThreeScene } = useThreeScene();

onMounted(() => {
  // Wait for next tick to ensure refs are available
  nextTick(() => {
    // Initialize GSAP animations with refs from child components
    if (heroSectionRef.value && timelineRef.value && projectsRef.value) {
      initAnimations({
        heroText: heroSectionRef.value.heroText as any,
        heroImage: heroSectionRef.value.heroImage as any,
        timelineSection: timelineRef.value.timelineSection as any,
        timelineLine: timelineRef.value.timelineLine as any,
        timelineItems: timelineRef.value.timelineItems as any,
        aboutSection: projectsRef.value.aboutSection as any,
        aboutTrack: projectsRef.value.aboutTrack as any,
      });
    }

    // Initialize Three.js scene
    if (skillsCubeRef.value) {
      initScene(skillsCubeRef.value.canvas, skillsCubeRef.value.cubeSection, skills);
    }
  });
});

onUnmounted(() => {
  cleanupAnimations();
  cleanupThreeScene();
});
</script>

<template>
  <main class="text-white overflow-x-hidden">
    <HeroSection ref="heroSectionRef" :name="name" />
    <ExperienceTimeline ref="timelineRef" :experiences="experience" />
    <ProjectsCarousel ref="projectsRef" :projects="projects" />
    <SkillsCube ref="skillsCubeRef" />
  </main>
</template>
