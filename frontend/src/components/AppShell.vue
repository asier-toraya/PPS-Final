<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { isMobileFrontendVariant } from "../config/frontend";
import { useAuth } from "../composables/useAuth";

const route = useRoute();
const { state, signOut } = useAuth();
const isMobileFrontend = isMobileFrontendVariant();

const links = computed(() => {
  const items = [
    { to: "/", label: "Resumen" },
    { to: "/catalogo", label: "Catalogo" }
  ];

  if (state.profile?.permissions.canManageAdminData) {
    items.push({ to: "/admin", label: "Admin" });
  }

  return items;
});
</script>

<template>
  <div class="app-shell" :class="{ 'mobile-app-shell': isMobileFrontend }">
    <template v-if="isMobileFrontend">
      <header class="mobile-topbar">
        <div>
          <p class="eyebrow">Clinica veterinaria</p>
          <h1>Veterinaria Asier</h1>
        </div>
        <button class="button ghost compact-button" type="button" @click="signOut">Salir</button>
      </header>

      <main class="content-shell mobile-content-shell">
        <slot />
      </main>

      <nav class="mobile-nav">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="mobile-nav-link"
          :class="{ active: route.path === link.to }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </template>

    <template v-else>
      <header class="topbar">
        <div>
          <p class="eyebrow">Clinica veterinaria</p>
          <h1>Veterinaria Asier</h1>
        </div>

        <nav class="nav-links">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="nav-link"
            :class="{ active: route.path === link.to }"
          >
            {{ link.label }}
          </RouterLink>
          <button class="button ghost" type="button" @click="signOut">Salir</button>
        </nav>
      </header>

      <div class="chrome-line" aria-hidden="true"></div>

      <main class="content-shell">
        <slot />
      </main>
    </template>
  </div>
</template>
