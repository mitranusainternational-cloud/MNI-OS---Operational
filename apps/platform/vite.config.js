import { defineConfig, loadEnv } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Load env vars based on mode (.env.local for dev, .env for prod)
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    root: '.',
    publicDir: 'public',

    build: {
      outDir: 'dist',
      target: 'esnext', // adapter memakai top-level await
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      },
      assetsInlineLimit: 0,
    },

    server: {
      port: 5173,
      host: true,
      open: true,
      cors: true
    },

    preview: {
      port: 4173,
      host: true
    },

    // Inject Supabase config as window.__ENV (available to vanilla JS app)
    define: {
      'window.__ENV': JSON.stringify({
        SUPABASE_URL: env.VITE_SUPABASE_URL || '',
        SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY || '',
        APP_VERSION: env.VITE_APP_VERSION || '1.0.0',
        LOCAL_MOCK: env.VITE_LOCAL_MOCK || ''
      })
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@lib': resolve(__dirname, 'src/lib')
      }
    }
  };
});
