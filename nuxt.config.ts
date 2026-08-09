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

  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },

        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
          media: "print",
          onload: "this.media='all'",
        },
      ],
    },
  },

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
