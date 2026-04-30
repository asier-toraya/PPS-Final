import { createApp } from "vue";
import { IonicVue } from "@ionic/vue";
import App from "./App.vue";
import { router } from "./router";
import "@ionic/vue/css/core.css";
import "./assets/styles.css";

createApp(App).use(IonicVue).use(router).mount("#app");

