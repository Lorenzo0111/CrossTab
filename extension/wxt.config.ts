import { defineConfig } from "wxt";

export default defineConfig({
  manifest: {
    name: "CrossTab",
    permissions: ["storage", "tabs", "alarms"],
  },
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
});
