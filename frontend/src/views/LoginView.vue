<script setup lang="ts">
import { isMobileFrontendVariant } from "../config/frontend";
import { useAuth } from "../composables/useAuth";

const { signInWithGitHub, state } = useAuth();
const isMobileFrontend = isMobileFrontendVariant();
</script>

<template>
  <section class="login-view" :class="{ 'mobile-login-view': isMobileFrontend }">
    <div v-if="isMobileFrontend" class="mobile-login-card">
      <span class="hero-kicker">Acceso rapido</span>
      <p class="eyebrow">Clinica veterinaria</p>
      <h1>Gestion veterinaria desde cualquier sitio</h1>
      <p class="hero-copy">
        Entra con GitHub para revisar catalogo, adopciones y tareas de administracion desde el movil.
      </p>
      <ul class="mobile-bullet-list">
        <li>Consulta tu perfil y tu rol activo.</li>
        <li>Visualiza ofertas y acceso a exclusivas.</li>
        <li>Gestiona catalogo y adopciones si tu rol lo permite.</li>
      </ul>
      <button class="button primary" type="button" @click="signInWithGitHub">
        Entrar con GitHub
      </button>
      <p v-if="state.error" class="hero-copy error">{{ state.error }}</p>
    </div>

    <div v-else class="hero-panel">
      <span class="hero-kicker">Acceso seguro</span>
      <p class="eyebrow">Veterinaria Asier</p>
      <h1>Veterinaria Asier</h1>
      <p class="hero-copy">
        Gestiona adopciones, ofertas y servicios veterinarios desde un unico acceso.
      </p>
      <button class="button primary" type="button" @click="signInWithGitHub">
        Entrar con GitHub
      </button>
      <p v-if="state.error" class="hero-copy error">{{ state.error }}</p>
    </div>
  </section>
</template>
