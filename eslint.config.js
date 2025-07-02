import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginOxlint from "eslint-plugin-oxlint";

export default defineConfig([
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"],
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        defineModel: "readonly",
        defineOptions: "readonly",
        defineSlots: "readonly",
        defineProps: "readonly",
        defineEmits: "readonly",
        withDefaults: "readonly",
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...pluginOxlint.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: pluginVue.parsers["vue-eslint-parser"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      "vue/script-setup-uses-vars": "error", // Helps with script setup variables
    },
  },
]);
