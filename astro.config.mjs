import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://www.digital-factory.lu',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/blank-'),
    }),
  ],
  redirects: {
    '/blank-1-1-1': { status: 301, destination: '/saas' },
    '/blank-1-1': { status: 301, destination: '/teeqode' },
    '/blank-1': { status: 301, destination: '/kuck' },
    '/blank-3': { status: 301, destination: '/mentions-legales' },
  },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'de', 'lu'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
