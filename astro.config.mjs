import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://yaosongding.github.io",
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
