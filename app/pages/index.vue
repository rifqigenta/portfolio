<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { TextPlugin } from "gsap/TextPlugin";
import { RoundedBoxGeometry } from "three-stdlib";
import SplashCursor from "~/components/ui/SplashCursor.vue";
// Matikan SSR karena Three.js butuh akses langsung ke DOM/Window
definePageMeta({
  layout: "default",
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const name = "Rifqi Genta B.";

/* ====================== REFS ====================== */
const heroSection = ref(null);
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
const canvas = ref<HTMLCanvasElement | null>(null);
const splashRef = ref();

/* ====================== DATA ====================== */
const experience = [
  {
    id: 1,
    name: "Fullstack Programmer",
    company: "PT. Horus Technology",
    desc: "Developed ERP system such as creating application interface, integrated it with backend, building basis data, REST API, etc. Maintained the ERP system.",
    icon: "pi pi-briefcase",
    skills: [
      "/icons/three2/html.png",
      "icons/three2/css.png",
      "icons/three2/javascript.png",
      "icons/three2/tailwind.png",
      "icons/three2/vue.png",
      "icons/three2/pinia.png",
      "icons/three2/python.png",
      "icons/three2/flask.png",
      "icons/three2/bigtable.png",
      "icons/three2/bigquery.png",
      "icons/three2/vertex.png",
      "icons/three2/git.png",
      "icons/three2/bootstrap.png",
      "icons/three2/postgresql.png",
      "icons/three2/mysql.png",
      "icons/three2/sse.png",
      "icons/three2/socket-io.png",
    ],
  },
  {
    id: 2,
    name: "Web development Mentee",
    company: "Infinite Learning",
    desc: "Hands-on experience in UI/UX and Fullstack implementation based on 3 separated projects. such as, only UI/UX, frontend only, and fullstack web development ",
    icon: "pi pi-graduation-cap",
    skills: [
      "/icons/three2/html.png",
      "icons/three2/css.png",
      "icons/three2/javascript.png",
      "icons/three2/tailwind.png",
      "icons/three2/bootstrap.png",
      "icons/three2/react.png",
      "icons/three2/express.png",
      "icons/three2/figma.png",
      "icons/three2/mysql.png",
    ],
  },
  {
    id: 3,
    name: "Practicum Lab Assistant",
    company: "Amikom University",
    desc: "Assisted / teaching students during algorithm and programming sessions. Grading the student assesment.",
    icon: "pi pi-briefcase",
    skills: ["/icons/three2/cpp.png"],
  },
  { id: 4, name: "GPA : 3.82/4.00", company: "Amikom University", desc: "Academic Excellence.", icon: "pi pi-graduation-cap" },
];

const skills = [
  { name: "HTML 5", icon: "/icons/three2/html.png", color: "#D81A0B", desc: "Laying down the bones of every webpage. No HTML, no party." },
  { name: "CSS", icon: "/icons/three2/css.png", color: "#362584", desc: "Making things pretty since forever. Flexbox and grid are my love languages." },
  { name: "JavaScript", icon: "/icons/javascript.png", color: "#F7DF1E", desc: "The OG chaos coordinator. It's not a bug, it's a feature!" },
  { name: "TypeScript", icon: "/icons/typescript.png", color: "#007ACC", desc: "JavaScript with a suit and tie. Safety first, no more undefined drama." },
  { name: "Bootstrap", icon: "/icons/three2/bootstrap.png", color: "#8F12FD", desc: "Old but gold. Reliable vibes for when you need a grid ASAP." },
  { name: "Tailwind", icon: "/icons/three2/tailwind.png", color: "#030712", desc: "Utility classes go brrr! Styling with the ultimate drip, no cap." },
  { name: "Vue.js", icon: "/icons/three2/vue.png", color: "#031634", desc: "The main character energy for your UI, clean and fast." },
  { name: "React.js", icon: "/icons/three2/react.png", color: "#23272F", desc: "Hooked on this library, building components like a Lego master." },
  { name: "Pinia", icon: "/icons/three2/pinia.png", color: "#131A27", desc: "The cute pineapple keeping your state organized and fresh." },
  { name: "Python", icon: "/icons/three2/python.png", color: "#1E415D", desc: "Write like a human, perform like a beast. Sss-imply powerful." },
  { name: "Nuxt.js", icon: "/icons/three2/nuxt.png", color: "#010618", desc: "Vue on steroids. SEO friendly, developer happy." },
  { name: "Flask", icon: "/icons/three2/flask.png", color: "#D9D9D9", desc: "Minimalist backend vibes. Small bottle, big impact." },
  { name: "Express", icon: "/icons/three2/express.png", color: "#D9D9D9", desc: "Fast, unopinionated, and sleek. The highway for your Node.js." },
  { name: "Git", icon: "/icons/three2/git.png", color: "#2A2A2A", desc: "Save point for your code. Time traveling made easy (until merge conflicts)." },
  { name: "Figma", icon: "/icons/three2/figma.png", color: "#23272F", desc: "From wireframe to wow-frame. Pixel pushing with purpose." },
  { name: "PostgreSQL", icon: "/icons/three2/postgresql.png", color: "#1E415D", desc: "The relational goat. Handles your data like a pro." },
  { name: "MySQL", icon: "/icons/three2/mysql.png", color: "#D9D9D9", desc: "The classic choice. Keeping tables organized since forever." },
  { name: "BigTable", icon: "/icons/three2/bigtable.png", color: "#D9D9D9", desc: "Massive data? No problem. Wide-column storage for the win." },
  { name: "Socket.io", icon: "/icons/three2/socket-io.png", color: "#D9D9D9", desc: "Ghosting? Never heard of her. Real-time chatting is the move." },
  { name: "SSE", icon: "/icons/three2/sse.png", color: "#5E17EC", desc: "One-way street for data, keeping your feed updated without the lag." },
];
const getImageUrl = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
};
const mouseParallax = {
  x: 0,
  y: 0,
};

const parallaxStrength = 1; // bisa kamu tweak
const parallaxSmooth = 0.06; // makin kecil makin halus

let ctx: any; // GSAP Context
/* ====================== THREE.JS LOGIC (Chaos to Order) ====================== */
const initThreeScene = () => {
  if (!canvas.value || !cubeSection.value) return;

  const scene = new THREE.Scene();
  const gridGroup = new THREE.Group(); // Buat wadah untuk semua kubus
  scene.add(gridGroup);
  const { width, height } = cubeSection.value.getBoundingClientRect();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.01, 1000);
  camera.position.x = -2;
  camera.position.y = 0;
  camera.position.z = 10.044;
  camera.lookAt(0, 0, 0);
  // camera.rotation.set(-121.57 * (Math.PI / 180), 34.39 * (Math.PI / 180), 137.41 * (Math.PI / 180));
  // camera.rotation.y = Math.PI / 4;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });
  // --- KUNCI WARNA CERAH ---
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // renderer.outputColorSpace = THREE.SRGBColorSpace; // Agar warna tidak kusam
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.toneMappingExposure = 1.2;

  const loader = new THREE.TextureLoader();
  const meshes: THREE.Mesh[] = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // --- LIGHTING (Kunci Neumorphism adalah bayangan lembut) ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Cahaya dasar
  scene.add(ambientLight);

  const frontLight = new THREE.DirectionalLight(0xffffff, 0.8);
  // frontLight.position.set(2, 2, 5); // Cahaya dari depan agak samping
  frontLight.position.set(5, 10, 7); // Cahaya dari depan agak samping
  frontLight.intensity = 1.5;
  scene.add(frontLight);

  const backLight = new THREE.PointLight(0xffffff, 0.5);
  backLight.position.set(-5, -5, -5); // Cahaya lemah dari belakang untuk depth
  scene.add(backLight);

  const columns = 5;
  const spacing = 1.1;

  // --- MEMBUAT WADAH (TRAY) ---
  const trayWidth = columns * spacing + 1; // Sesuaikan ukuran
  const trayHeight = Math.ceil(skills.length / columns) * spacing + 1;

  // Gunakan RoundedBoxGeometry juga agar sudutnya serasi dengan kubus
  const trayGeometry = new RoundedBoxGeometry(trayWidth, trayHeight, 0.5, 4, 0.2);
  const trayMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a, // Warna wadah (gelap premium)
    roughness: 0.4,
    metalness: 0.1,
  });

  const tray = new THREE.Mesh(trayGeometry, trayMaterial);

  // Posisikan tepat di belakang kubus (z sedikit negatif agar tidak beradu/z-fighting)
  // tray.position.set(0, 0, -0.6);
  // POSISI AWAL: kiri atas + agak jauh
  tray.position.set(-trayWidth * 1.5, trayHeight * 1.5, -3);

  // Rotasi awal (menghadap agak jatuh)
  tray.rotation.x = Math.PI / 1.5;
  tray.rotation.y = -Math.PI / 4;
  tray.rotation.z = Math.PI / 8;

  gsap.to(gridGroup.rotation, {
    x: -Math.PI / 4, // Rebah ke belakang (45 derajat)
    z: Math.PI / 4, // Putar diagonal (45 derajat)
    scrollTrigger: {
      trigger: cubeSection.value,
      start: "top center",
      end: "top 5%",
      scrub: 2,
    },
  });
  gridGroup.add(tray);
  const trayEnterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: cubeSection.value,
      start: "top center",
      end: "top 10%",
      scrub: 2,
    },
  });

  trayEnterTimeline.to(tray.position, {
    x: 0,
    y: 0,
    z: -0.6,
    ease: "power3.out",
  });

  trayEnterTimeline.to(
    tray.rotation,
    {
      x: 0,
      y: 0,
      z: 0,
      ease: "power3.out",
    },
    0, // jalan barengan
  );
  const trayExitTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: cubeSection.value,
      start: "top -10%",
      end: "top -20%",
      scrub: 2,
    },
  });

  // Geser seluruh group
  trayExitTimeline.to(gridGroup.position, {
    x: trayWidth * 1.5,
    y: trayHeight * 1.5,
    z: -3,
    ease: "power3.in",
  });

  // Putar seluruh group
  trayExitTimeline.to(
    gridGroup.rotation,
    {
      x: -Math.PI / 1.5,
      y: Math.PI / 4,
      z: -Math.PI / 8,
      ease: "power3.in",
    },
    0,
  );

  skills.forEach((skill, i) => {
    const texture = loader.load(skill.icon);
    texture.colorSpace = THREE.SRGBColorSpace;
    const baseColor = skill.color || 0xffffff;

    // 1. Geometri dengan sudut bulat (lebar, tinggi, tebal, segmen, radius)
    // Radius 0.1 di Three.js sudah terlihat seperti 10px-15px di CSS
    const geometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.1);

    // Buat material polos untuk sisi samping & belakang
    const sideMaterial = new THREE.MeshStandardMaterial({
      color: baseColor,
      roughness: 0.1, // Lebih licin agar lebih cerah
      metalness: 0.0, // Hilangkan metalness agar tidak memantulkan warna hitam lingkungan
    });

    // Buat material khusus sisi depan (ikon)
    const frontMaterial = new THREE.MeshStandardMaterial({
      color: 0xb6b6b6, // Gunakan putih agar warna texture asli keluar
      map: texture,
      roughness: 0,
      metalness: 0.3,
    });

    // 2. Material Putih Bersih dengan tekstur ikon di depannya
    const materials = [
      sideMaterial, // kanan
      sideMaterial, // kiri
      sideMaterial, // atas
      sideMaterial, // bawah
      frontMaterial, // DEPAN (ini yang ada ikonnya)
      sideMaterial, // belakang
    ];

    const mesh = new THREE.Mesh(geometry, materials);

    // POSISI AWAL (Chaos)
    const chaosPosition = {
      x: (Math.random() - 0.5) * 19,
      y: (Math.random() - 0.5) * 19,
      z: (Math.random() - 0.5) * 10,
    };

    const chaosRotation = {
      x: Math.random() * Math.PI * 2,
      y: Math.random() * Math.PI * 2,
      z: Math.random() * Math.PI * 2,
    };

    mesh.position.set(chaosPosition.x, chaosPosition.y, chaosPosition.z);
    mesh.rotation.set(chaosRotation.x, chaosRotation.y, chaosRotation.z);

    mesh.userData = {
      name: skill.name,
      chaosPosition,
      chaosRotation,
    };

    // Set tray transparan di awal
    trayMaterial.transparent = true;
    trayMaterial.opacity = 0;

    scene.add(mesh);
    meshes.push(mesh);
    gridGroup.add(mesh);
  });

  const animateToGrid = () => {
    meshes.forEach((mesh, i) => {
      const row = Math.floor(i / columns);
      const col = i % columns;

      const targetX = (col - (columns - 1) / 2) * spacing;
      const targetY = -(row - 1.5) * spacing;

      gsap.to(mesh.position, {
        x: targetX,
        y: targetY,
        z: 0,
        duration: 2.2,
        ease: "power3.inOut",
      });

      gsap.to(mesh.rotation, {
        x: Math.PI * 4,
        y: Math.PI * 2,
        z: 0,
        duration: 2.2,
        ease: "power3.inOut",
      });
    });

    gsap.to(trayMaterial, { opacity: 1, duration: 0.5 });
  };
  const animateToChaos = () => {
    meshes.forEach((mesh) => {
      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;
      const randomZ = (Math.random() - 0.5) * 10;

      gsap.to(mesh.position, {
        x: randomX,
        y: randomY,
        z: randomZ,
        duration: 1.4,
        ease: "power3.inOut",
      });

      gsap.to(mesh.rotation, {
        x: mesh.rotation.x + Math.PI * 4,
        y: mesh.rotation.y + Math.PI * 4,
        duration: 1.4,
        ease: "power3.inOut",
      });
    });
  };
  const animateToChaosEnd = () => {
    meshes.forEach((mesh) => {
      const { chaosPosition, chaosRotation } = mesh.userData;

      gsap.to(mesh.position, {
        x: chaosPosition.x,
        y: chaosPosition.y,
        z: chaosPosition.z,
        duration: 1.4,
        ease: "power3.inOut",
        overwrite: "auto",
      });

      gsap.to(mesh.rotation, {
        x: chaosRotation.x,
        y: chaosRotation.y,
        z: chaosRotation.z,
        duration: 1.4,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });

    gsap.to(trayMaterial, {
      opacity: 0,
      duration: 0.6,
    });
  };
  ScrollTrigger.create({
    trigger: cubeSection.value,
    start: "top center",
    end: "bottom center",
    onEnter: () => animateToGrid(),
    onEnterBack: () => animateToGrid(),
    onLeave: () => animateToGrid(),
    onLeaveBack: () => animateToChaos(),
  });

  // --- HELPER FUNCTIONS (Di luar onMouseMove) ---

  const resetCube = (m: THREE.Object3D) => {
    gsap.to(m.position, {
      z: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to(m.scale, { x: 1, y: 1, z: 1, duration: 0.4 });
  };

  const resetTextDisplay = () => {
    const displayTitle = document.getElementById("skill-name-display");
    const displayDesc = document.getElementById("skill-desc-display");

    if (displayTitle || displayDesc) {
      gsap.killTweensOf([displayTitle, displayDesc]); // Hentikan animasi typewriter yang sedang jalan
      gsap.to([displayTitle, displayDesc], {
        opacity: 0,
        translateZ: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          if (displayTitle) displayTitle.innerText = "";
          if (displayDesc) displayDesc.innerText = "";
        },
      });
    }
  };

  // --- HOVER LOGIC ---
  let hoveredObj: THREE.Object3D | null = null;
  // REPLACE seluruh onMouseMove dengan ini:
  const onMouseMove = (event: MouseEvent) => {
    if (!canvas.value) return;

    // ✅ FIX 1: Selalu ambil rect FRESH setiap move (bukan cached)
    const rect = (canvas.value as HTMLCanvasElement).getBoundingClientRect();

    // ✅ FIX 2: Hitung mouse relatif terhadap canvas di viewport SAAT INI
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    mouseParallax.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseParallax.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes, false);

    const displayTitle = document.getElementById("skill-name-display");
    const displayDesc = document.getElementById("skill-desc-display");

    if (intersects.length > 0) {
      const obj = intersects[0].object as THREE.Mesh;
      const skillData = skills.find((s) => s.name === obj.userData.name);

      if (hoveredObj !== obj && skillData) {
        if (hoveredObj) resetCube(hoveredObj);

        hoveredObj = obj;
        document.body.style.cursor = "pointer";

        if (displayTitle && displayDesc) {
          gsap.killTweensOf([displayTitle, displayDesc]);

          displayTitle.innerText = skillData.name;
          gsap.fromTo(displayTitle, { opacity: 0 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });

          displayDesc.innerText = skillData.desc;
          gsap.fromTo(displayDesc, { opacity: 0, y: 0, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" });
        }

        gsap.to(obj.position, { z: -0.5, duration: 0.2, ease: "power2.inOut", overwrite: "auto" });
      }
    } else {
      if (hoveredObj) {
        resetCube(hoveredObj);
        resetTextDisplay();
        hoveredObj = null;
        document.body.style.cursor = "default";
      }
    }
  };

  window.addEventListener("mousemove", onMouseMove);

  const animate = () => {
    // Target position
    const targetX = mouseParallax.x * parallaxStrength;
    const targetY = mouseParallax.y * parallaxStrength;

    // Smooth lerp
    camera.position.x += (targetX - camera.position.x) * parallaxSmooth;
    camera.position.y += (targetY - camera.position.y) * parallaxSmooth;

    // Optional: biar tetap fokus ke center
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();

  // ✅ FIX 3: Handle resize agar canvas size selalu sinkron
  const handleResize = () => {
    if (!canvas.value || !cubeSection.value) return;
    const { width, height } = cubeSection.value.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  window.addEventListener("resize", handleResize);
};

const myEmail = "rifqigentaschool@gmail.com";

const openGmailCompose = () => {
  const subject = encodeURIComponent("Introduction From <name>");

  const body = encodeURIComponent(
    `Hi,

We would like to express our interest in discussing an opportunity for you to work with us at <name>.

Please find the preliminary details below:

• Position / Project Type:
• Scope of Work:
• Compensation / Budget:
• Expected Timeline:
• Additional Information:

We would appreciate the opportunity to discuss this further at your earliest convenience. Kindly let us know your availability.

Thank you for your time and consideration.

Best regards,`,
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1` + `&to=${myEmail}` + `&su=${subject}` + `&body=${body}`;

  window.open(gmailUrl, "_blank");
};

/* ====================== LIFECYCLE ====================== */
onMounted(async () => {
  // Gunakan GSAP Context untuk memudahkan cleanup
  await nextTick();
  ctx = gsap.context(() => {
    // TYPEWRITER EFFECT
    const roles = ["Software Developer", "Frontend Developer", "Fullstack Programmer"];
    let masterTl = gsap.timeline({ repeat: -1 });

    roles.forEach((role) => {
      let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1.5 });
      tl.to(".typewriter", { duration: 1.5, text: role, ease: "none" });
      masterTl.add(tl);
    });

    // CURSOR
    const light = document.querySelector(".cursor-light");

    window.addEventListener("mousemove", (e) => {
      const rect = heroImage.value.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(light, {
        x: x,
        y: y,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    // PARALLAX HERO (Updated)
    gsap
      .timeline({
        scrollTrigger: {
          trigger: heroSection.value,
          start: "top top",
          end: "+=1500",
          scrub: true,
        },
      })
      .to(".bg-grid-hero", { y: -300, ease: "none" }, 0)
      .to(
        ".hero-text-wrapper",
        {
          y: 1050,
          opacity: 0.8,
          filter: "blur(2px)",
          ease: "none",
        },
        0,
      )
      .to(
        ".hero-image-wrapper",
        {
          y: 1050,
          ease: "none",
        },
        0,
      )
      .to(
        ".rectangle",
        {
          y: -250,
          ease: "none",
        },
        0,
      )
      .to(
        ".rectangle2",
        {
          y: -250,
          ease: "none",
        },
        0,
      )
      .to(
        ".circle4",
        {
          y: -350,
          ease: "none",
        },
        0,
      )
      .to(
        ".lineprofile",
        {
          y: -250,
          ease: "none",
        },
        0,
      );

    // Animasi masuk untuk profile container
    // gsap.from(".profile-container", {
    //   scale: 0.8,
    //   opacity: 0,
    //   duration: 1.2,
    //   ease: "power3.out",
    // });
    // 1. Hero Parallax
    // gsap.to(heroText.value, { y: -100, scrollTrigger: { trigger: "body", scrub: true } });
    // gsap.to(heroImage.value, { y: 50, scrollTrigger: { trigger: "body", scrub: true } });

    // 2. Timeline Animation
    gsap.to(timelineLine.value, {
      scaleY: 1,
      scrollTrigger: { trigger: timelineSection.value, start: "top center", end: "bottom center", scrub: true },
    });
    ScrollTrigger.create({
      trigger: timelineSection.value,
      start: "top center",
      end: "bottom center",

      onEnter: () => {
        // paksa hitam
        splashRef.value?.setFixedColor({ r: 0, g: 0, b: 0 });
      },

      onEnterBack: () => {
        splashRef.value?.setFixedColor({ r: 0, g: 0, b: 0 });
      },

      onLeave: () => {
        // balik ke random
        splashRef.value?.setFixedColor(null);
      },

      onLeaveBack: () => {
        splashRef.value?.setFixedColor(null);
      },
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
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert(); // Hapus semua animasi & trigger
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <main class="text-white overflow-x-hidden">
    <ClientOnly>
      <SplashCursor
        ref="splashRef"
        :SIM_RESOLUTION="128"
        :DYE_RESOLUTION="1440"
        :DENSITY_DISSIPATION="2.5"
        :VELOCITY_DISSIPATION="1.5"
        :PRESSURE="0.1"
        :CURL="30"
        :SPLAT_RADIUS="0.55"
        :SPLAT_FORCE="9000"
        :COLOR_UPDATE_SPEED="10"
      />
    </ClientOnly>
    <section ref="heroSection" id="home" class="hero-section relative min-h-screen flex items-center px-10 lg:px-24 overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20 bg-grid-hero"></div>

      <div class="hero-content z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
        <!-- TEXT SIDE -->
        <div class="hero-text-wrapper">
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
              <a href="https://www.linkedin.com/in/rifqi-genta-buana-8b2971226/?locale=en_US" target="_blank" rel="noopener noreferrer">
                <Button class="btn-linkedin" variant="outlined" severity="secondary">
                  <i class="pi pi-linkedin text-2xl"></i>
                </Button>
              </a>

              <a href="https://www.instagram.com/rg.buana?igsh=eGkyNzdzeWg3MXUx" target="_blank" rel="noopener noreferrer">
                <Button class="btn-instagram" variant="outlined" severity="secondary">
                  <i class="pi pi-instagram text-2xl"></i>
                </Button>
              </a>

              <a href="https://github.com/rifqigenta" target="_blank" rel="noopener noreferrer">
                <Button class="btn-github" variant="outlined" severity="secondary">
                  <i class="pi pi-github text-2xl"></i>
                </Button>
              </a>
            </div>
          </div>
        </div>

        <!-- IMAGE SIDE -->
        <div class="flex justify-center lg:justify-end hero-image-wrapper">
          <div class="profile-wrapper relative">
            <div class="abs-shape shape-1"></div>
            <div class="abs-shape shape-2"></div>
            <div class="grid-box"></div>

            <img src="../assets/images/profile-line.svg" alt="" class="lineprofile" />

            <div ref="heroImage" class="profile-container overflow-hidden">
              <div class="cursor-light"></div>
              <img src="../assets/images/new-portfolio-profile.png" class="profile-img-styled" alt="Profile" />
              <img src="../assets/images/profile-circle4.svg" alt="" class="circle4" />
              <img src="../assets/images/profile-rectangle.svg" alt="" class="rectangle" />
              <img src="../assets/images/profile-rectangle2.svg" alt="" class="rectangle2" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="timelineSection" id="about" class="bg-white text-black py-20 relative">
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
                ><p class="text-sm my-2">{{ item.desc }}</p></template
              >
              <template #footer>
                <div v-if="item.skills" class="grid grid-cols-7 gap-2">
                  <span v-for="(skill, i) in item.skills" :key="i">
                    <img :src="skill" alt="" width="34" />
                  </span>
                </div>
              </template>
            </Card>
          </div>
          <div class="timeline-dot-center shadow-md"><i :class="item.icon"></i></div>
        </div>
      </div>
    </section>

    <section ref="aboutSection" id="projects" class="h-screen flex flex-col justify-center">
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

    <section ref="cubeSection" id="skills" class="relative h-screen flex flex-col items-center justify-center bg-none">
      <h2 class="absolute top-16 text-4xl font-black text-white mb-4">Tech Stack</h2>
      <div class="absolute z-50 pointer-events-none text-center wrapper-skill-name">
        <!-- <div id="skill-name-display" class="text-7xl font-black text-white min-h-[100px] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase"></div> -->
        <div class="skill-plane">
          <div id="skill-name-display" class="text-start text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] uppercase"></div>
          <div id="skill-desc-display" class="text-2xl text-start font-medium text-white mt-4 max-w-md italic opacity-0"></div>
        </div>
      </div>

      <canvas ref="canvas" class="w-full h-full"></canvas>

      <!-- <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)]"></div> -->
    </section>
    <!-- <section class="min-h-screen cube-section flex justify-center items-center w-full">
      <div class="flex flex-col gap-12">
        <h2 class="text-4xl text-center text-white font-black opacity-70">Interested in working with me?</h2>

        <button @click="openGmailCompose" class="mx-auto text-2xl px-6 py-4"></button>
      </div>
    </section> -->
    <section id="contact" class="relative min-h-screen flex items-center justify-center overflow-hidden contact-section">
      <!-- subtle background glow -->
      <div class="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[160px] rounded-full"></div>

      <div class="relative z-10 text-center max-w-3xl px-6">
        <h2 class="text-5xl md:text-6xl font-black text-white leading-tight">
          Let’s build something
          <span class="py-6 block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"> extraordinary together. </span>
        </h2>

        <p class="text-zinc-400 mt-6 text-lg">Available for the opportunities.</p>

        <button @click="openGmailCompose" class="cta-btn mt-12">Get in Touch</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Reset & Base */
.hero-section {
  background-image: linear-gradient(to right bottom, #000000, #010000, #030001, #040001, #060001, #090001, #0c0002, #0e0002, #120002, #150003, #170103, #1a0103);
}
.hero-text-wrapper,
.hero-image-wrapper,
.bg-grid-hero {
  will-change: transform;
}
.contact-section {
  background-image: linear-gradient(to right bottom, #000000, #010000, #030001, #040001, #060001, #090001, #0c0002, #0e0002, #120002, #150003, #170103, #1a0103);
  position: relative;
  overflow: hidden;
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
.cursor-light {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 70%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  filter: blur(40px);
  opacity: 0.6;
  transition: opacity 0.3s ease;
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

.wrapper-skill-name {
  height: 180px;
  position: absolute;
  pointer-events: none !important;
  user-select: none;
  z-index: 50;

  /* Posisi awal (Sesuaikan top/left jika diperlukan) */
  top: 25%;
  left: 20%;
}

.skill-plane {
  transform: rotateX(45deg) rotateZ(-37deg);
  transform-style: preserve-3d;
}

#skill-name-display {
  will-change: transform, opacity;
  /* Layering shadow buat efek ketebalan balok */
  text-shadow:
    0px 1px 0px #ccc,
    0px 2px 0px #bbb,
    0px 3px 0px #aaa,
    0px 4px 0px #999,
    0px 8px 15px rgba(0, 0, 0, 0.5);
}
#skill-desc-display {
  transform: rotateX(15deg) rotateZ(-2deg);
  transform-style: preserve-3d;
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
.cta-btn {
  position: relative;
  padding: 18px 48px;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 999px;
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  color: white;
  transition: all 0.4s ease;
  box-shadow:
    0 0 20px rgba(168, 85, 247, 0.4),
    0 0 40px rgba(236, 72, 153, 0.2);
}

.cta-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow:
    0 0 30px rgba(168, 85, 247, 0.6),
    0 0 60px rgba(236, 72, 153, 0.4);
}

.cta-btn:active {
  transform: scale(0.98);
}
</style>
