<script setup lang="ts">
import type { Offer } from "../types/app";

defineProps<{
  offer: Offer;
  locked: boolean;
}>();
</script>

<template>
  <article class="offer-card" :class="{ locked }">
    <div class="offer-head">
      <span class="badge neutral">{{ offer.domain === "store" ? "Tienda" : "Servicio" }}</span>
      <span v-if="offer.is_exclusive" class="badge accent">Oferta exclusiva</span>
    </div>
    <h3>{{ offer.title }}</h3>
    <p>{{ offer.description }}</p>
    <small v-if="locked">Requiere adopción previa</small>
  </article>
</template>

