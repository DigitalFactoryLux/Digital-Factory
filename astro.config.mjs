import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.digital-factory.lu',
  integrations: [
    react(),
    tailwind(),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
});
