// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['animate.css', '@/assets/css/main.css'],
  modules: ['nuxt-toast', '@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'WeatherCast',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'WeatherCast is a modern weather forecasting application built with Nuxt.js. It provides users with real-time weather information, forecasts, and weather-related data in a clean, intuitive interface.' },
        { property: 'og:description', content: 'WeatherCast เป็นแอปพลิเคชันพยากรณ์อากาศที่ทันสมัยสร้างด้วย Nuxt.js ให้ข้อมูลสภาพอากาศแบบเรียลไทม์ การพยากรณ์ และข้อมูลที่เกี่ยวข้องกับสภาพอากาศในอินเทอร์เฟซที่สะอาดและใช้งานง่าย' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/weather-icon.svg' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
    },
  },
})