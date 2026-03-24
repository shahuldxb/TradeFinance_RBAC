
import { defineConfig } from 'vite';
import { loadEnv } from 'vite'; // 👈 added
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 added block ONLY
const env = loadEnv(
  process.env.NODE_ENV || 'development',
  path.resolve(__dirname, 'client'),
  ''
);

console.log('VITE_APP_NAME:', env.VITE_APP_NAME);
console.log('VITE_APP_VERSION:', env.VITE_APP_VERSION);
console.log('VITE_APP_API_URL:', env.VITE_APP_API_URL);
console.log('VITE_CLIENT_PORT:', env.VITE_CLIENT_PORT);
console.log('VITE_BACKEND_URL:', env.VITE_BACKEND_URL);
console.log('VITE_NODE_API_URL:', env.VITE_NODE_API_URL);
const CLIENT_PORT = parseInt(env.VITE_CLIENT_PORT);
export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: Number(env.VITE_CLIENT_PORT),
    strictPort: true,
    proxy: {
      "/api/ingest": {
        target: env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
      "/api/lc": {
        target: env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target:env.VITE_NODE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    }
  }
});
