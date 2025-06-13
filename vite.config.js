import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['admin.simplifin.in'],
    host: true, // allow external access
    port: 5173 // optional: if you want to fix the port
  }
});
