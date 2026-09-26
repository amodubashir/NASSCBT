import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // VITE_API_URL comes from the shell or this repo's .env. It is also exposed to the app
  // as import.meta.env.VITE_API_URL; the dev server proxies /api to the same host.
  const env = loadEnv(mode, fileURLToPath(new URL('.', import.meta.url)), '');
  const apiUrl = new URL(env.VITE_API_URL || 'http://localhost:5000/api/v1');

  return {
    plugins: [react()],
    server: { proxy: { '/api': apiUrl.origin } },
  };
});
