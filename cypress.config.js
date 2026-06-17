import { defineConfig } from "cypress";
import { beforeEach } from "mocha";

export default defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    html: true,
    json: false,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
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
