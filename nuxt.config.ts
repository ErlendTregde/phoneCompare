// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/css/global.css'
  ],
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true }
})
