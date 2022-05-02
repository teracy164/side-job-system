import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  rootDir: 'src',
  typescript: {
    strict: true,
  },
  css: ['@/assets/css/main.scss'],
  plugins: ['@/plugins/api.client.ts', '@/plugins/auth.client.ts'],
});
