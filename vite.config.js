import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_TARGET = "http://18.232.33.127:8000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      "/api": {
        target: API_TARGET,
        changeOrigin: true,
      },
      "/media": {
        target: API_TARGET,
        changeOrigin: true,
      },
    },
  },
});
