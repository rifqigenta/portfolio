// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primeuix/themes/aura";
export default defineNuxtConfig({
  css: ["~/assets/css/main.css", "primeicons/primeicons.css"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "v-gsap-nuxt", "@nuxtjs/google-fonts", "@primevue/nuxt-module"],
  googleFonts: {
    families: {
      Borel: true,
    },
    display: "swap",
  },
  alias: {
    "@assets": "~/assets",
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Borel&display=swap",
        },
      ],
    },
  },
});
