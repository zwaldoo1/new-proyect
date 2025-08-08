import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    server: {
      allowedHosts: 'all', // 👈 esta línea es clave
    },
  },
});
