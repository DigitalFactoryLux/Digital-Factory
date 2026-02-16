import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.digital-factory.lu',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'de', 'lu'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
