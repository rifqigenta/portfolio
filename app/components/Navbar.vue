<template>
  <nav :class="['fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out', showNavbar ? 'top-2 opacity-100' : '-top-24 opacity-0']">
    <ul
      :class="[
        'flex items-center gap-8 px-8 py-2 rounded-full backdrop-blur-md border transition-all duration-600',
        isLightSection ? 'bg-black/80 text-white border-black/30 shadow-lg' : 'bg-white/5 text-white border-white/10',
      ]"
    >
      <li v-for="item in navItems" :key="item.id" @click="scrollToSection(item.id)" class="nav-item" :class="{ active: activeSection === item.id }">
        {{ item.label }}
      </li>

      <li>
        <button @click="scrollToSection('contact')" class="ml-4 px-4 py-1 rounded-full bg-white text-black font-semibold hover:scale-105 transition duration-300">Hire Me</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showNavbar = ref(true);
const activeSection = ref("home");
const isLightSection = ref(false);
let lastScroll = 0;

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  // { id: "contact", label: "Contact" },
];
const lightSections = ["about"]; // id section yang background terang

const detectSectionTheme = () => {
  lightSections.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      isLightSection.value = true;
    } else if (activeSection.value !== id) {
      isLightSection.value = false;
    }
  });
};

// Hide / Show navbar
const handleScrollDirection = () => {
  const current = window.scrollY;

  if (current > lastScroll && current > 80) {
    showNavbar.value = false;
  } else {
    showNavbar.value = true;
  }

  lastScroll = current;
};

// Active section detection
const handleActiveSection = () => {
  navItems.forEach((item) => {
    const section = document.getElementById(item.id);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      activeSection.value = item.id;
    }
  });
};

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
  });
};

const handleScroll = () => {
  handleScrollDirection();
  handleActiveSection();
  detectSectionTheme();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.nav-item {
  cursor: pointer;
  position: relative;
  transition: 0.8s ease;
  opacity: 0.6;
}

.nav-item:hover {
  opacity: 1;
}

.nav-item.active {
  opacity: 1;
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0%;
  height: 2px;
  background: white;
  transition: 0.8s ease;
}

.nav-item.active::after {
  width: 100%;
}

.nav-item:hover::after {
  width: 100%;
}
</style>
