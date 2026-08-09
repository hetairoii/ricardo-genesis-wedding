// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ricardo-genesis-wedding.pages.dev', // PENDIENTE: reemplazar por el dominio final de despliegue
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      // Prefijo `astro-` para no colisionar con el token `--font-serif` que
      // Tailwind v4 genera desde @theme en global.css (ese token referencia a este).
      cssVariable: '--astro-font-serif',
      weights: [300, 400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Alex Brush',
      cssVariable: '--astro-font-script',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
    {
      provider: fontProviders.google(),
      name: 'Jost',
      cssVariable: '--astro-font-label',
      weights: [300, 400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Helvetica', 'Arial', 'sans-serif'],
    },
  ],
});
