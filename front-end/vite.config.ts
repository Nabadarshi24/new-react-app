import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const ReactCompilerConfig = {/* ... */ };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  // base: "/new-react-app/",
  server: {
    open: true
    // open: "/login"
  }
})
