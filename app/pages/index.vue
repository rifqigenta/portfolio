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
  { name: "Vue.js", icon: "/icons/three/vue.png" },
  { name: "React.js", icon: "/icons/three/react.png" },
  { name: "JavaScript", icon: "/icons/javascript.png" },
  { name: "TypeScript", icon: "/icons/typescript.png" },
  { name: "Tailwind", icon: "/icons/three/tailwind.png" },
  { name: "Nuxt.js", icon: "/icons/three/nuxt.png" },
  { name: "Bootstrap", icon: "/icons/three/bootstrap.png" },
  { name: "BigTable", icon: "/icons/Bigtable.png" },
  { name: "BigQuery", icon: "/icons/BigQuery.png" },
  { name: "Vertex AI", icon: "/icons/Vertex AI.png" },
  { name: "Flask", icon: "/icons/three/flask.png" },
  { name: "Git", icon: "/icons/three/git.png" },
  { name: "MySQL", icon: "/icons/three/mysql.png" },
  { name: "PostgreSQL", icon: "/icons/three/postgresql.png" },
  { name: "Python", icon: "/icons/three/python.png" },
  { name: "Pinia", icon: "/icons/three/pinia.png" },
  { name: "Socket.io", icon: "/icons/three/socket-io.png" },
  { name: "Express", icon: "/icons/three/express.png" },
  { name: "SSE", icon: "/icons/three/sse.png" },
];
const getImageUrl = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};
const projects = [
  {
    id: 1,
    title: "Project Alpha",
    bg: "background-image: linear-gradient(to right bottom, #ffffff, #fbfcff, #f3fbff, #e9faff, #dff9fd, #ccf1f2, #bae9e5, #aae1d6, #89d0c0, #67bfaa, #42ae93, #009d7b);",
    imageName: "yayiha.png",
    // content2: "/assets/images/yayiha cover.png",
  },
  {
    id: 2,
    title: "Project Beta",
    bg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  },
  { id: 3, title: "Project Gamma", bg: "#009d7b" }, // Solid color juga bisa
  // { id: 4, title: "Project Delta", bg: "url('/images/yayiha cover.jpg') center/cover" },
];

let ctx: any; // GSAP Context
/* ====================== THREE.JS LOGIC (Chaos to Order) ====================== */
import { RoundedBoxGeometry } from "three-stdlib"; // Import ini di bagian atas script

const initThreeScene = () => {
  if (!canvas.value || !cubeSection.value) return;

  const scene = new THREE.Scene();
  const { width, height } = cubeSection.value.getBoundingClientRect();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  // camera.position.z = 8;
  camera.position.set(-4, -2, 7);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const loader = new THREE.TextureLoader();
  const meshes: THREE.Mesh[] = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // --- LIGHTING (Kunci Neumorphism adalah bayangan lembut) ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Cahaya dasar
  scene.add(ambientLight);

  const frontLight = new THREE.DirectionalLight(0xffffff, 1);
  // frontLight.position.set(2, 2, 5); // Cahaya dari depan agak samping
  frontLight.position.set(0, 10, 10); // Cahaya dari depan agak samping
  frontLight.intensity = 1.5;
  scene.add(frontLight);

  const backLight = new THREE.PointLight(0xffffff, 0.5);
  backLight.position.set(-5, -5, -2); // Cahaya lemah dari belakang untuk depth
  scene.add(backLight);

  skills.forEach((skill, i) => {
    const texture = loader.load(skill.icon);

    // 1. Geometri dengan sudut bulat (lebar, tinggi, tebal, segmen, radius)
    // Radius 0.1 di Three.js sudah terlihat seperti 10px-15px di CSS
    const geometry = new RoundedBoxGeometry(1, 1, 0.4, 4, 0.1);

    // 2. Material Putih Bersih dengan tekstur ikon di depannya
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff, // Warna putih dasar
      map: texture, // Ikon tetap muncul di tengah
      roughness: 0.15, // Agar ada sedikit kilauan halus
      metalness: 0.05,
    });

    const mesh = new THREE.Mesh(geometry, material);

    // POSISI AWAL (Chaos)
    mesh.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10);
    mesh.rotation.set(Math.random(), Math.random(), 0);
    mesh.userData = {
      name: skill.name,
    };

    // POSISI TARGET (Grid)
    const columns = 5;
    const spacingX = 1.2;
    const spacingY = 1.2;
    // const targetX = (i % columns) * spacingX - ((columns - 1) * spacingX) / 2;
    // const targetY = -Math.floor(i / columns) * spacingY + 2;
    const spacing = 1.1;

    const row = Math.floor(i / columns);
    const col = i % columns;

    // Posisi Grid Standar (Horizontal-Vertikal dulu)
    const targetX = (col - (columns - 1) / 2) * spacing;
    const targetY = -(row - 1.5) * spacing;

    gsap.to(mesh.position, {
      x: targetX,
      y: targetY,
      z: 0,
      scrollTrigger: { trigger: cubeSection.value, start: "top center", end: "top 10%", scrub: 2 },
    });

    gsap.to(mesh.rotation, {
      x: -Math.PI / 6,
      y: 0,
      z: 0, // 45 derajat agar ikon tetap tegak di grid yang miring
      scrollTrigger: { trigger: cubeSection.value, start: "top center", end: "top 10%", scrub: 2 },
    });

    scene.add(mesh);
    meshes.push(mesh);
  });

  // --- HOVER LOGIC ---
  // const onMouseMove = (event: MouseEvent) => {
  //   const rect = canvas.value!.getBoundingClientRect();
  //   mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
  //   mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

  //   raycaster.setFromCamera(mouse, camera);
  //   const intersects = raycaster.intersectObjects(meshes);

  //   if (intersects.length > 0) {
  //     const obj = intersects[0].object as THREE.Mesh;
  //     document.getElementById("skill-name-display")!.innerText = obj.userData.name;
  //     document.body.style.cursor = "pointer";
  //     // Efek Pop-up Neumorphism saat hover
  //     gsap.to(obj.scale, { x: 0.65, y: 0.65, z: 0.65, duration: 0.3 });
  //   } else {
  //     document.getElementById("skill-name-display")!.innerText = "";
  //     document.body.style.cursor = "default";
  //     meshes.forEach((m) => gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: 0.3 }));
  //   }
  // };
  const onMouseMove = (event: MouseEvent) => {
    const rect = canvas.value!.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const obj = intersects[0].object as THREE.Mesh;

      // Tampilkan nama skill
      document.getElementById("skill-name-display")!.innerText = obj.userData.name;
      document.body.style.cursor = "pointer";

      // EFEK MENDEM (Press Down) saat Hover
      gsap.to(obj.position, {
        z: -0.4, // Mendem ke bawah sumbu Z
        duration: 0.2,
        ease: "power2.out",
      });

      // Sedikit membesar atau mengecil (opsional)
      gsap.to(obj.scale, { x: 0.95, y: 0.95, z: 0.95, duration: 0.2 });
    } else {
      document.getElementById("skill-name-display")!.innerText = "";
      document.body.style.cursor = "default";

      // Kembalikan semua mesh ke posisi semula (z: 0)
      meshes.forEach((m) => {
        gsap.to(m.position, { z: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
        gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: 0.4 });
      });
    }
  };

  window.addEventListener("mousemove", onMouseMove);

  const animate = () => {
    // meshes.forEach((m, i) => {
    //   m.rotation.y += 0.005;
    //   m.position.y += Math.sin(Date.now() * 0.001 + i) * 0.003;
    // });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
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
    // Di dalam onMounted -> gsap.context
    const projectTitles = document.querySelectorAll(".project-title-type");

    projectTitles.forEach((title) => {
      const originalText = title.innerText; // Ambil teks asli ("Healthcare ERP System")
      title.innerText = ""; // Kosongkan dulu untuk persiapan efek ngetik

      gsap.to(title, {
        duration: 2,
        text: originalText,
        ease: "none",
        scrollTrigger: {
          trigger: title,
          start: "top 80%", // Mulai ngetik saat card 80% muncul di layar
          toggleActions: "play none none none", // Mainkan sekali saja
        },
      });
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

    <section ref="aboutSection" class="h-screen flex flex-col justify-center">
      <h2 class="text-center text-4xl font-bold mb-10">Selected Projects</h2>
      <div class="overflow-hidden">
        <div ref="aboutTrack" class="flex gap-20 px-[10vw] w-fit">
          <!-- Larissa Antrian -->
          <div
            class="group project-card min-w-[70vw] h-[60vh] rounded-3xl flex flex-col items-center justify-center border border-zinc-800 p-10 relative overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
            style="background: linear-gradient(to right bottom, #ffffff, #fbfcff, #f3fbff, #e9faff, #dff9fd, #ccf1f2, #bae9e5, #aae1d6, #89d0c0, #67bfaa, #42ae93, #009d7b)"
          >
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-700 z-10"></div>

            <img
              src="../assets/images/yayiha.png"
              alt="Project 1"
              class="absolute z-20 w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter grayscale brightness-75 blur-[1px] drop-shadow-2xl transition-all duration-1000 ease-in-out group-hover:w-[200px] group-hover:left-[unset] group-hover:bottom-0 group-hover:right-5 group-hover:translate-x-0 group-hover:translate-y-16 group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-110"
            />

            <h3
              class="project-title-type text-4xl font-black text-white top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 group-hover:right-[unset] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-black group-hover:top-20 duration-1000 group-hover:left-10 ease-in-out font-borel absolute z-30 transition-all drop-shadow-lg group-hover:drop-shadow-none"
            >
              Healthcare ERP System
            </h3>
            <div class="w-[3px] bg-emerald-500 h-0 transition-all duration-1000 delay-700 group-hover:h-full"></div>
            <h4
              class="absolute left-10 top-32 text-lg text-start text-zinc-700 leading-relaxed w-[45%] opacity-0 translate-y-10 transition-all duration-700 delay-1000 group-hover:opacity-100 group-hover:translate-y-0"
            >
              An integrated clinic management system designed to streamline and unify operational workflows across multiple roles. This system enhances efficiency, ensures seamless patient handling,
              and centralizes data management to optimize daily clinical operations.
            </h4>

            <div class="absolute bottom-10 left-10">
              <div class="grid grid-cols-5 gap-4">
                <Button class="tech-icon delay-[600ms]" variant="text" raised>
                  <img src="/icons/vue.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[700ms]" variant="text" raised>
                  <img src="/icons/tailwind.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[800ms]" variant="text" raised>
                  <img src="/icons/flask.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[900ms]" variant="text" raised>
                  <img src="/icons/python.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[1000ms]" variant="text" raised>
                  <img src="/icons/postgresql.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[400ms]" variant="text" raised>
                  <img src="/icons/pinia.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[500ms]" variant="text" raised>
                  <img src="/icons/socket-io.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[500ms]" variant="text" raised>
                  <img src="/icons/Bigtable.png" width="26" />
                </Button>
              </div>
            </div>

            <div class="absolute top-0 -right-32 w-full h-[120%] z-10 pointer-events-none">
              <img
                src="../assets/images/yayiha2.png"
                class="absolute w-3/5 top-20 right-0 translate-y-[500px] group-hover:rotate-[0deg] group-hover:translate-y-[-100px] transition-all duration-700"
              />
              <img
                src="../assets/images/yayiha3.png"
                class="absolute top-0 w-3/5 -right-24 opacity-40 blur-[1px] group-hover:blur-0 z-20 translate-y-[500px] group-hover:opacity-100 group-hover:translate-y-[-100px] transition-all duration-500"
              />
            </div>
          </div>

          <!-- Larissa Self Service -->
          <div
            class="group project-card min-w-[70vw] h-[60vh] rounded-3xl flex flex-col items-center justify-center border border-zinc-800 p-10 relative overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
            style="background: linear-gradient(to right bottom, #ffffff, #fbfcff, #f3fbff, #e9faff, #dff9fd, #ccf1f2, #bae9e5, #aae1d6, #89d0c0, #67bfaa, #42ae93, #009d7b)"
          >
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-700 z-10"></div>

            <img
              src="../assets/images/yayihas1.png"
              alt="Project 1"
              class="absolute z-20 w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter grayscale brightness-75 blur-[1px] drop-shadow-2xl transition-all duration-1000 ease-in-out group-hover:w-[200px] group-hover:left-[unset] group-hover:bottom-0 group-hover:right-5 group-hover:translate-x-0 group-hover:translate-y-16 group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-110"
            />

            <h3
              class="project-title-type text-4xl font-black text-white top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 group-hover:right-[unset] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-zinc-700 group-hover:top-20 duration-1000 group-hover:left-10 ease-in-out font-borel absolute z-30 transition-all drop-shadow-lg group-hover:drop-shadow-none"
            >
              Self Service System
            </h3>
            <div class="w-[3px] bg-emerald-500 h-0 transition-all duration-1000 delay-700 group-hover:h-full"></div>
            <h4
              class="absolute left-10 top-32 text-lg text-start text-zinc-700 leading-relaxed w-[45%] opacity-0 translate-y-10 transition-all duration-700 delay-1000 group-hover:opacity-100 group-hover:translate-y-0"
            >
              A comprehensive self-service clinic system that puts patients in control of their own care journey. This system enhances patient engagement, simplifies registration and appointment
              processes, and provides centralized access to personal health data for a more efficient clinical experience."
            </h4>

            <div class="absolute bottom-10 left-10">
              <div class="grid grid-cols-5 gap-4">
                <Button class="tech-icon delay-[600ms]" variant="text" raised>
                  <img src="/icons/vue.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[700ms]" variant="text" raised>
                  <img src="/icons/tailwind.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[800ms]" variant="text" raised>
                  <img src="/icons/flask.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[900ms]" variant="text" raised>
                  <img src="/icons/python.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[1000ms]" variant="text" raised>
                  <img src="/icons/postgresql.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[400ms]" variant="text" raised>
                  <img src="/icons/pinia.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[500ms]" variant="text" raised>
                  <img src="/icons/socket-io.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[500ms]" variant="text" raised>
                  <img src="/icons/Bigtable.png" width="26" />
                </Button>
              </div>
            </div>

            <div class="absolute top-0 -right-32 w-full h-[120%] z-10 pointer-events-none">
              <img
                src="../assets/images/yayihas2.png"
                class="absolute right-52 w-2/5 top-20 translate-y-[500px] group-hover:rotate-[0deg] group-hover:translate-y-[180px] transition-all duration-700"
              />
              <img
                src="../assets/images/yayihas3.png"
                class="absolute top-0 w-3/4 -right-56 opacity-40 blur-[1px] group-hover:blur-0 z-20 translate-y-[500px] group-hover:opacity-100 group-hover:translate-y-[-250px] transition-all duration-500"
              />
            </div>
          </div>

          <!-- Horus Demo -->
          <div
            class="group project-card min-w-[70vw] h-[60vh] rounded-3xl flex flex-col items-center justify-center border border-zinc-800 p-10 relative overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
            style="background: linear-gradient(to right bottom, #ffffff, #ffdbfd, #ffaed4, #ff8583, #ff7700)"
          >
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-700 z-10"></div>

            <img
              src="../assets/images/demo1.png"
              alt="Project 1"
              class="absolute z-20 w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter grayscale brightness-75 blur-[1px] drop-shadow-2xl transition-all duration-1000 ease-in-out group-hover:w-[200px] group-hover:left-[unset] group-hover:bottom-0 group-hover:right-5 group-hover:translate-x-0 group-hover:translate-y-16 group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-110"
            />

            <h3
              class="project-title-type text-3xl font-black text-white top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 group-hover:right-[unset] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-black group-hover:top-20 duration-1000 group-hover:left-10 ease-in-out font-borel absolute z-30 transition-all drop-shadow-lg group-hover:drop-shadow-none"
            >
              Customer Presentation System
            </h3>
            <div class="w-[3px] bg-white h-0 transition-all duration-1000 delay-700 group-hover:h-full"></div>
            <h4
              class="absolute left-10 top-32 text-lg text-start text-zinc-700 leading-relaxed w-[45%] opacity-0 translate-y-10 transition-all duration-700 delay-1000 group-hover:opacity-100 group-hover:translate-y-0"
            >
              A comprehensive showcase platform designed for seamless client onboarding and product demonstrations. It centralizes all core functionalities into an explorable environment, allowing
              users to experience the system’s efficiency and intuitive design firsthand.
            </h4>

            <div class="absolute bottom-10 left-10">
              <div class="grid grid-cols-5 gap-4">
                <Button class="tech-icon delay-[600ms]" variant="text" raised>
                  <img src="/icons/vue.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[700ms]" variant="text" raised>
                  <img src="/icons/tailwind.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[800ms]" variant="text" raised>
                  <img src="/icons/flask.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[900ms]" variant="text" raised>
                  <img src="/icons/python.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[1000ms]" variant="text" raised>
                  <img src="/icons/postgresql.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[400ms]" variant="text" raised>
                  <img src="/icons/pinia.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[500ms]" variant="text" raised>
                  <img src="/icons/sse.png" width="26" />
                </Button>
              </div>
            </div>

            <div class="absolute top-0 -right-32 w-full h-[120%] z-10 pointer-events-none">
              <img src="../assets/images/demo2.png" class="absolute w-3/5 top-48 right-0 translate-y-[500px] group-hover:rotate-[0deg] group-hover:translate-y-[-100px] transition-all duration-700" />
              <img
                src="../assets/images/demo3.png"
                class="absolute -top-14 w-3/5 -right-24 opacity-40 blur-[1px] group-hover:blur-0 z-20 translate-y-[500px] group-hover:opacity-100 group-hover:translate-y-[-100px] transition-all duration-500"
              />
            </div>
          </div>

          <!-- TING -->
          <div
            class="group project-card min-w-[70vw] h-[60vh] rounded-3xl flex flex-col items-center justify-center border border-zinc-800 p-10 relative overflow-hidden transition-all duration-700 ease-in-out cursor-pointer"
            style="background: linear-gradient(to right bottom, #ffffff, #f7f8ff, #ecf3ff, #ddeeff, #cbeaff, #b9e3fd, #a6ddfb, #91d6f8, #7acaf3, #63beee, #48b1ea, #24a5e5)"
          >
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-all duration-700 z-10"></div>

            <img
              src="../assets/images/ting1.png"
              alt="Project 1"
              class="absolute z-20 w-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter grayscale brightness-75 blur-[1px] drop-shadow-2xl transition-all duration-1000 ease-in-out group-hover:w-[200px] group-hover:left-[unset] group-hover:bottom-0 group-hover:right-5 group-hover:translate-x-0 group-hover:translate-y-8 group-hover:grayscale-0 group-hover:brightness-100 group-hover:blur-0 group-hover:scale-110"
            />

            <h3
              class="project-title-type text-4xl font-black text-white top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 group-hover:right-[unset] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-black group-hover:top-20 duration-1000 group-hover:left-10 ease-in-out font-borel absolute z-30 transition-all drop-shadow-lg group-hover:drop-shadow-none"
            >
              SaaS ERP
            </h3>
            <div class="w-[3px] bg-white h-0 transition-all duration-1000 delay-700 group-hover:h-full"></div>
            <h4
              class="absolute left-10 top-28 text-lg text-start text-zinc-700 leading-relaxed w-[45%] opacity-0 translate-y-10 transition-all duration-700 delay-1000 group-hover:opacity-100 group-hover:translate-y-0"
            >
              A comprehensive SaaS ERP ecosystem designed to serve as an integrated business platform, seamlessly unifying core operations from POS and Inventory to Accounting and Sales Management. By
              establishing a single source of truth, this system empowers businesses to scale, centralizing data and streamlining complex workflows into one intuitive interface.
            </h4>

            <div class="absolute bottom-10 left-10">
              <div class="grid grid-cols-5 gap-4">
                <Button class="tech-icon delay-[600ms]" variant="text" raised>
                  <img src="/icons/vue.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[700ms]" variant="text" raised>
                  <img src="/icons/tailwind.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[800ms]" variant="text" raised>
                  <img src="/icons/flask.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[900ms]" variant="text" raised>
                  <img src="/icons/python.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[1000ms]" variant="text" raised>
                  <img src="/icons/postgresql.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[400ms]" variant="text" raised>
                  <img src="/icons/pinia.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[500ms]" variant="text" raised>
                  <img src="/icons/BigQuery.png" width="26" />
                </Button>
                <Button class="tech-icon delay-[500ms]" variant="text" raised>
                  <img src="/icons/sse.png" width="26" />
                </Button>
              </div>
            </div>

            <div class="absolute top-12 -right-32 w-full h-[120%] z-10 pointer-events-none">
              <img src="../assets/images/ting2.png" class="absolute w-3/5 top-20 right-0 translate-y-[500px] group-hover:rotate-[0deg] group-hover:translate-y-[-100px] transition-all duration-700" />
              <img
                src="../assets/images/ting3.png"
                class="absolute -top-28 w-3/5 -right-20 opacity-40 blur-[1px] group-hover:blur-0 z-20 translate-y-[500px] group-hover:opacity-100 group-hover:translate-y-[-100px] transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="cubeSection" class="relative min-h-screen flex flex-col items-center justify-center bg-[#050505]">
      <div class="absolute z-20 pointer-events-none text-center">
        <h2 class="text-emerald-500 uppercase tracking-[0.5em] text-xs mb-4 opacity-70">Tech Stack Mastery</h2>
        <div id="skill-name-display" class="text-7xl font-black italic text-white min-h-[100px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase"></div>
      </div>

      <canvas ref="canvas" class="w-full h-full"></canvas>

      <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)]"></div>
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
.project-card {
  background-image: linear-gradient(to right bottom, #ffffff, #fbfcff, #f3fbff, #e9faff, #dff9fd, #ccf1f2, #bae9e5, #aae1d6, #89d0c0, #67bfaa, #42ae93, #009d7b);
}
/* Style untuk Icon agar muncul satu-persatu dari bawah */
.tech-icon {
  @apply opacity-0 translate-y-20 transition-all duration-500 ease-out;
  background: rgba(255, 255, 255, 0.4) !important;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.group:hover .tech-icon {
  @apply opacity-100 translate-y-0;
}

/* Hover effect tambahan untuk masing-masing icon */
.tech-icon:hover {
  transform: translateY(-5px) scale(1.1) !important;
  background: white !important;
}
/* Update font dan gaya untuk nama skill yang muncul */
#skill-name-display {
  font-family: "Inter", sans-serif; /* Atau font andalanmu */
  transition: all 0.3s ease-in-out;
}

/* Mempercantik tampilan tech-icon di project card */
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

/* Animasi khusus untuk judul proyek agar lebih smooth saat ngetik */
.project-title-type {
  letter-spacing: -0.02em;
}
</style>
