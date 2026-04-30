<script setup lang="ts">
import { watch } from "vue";
import { IonApp } from "@ionic/vue";
import { RouterView } from "vue-router";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "./composables/useAuth";

const { state } = useAuth();
const route = useRoute();
const router = useRouter();

watch(
  () => state.session,
  (session) => {
    if (session && route.name === "login") {
      void router.replace({ name: "dashboard" });
    }
  },
  { immediate: true }
);
</script>

<template>
  <IonApp>
    <div class="page-frame">
      <div v-if="state.loading" class="center-state">Preparando sesion...</div>
      <div v-else-if="state.error && state.session" class="center-state error">{{ state.error }}</div>
      <RouterView v-else />
    </div>
  </IonApp>
</template>

