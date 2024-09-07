// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/mdc", "@nuxt/image"],
  css: ["@/assets/main.css"],
  sourcemap: false,
});
