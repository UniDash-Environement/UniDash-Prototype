// https://nuxt.com/docs/api/configuration/nuxt-config

const path = (() => {
  const filePath = `${__filename}`.split("/")
  filePath.pop()
  return filePath.join("/")
})()

export default {
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@morev/vue-transitions/nuxt',
  ],

  ssr: false,

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },

  css: ['~/assets/scss/main.scss'],

  plugins: [],

  typescript: {
    strict: true
  },

  runtimeConfig: {
    SECRET: process.env.SECRET
  },

  alias: {
    "@": path,
  }
};
