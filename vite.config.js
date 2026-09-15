import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

/**
 * Dev: balas 404 (bukan SPA-fallback index.html) untuk file /assets/* yang tidak
 * ada, supaya loader Phaser cepat gagal & placeholder terpasang. Tanpa ini Vite
 * mengembalikan 200 + index.html untuk aset yang belum dibuat.
 */
function assets404() {
  const publicDir = fileURLToPath(new URL('./public', import.meta.url));
  return {
    name: 'assets-404-in-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0];
        if (path?.startsWith('/assets/') && !existsSync(publicDir + decodeURIComponent(path))) {
          res.statusCode = 404;
          res.end('asset not found');
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [svelte(), assets404()],
  server: { host: true },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1600, // phaser memang besar, sudah di-chunk terpisah
    // pisahkan Phaser ke chunk sendiri — ukurannya besar, biar cache-nya awet
    rollupOptions: {
      output: {
        manualChunks: { phaser: ['phaser'] },
      },
    },
  },
});
