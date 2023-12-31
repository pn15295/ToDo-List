export default {
  srcDir: "src/",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "todo-list",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["./src/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "./plugins/axios.js", mode: "client" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  serverMiddleware: [
    {
      path: "/api",
      handler: "./src/api/index.js",
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["portal-vue/nuxt", "@nuxtjs/axios"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  tailwindcss: {
    cssPath: "./src/assets/css/main.css",
    configPath: "tailwind.config.js",
    exposeConfig: true,
  },

  axios: {
    proxy: true,
  },
};
