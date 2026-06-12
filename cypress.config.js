import { defineConfig } from "cypress";
import { beforeEach } from "mocha";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter", // 🛠️ Define o gerador de relatórios
  e2e: {
    baseUrl: "http://localhost:5500",
    supportFile: false,
    setupNodeEvents(on, config) {
      import("cypress-mochawesome-reporter/plugin").then((plugin) => {
        plugin.default(on);
      });
    },
  },
});
