import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5500/src", // Aponta diretamente para a pasta src
    setupNodeEvents(on, config) {
      // listeners de eventos se necessário
    },
  },
});
