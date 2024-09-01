// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@prisma/nuxt',
    '@nuxt/devtools',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    defaultLocale: 'zh-cn'
  },
  typescript: {
    strict: true,
    shim: false,
    tsConfig: {
      compilerOptions: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }
  },
  dayjs: {
    locales: ['zh-cn'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'zh-cn'
  },
  vite: {
    optimizeDeps: {
      include: ['dayjs', 'dayjs/plugin/*']
    }
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  }
})