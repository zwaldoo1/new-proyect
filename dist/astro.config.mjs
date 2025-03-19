import { defineConfig } from 'astro/config';

export default defineConfig({
  build: {
    // Asegúrate de que el objetivo de salida sea compatible con ESModules
    target: 'es2020',
  },
  alias: {
    '@styles': './src/styles', // Alias para las rutas
  },
});

