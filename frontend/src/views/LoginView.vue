<script setup lang="ts">
import { useAuth } from "../composables/useAuth";

const { signInWithGitHub } = useAuth();
</script>

<template>
  <section class="login-view">
    <div class="hero-panel">
      <span class="hero-kicker">Acceso seguro</span>
      <p class="eyebrow">Veterinaria Asier</p>
      <h1>Veterinaria Asier</h1>
      <p class="hero-copy">
        Gestiona adopciones, ofertas y servicios veterinarios desde un unico acceso.
      </p>
      <button class="button primary" type="button" @click="signInWithGitHub">
        Entrar con GitHub
      </button>
    </div>
  </section>
</template>
