import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Fast BodyWise builds — skip copying huge public/ (atlas copied separately). */
export default defineConfig({
  base: "./",
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: "kh-bw-atlas",
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
    chunkSizeWarningLimit: 4000,
  },
});
