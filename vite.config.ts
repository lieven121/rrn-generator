import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";
import { defineConfig, lazyPlugins } from "vite-plus";
import { seoPlugin } from "./seo.ts";

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site: https://lieven121.github.io/rrn-generator/
  base: "/rrn-generator/",
  build: {
    rollupOptions: {
      input: {
        en: page("./index.html"),
        nl: page("./nl/index.html"),
        fr: page("./fr/index.html"),
      },
    },
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: lazyPlugins(() => [vue(), seoPlugin()]),
});
