import path from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const __dirname = path.resolve();
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src/"),
      "@/constants": path.resolve(__dirname, "./src/constants/"),
      "@/components": path.resolve(__dirname, "./src/components/"),
      "@/pages": path.resolve(__dirname, "./src/pages/"),
      "@/types": path.resolve(__dirname, "./src/types/"),
      "@/apis": path.resolve(__dirname, "./src/apis/"),
      "@/assets": path.resolve(__dirname, "./src/assets/"),
      "@/libs": path.resolve(__dirname, "./src/libs/"),
      "@/utils": path.resolve(__dirname, "./src/utils/"),
    },
  },
  plugins: [react()],
});
