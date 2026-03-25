import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const API_TARGET = "https://api.findgarageandyardsale.com";

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
