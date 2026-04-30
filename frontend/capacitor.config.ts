import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.veterinariaasier.app",
  appName: "Veterinaria Asier",
  webDir: "dist",
  android: {
    path: "android"
  },
  server: {
    androidScheme: "http"
  }
};

export default config;
