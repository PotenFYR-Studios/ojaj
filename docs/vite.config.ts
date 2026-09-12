import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

// Per-route HTML emission, SEO meta and prerendering live in
// scripts/prerender.ts (post-build step), so every emitted page starts
// from vite's clean index.html shell.
export default defineConfig({
  root,
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },
  server: { port: 5175 },
});
