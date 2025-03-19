import { defineConfig } from 'astro/config';

export default defineConfig({
  output: "server", // Si tienes backend, usa "server", si es solo frontend usa "static"
  
  build: {
    target: 'es2020', // Asegura compatibilidad con ESModules
  },
  
  alias: {
    '@styles': './src/styles', // Alias para rutas
  }
});

