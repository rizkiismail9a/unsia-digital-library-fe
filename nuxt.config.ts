// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@sidebase/nuxt-auth"],

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    env: "",
    keySecret: "",

    public: {
      apiBaseUrl: "",
      appUrl: "",
    },
  },

  auth: {
    originEnvKey: "AUTH_ORIGIN",
    baseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
  },
});
