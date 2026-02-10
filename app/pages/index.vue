<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { TextPlugin } from "gsap/TextPlugin";

// Matikan SSR karena Three.js butuh akses langsung ke DOM/Window
definePageMeta({
  layout: "default",
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const name = "Rifqi Genta B.";

/* ====================== REFS ====================== */
const heroText = ref(null);
const heroImage = ref(null);
const shapeSquare = ref(null);
const shapeCurve = ref(null);
const bgLayer = ref(null);
const aboutSection = ref(null);
const aboutTrack = ref(null);
const timelineSection = ref(null);
const timelineLine = ref(null);
const timelineItems = ref([]);
const cubeSection = ref(null);
const canvas = ref(null);

/* ====================== DATA ====================== */
const experience = [
  { id: 1, name: "Fullstack Programmer", company: "PT. Horus Technology", desc: "Developed and maintained ERP systems using Vue.js, Python and PostgreSQL.", icon: "pi pi-briefcase" },
  { id: 2, name: "Web development Mentee", company: "Infinite Learning", desc: "Hands-on experience in UI/UX and Fullstack implementation.", icon: "pi pi-graduation-cap" },
  { id: 3, name: "Practicum Lab Assistant", company: "Amikom University", desc: "Assisted students during algorithm and programming sessions.", icon: "pi pi-briefcase" },
  { id: 4, name: "GPA : 3.82/4.00", company: "Amikom University", desc: "Academic Excellence.", icon: "pi pi-graduation-cap" },
];

const skills = [
  { name: "Vue.js", icon: "/icons/vue.png" },
  { name: "React.js", icon: "/icons/react.png" },
  { name: "JavaScript", icon: "/icons/javascript.png" },
  { name: "TypeScript", icon: "/icons/typescript.png" },
  { name: "Tailwind", icon: "/icons/tailwind.png" },
  { name: "Nuxt.js", icon: "/icons/nuxt.png" },
];

let ctx: any; // GSAP Context

/* ====================== THREE.JS LOGIC (Floating Icons) ====================== */
// const initThreeScene = () => {
//   if (!canvas.value || !cubeSection.value) return;

//   const scene = new THREE.Scene();
//   const { width, height } = cubeSection.value.getBoundingClientRect();
//   const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//   camera.position.z = 5;

//   const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true });
//   renderer.setSize(width, height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//   const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//   scene.add(ambientLight);

//   const loader = new THREE.TextureLoader();
//   const iconGroups = new THREE.Group();
//   scene.add(iconGroups);

//   // Buat banyak floating icons
//   skills.forEach((skill) => {
//     const texture = loader.load(skill.icon);
//     const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
//     const geometry = new THREE.PlaneGeometry(0.8, 0.8);

//     // Buat beberapa instance per icon biar rame
//     for (let i = 0; i < 2; i++) {
//       const mesh = new THREE.Mesh(geometry, material);
//       mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5);
//       iconGroups.add(mesh);

//       // GSAP Floating Animation per Mesh
//       gsap.to(mesh.position, {
//         x: `+=${(Math.random() - 0.5) * 2}`,
//         y: `+=${(Math.random() - 0.5) * 2}`,
//         duration: 3 + Math.random() * 2,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });
//     }
//   });

//   // Scroll Interaction: Rotate group on scroll
//   ScrollTrigger.create({
//     trigger: cubeSection.value,
//     start: "top bottom",
//     end: "bottom top",
//     scrub: 2,
//     onUpdate: (self) => {
//       iconGroups.rotation.y = self.progress * Math.PI * 2;
//       iconGroups.rotation.z = self.progress * Math.PI;
//     },
//   });

//   const animate = () => {
//     renderer.render(scene, camera);
//     requestAnimationFrame(animate);
//   };
//   animate();

//   // Resize handler
//   const handleResize = () => {
//     const { width, height } = cubeSection.value!.getBoundingClientRect();
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
//     renderer.setSize(width, height);
//   };
//   window.addEventListener("resize", handleResize);
// };
/* ====================== THREE.JS LOGIC (Chaos to Order) ====================== */
const initThreeScene = () => {
  if (!canvas.value || !cubeSection.value) return;

  const scene = new THREE.Scene();
  const { width, height } = cubeSection.value.getBoundingClientRect();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const loader = new THREE.TextureLoader();
  const meshes: THREE.Mesh[] = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Raycaster hover state
  const hoveredSkill = ref("");

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5); // Cahaya dari pojok atas untuk shadow
  scene.add(pointLight);

  skills.forEach((skill, i) => {
    const texture = loader.load(skill.icon);

    // 1. Pake BoxGeometry tipis biar ada "kedalaman" (depth)
    const geometry = new THREE.BoxGeometry(1.2, 1.2, 0.1);

    // 2. Gunakan MeshStandardMaterial untuk efek material nyata
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      color: 0xffffff, // Warna dasar putih (neumorphism style)
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // 1. POSISI AWAL (ACAK/CHAOS)
    mesh.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10);
    mesh.userData = { name: skill.name }; // Simpan nama buat hover

    // 2. POSISI TARGET (RAPI/GRID)
    const columns = 3;
    const spacing = 2.5;
    const targetX = (i % columns) * spacing - ((columns - 1) * spacing) / 2;
    const targetY = -Math.floor(i / columns) * spacing + 1.5;

    // 3. ANIMASI SCROLL (Chaos -> Order)
    gsap.to(mesh.position, {
      x: targetX,
      y: targetY,
      z: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: cubeSection.value,
        start: "top center", // Mulai rapi pas section masuk tengah layar
        end: "top top", // Selesai rapi pas section full di layar
        scrub: 1.5,
      },
    });

    scene.add(mesh);
    meshes.push(mesh);
  });

  // HOVER LOGIC
  const onMouseMove = (event: MouseEvent) => {
    const rect = canvas.value!.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const name = intersects[0].object.userData.name;
      const el = document.getElementById("skill-name-display");
      if (el) el.innerText = name;
      const obj = intersects[0].object as THREE.Mesh;
      hoveredSkill.value = obj.userData.name;
      document.body.style.cursor = "pointer";
      // Animasi kecil pas hover
      gsap.to(obj.scale, { x: 1.2, y: 1.2, duration: 0.3 });
    } else {
      const el = document.getElementById("skill-name-display");
      if (el) el.innerText = "";
      hoveredSkill.value = "";
      document.body.style.cursor = "default";
      meshes.forEach((m) => gsap.to(m.scale, { x: 1, y: 1, duration: 0.3 }));
    }
  };

  window.addEventListener("mousemove", onMouseMove);

  const animate = () => {
    // Tambahin dikit rotasi biar tetep ada aura "floating"
    meshes.forEach((m, i) => {
      m.rotation.y = Math.sin(Date.now() * 0.001 + i) * 0.1;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  // Expore hoveredSkill ke template lewat return atau defineExpose jika perlu
  // Tapi karena ini di dalam script setup, kita pake cara simpel aja di bawah
  (window as any).setHoveredName = (val: string) => {
    const el = document.getElementById("skill-name-display");
    if (el) el.innerText = val;
  };
};

/* ====================== LIFECYCLE ====================== */
onMounted(() => {
  // Gunakan GSAP Context untuk memudahkan cleanup
  ctx = gsap.context(() => {
    // TYPEWRITER EFFECT
    const roles = ["Software Developer", "Frontend Developer", "Fullstack Programmer"];
    let masterTl = gsap.timeline({ repeat: -1 });

    roles.forEach((role) => {
      let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1.5 });
      tl.to(".typewriter", { duration: 1.5, text: role, ease: "none" });
      masterTl.add(tl);
    });

    // PARALLAX HERO (Updated)
    gsap.to(".hero-content", {
      yPercent: -20,
      scrollTrigger: { trigger: ".hero-section", scrub: true },
    });

    // Animasi masuk untuk profile container
    gsap.from(".profile-container", {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    // 1. Hero Parallax
    gsap.to(heroText.value, { y: -100, scrollTrigger: { trigger: "body", scrub: true } });
    gsap.to(heroImage.value, { y: 50, scrollTrigger: { trigger: "body", scrub: true } });

    // 2. Timeline Animation
    gsap.to(timelineLine.value, {
      scaleY: 1,
      scrollTrigger: { trigger: timelineSection.value, start: "top center", end: "bottom center", scrub: true },
    });

    timelineItems.value.forEach((item: any, i: number) => {
      gsap.from(item.querySelector(".timeline-card"), {
        x: i % 2 === 0 ? -100 : 100,
        opacity: 0,
        scrollTrigger: { trigger: item, start: "top 80%", end: "top 50%", scrub: true },
      });
    });

    // 3. Horizontal Scroll (Projects)
    const totalWidth = aboutTrack.value.scrollWidth;
    gsap.to(aboutTrack.value, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: aboutSection.value,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: true,
        pin: true,
      },
    });

    // 4. ThreeJS
    initThreeScene();
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert(); // Hapus semua animasi & trigger
});
</script>

<template>
  <main class="text-white overflow-x-hidden">
    <section class="hero-section relative min-h-screen flex items-center px-10 lg:px-24 overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20 bg-grid-hero"></div>

      <div class="hero-content z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
        <div ref="heroText" class="space-y-4 mt-14">
          <div class="flex items-center gap-2">
            <span class="text-xl">Hi, I'm Rifqi Genta B.</span>
          </div>
          <h1 class="font-borel font-bold leading-tight pt-6">
            <span class="typewriter text-white"></span>
            <span class="cursor">|</span>
          </h1>
          <p class="text-gray-400 text-xl max-w-md italic font-borel">"Transforming complex logic into elegant, high-performance web experiences."</p>
          <hr class="w-[70%]" />
          <div class="flex gap-4">
            <Button class="btn-linkedin" variant="outlined" severity="secondary"><i class="pi pi-linkedin text-2xl"></i></Button>
            <Button class="btn-instagram" variant="outlined" severity="secondary"><i class="pi pi-instagram text-2xl"></i></Button>
            <Button class="btn-github" variant="outlined" severity="secondary"><i class="pi pi-github text-2xl"></i></Button>
          </div>
        </div>

        <div class="flex justify-center lg:justify-end">
          <div class="profile-wrapper relative">
            <div class="abs-shape shape-1"></div>
            <div class="abs-shape shape-2"></div>
            <div class="grid-box"></div>

            <img src="../assets/images/profile-line.svg" alt="" class="lineprofile" />
            <div ref="heroImage" class="profile-container overflow-hidden">
              <img src="../assets/images/new-portfolio-profile.png" class="profile-img-styled" alt="Profile" />
              <img src="../assets/images/profile-circle4.svg" alt="" class="circle4" />
              <img src="../assets/images/profile-rectangle.svg" alt="" class="rectangle" />
              <img src="../assets/images/profile-rectangle2.svg" alt="" class="rectangle2" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="timelineSection" class="bg-white text-black py-20 relative">
      <h2 class="text-center text-5xl font-bold mb-20">Experience</h2>
      <div class="timeline-container relative max-w-5xl mx-auto px-4">
        <div class="timeline-axis">
          <div ref="timelineLine" class="timeline-line-fill"></div>
        </div>
        <div
          v-for="(item, i) in experience"
          :key="i"
          :ref="
            (el) => {
              if (el) timelineItems[i] = el;
            }
          "
          :class="['timeline-item mb-20 flex w-full', i % 2 === 0 ? 'justify-start' : 'justify-end']"
        >
          <div class="timeline-card-wrapper w-[45%]">
            <Card class="timeline-card">
              <template #title
                ><span class="font-bold">{{ item.name }}</span></template
              >
              <template #subtitle>{{ item.company }}</template>
              <template #content
                ><p class="text-sm">{{ item.desc }}</p></template
              >
            </Card>
          </div>
          <div class="timeline-dot-center shadow-md"><i :class="item.icon"></i></div>
        </div>
      </div>
    </section>

    <section ref="aboutSection" class="h-screen bg-black flex flex-col justify-center">
      <h2 class="text-center text-4xl font-bold mb-10">Selected Projects</h2>
      <div class="overflow-hidden">
        <div ref="aboutTrack" class="flex gap-20 px-[10vw]">
          <div v-for="i in 4" :key="i" class="project-card min-w-[70vw] h-[60vh] bg-zinc-900 rounded-3xl flex items-center justify-center border border-zinc-800">
            <h3 class="text-4xl">Project #{{ i }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- <section ref="cubeSection" class="relative h-screen flex flex-col items-center justify-center bg-black">
      <h2 class="absolute top-20 text-4xl font-bold z-10">Tech Stack Mastery</h2>
      <canvas ref="canvas" class="w-full h-full"></canvas>
    </section> -->
    <section ref="cubeSection" class="relative h-screen flex flex-col items-center justify-center bg-white">
      <div class="absolute z-20 pointer-events-none text-center">
        <h2 class="text-gray-500 uppercase tracking-widest text-sm mb-2">Tech Stack Mastery</h2>
        <div id="skill-name-display" class="text-6xl font-black italic text-white min-h-[80px]"></div>
      </div>

      <canvas ref="canvas" class="w-full h-full"></canvas>
    </section>
  </main>
</template>

<style scoped>
/* Reset & Base */
.hero-section {
  background-image: linear-gradient(to right bottom, #000000, #010000, #030001, #040001, #060001, #090001, #0c0002, #0e0002, #120002, #150003, #170103, #1a0103);
}

/* Typewriter Cursor */
.typewriter {
  font-family: "Borel", sans-serif !important; /* Gunakan !important untuk overwrite default */
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

.btn-linkedin:hover {
  background: #0077b5 !important;
  color: white !important;
  border-color: #0077b5 !important;
  box-shadow: 0 0 15px #0077b566;
}
.btn-instagram:hover {
  background: #e1306c !important;
  color: white !important;
  border-color: #e1306c !important;
  box-shadow: 0 0 15px #e1306c66;
}
.btn-github:hover {
  background: #ffffff !important;
  color: #000 !important;
  border-color: #ffffff !important;
  box-shadow: 0 0 15px #ffffff66;
}

/* Profile Container (Semicircle style) */
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

/* Abstract Elements (Mirip Gambar) */
.grid-boxz {
  position: absolute;
  top: -20px;
  left: -40px;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(#3b82f6 2px, transparent 2px);
  background-size: 20px 20px;
  z-index: 1;
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

.hire-me-btn {
  padding: 16px 32px;
  background: #ff7e5f; /* Warna coral mirip gambar */
  color: white;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.3s;
}
.hire-me-btn:hover {
  transform: scale(1.05);
}
.profile-img {
  width: 80%;
  border-radius: 0px 0px 200px 200px;
  background-image: linear-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.6) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Timeline Custom Styles */
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

/* Shapes */
.shape {
  position: absolute;
  border: 2px solid #3b82f6;
  opacity: 0.5;
}
.square {
  width: 50px;
  height: 50px;
  bottom: 10%;
  right: -20px;
  transform: rotate(15deg);
}
.curve {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  top: -20px;
  left: -30px;
}

/* Grid Background */
.bg-grid {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(#ffffff10 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: -1;
}
</style>
