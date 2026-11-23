import { copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/personal-library/" : "/",
  plugins: [
    react(),
    {
      name: "spa-fallback-404",
      closeBundle() {
        const dist = resolve("dist");
        copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
        writeFileSync(resolve(dist, ".nojekyll"), "");
      },
    },
  ],
});
