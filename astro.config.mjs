import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // o 'edge' si quieres Edge Functions

export default defineConfig({
  output: 'server', // 👈 Necesario para API routes
  adapter: vercel(),
});
