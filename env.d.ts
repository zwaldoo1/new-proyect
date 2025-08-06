/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MP_ACCESS_TOKEN: string;
  // otros .env que uses...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
