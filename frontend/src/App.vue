<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuth } from "./composables/useAuth";

const { state } = useAuth();
</script>

<template>
  <div class="page-frame">
    <div v-if="state.loading" class="center-state">Preparando sesion...</div>
    <div v-else-if="state.error && state.session" class="center-state error">{{ state.error }}</div>
    <RouterView v-else />
  </div>
</template>

