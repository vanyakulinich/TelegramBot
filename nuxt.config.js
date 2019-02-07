import { baseURL } from "./config/api";
module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Reminder Manager",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Indie+Flower|Permanent+Marker"
      }
    ]
  },
  plugins: ["~plugins/vuetify.js", "~plugins/vueDatetime.js"],
  modules: [["@nuxtjs/axios", { baseURL }]],
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["vuetify"],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        });
      }
    }
  }
};
