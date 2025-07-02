import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  base: "http://olyabogdanova.github.io/fs-test/",
  css: {
    preprocessorOptions: {
      scss: {
        sourceMap: false,
        additionalData(source, fp) {
          if (fp.endsWith("variables.scss")) return source;
          return `@import "@/assets/styles/variables.scss"; ${source}`;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    vue(
      {
        script: {
          defineModel: true,
        },
      },
      vueDevTools()
    ),
  ],
});
