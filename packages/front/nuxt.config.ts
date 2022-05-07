import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  rootDir: 'src',
  vite: {
    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT || 3000),
    },
  },
  typescript: {
    strict: true,
  },
  css: ['@/assets/css/main.scss'],
  meta: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined',
      },
    ],
  },
});
