<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  tone?: "default" | "accent";
}>();
</script>

<template>
  <article class="info-card" :class="tone ?? 'default'">
    <p>{{ title }}</p>
    <strong>{{ value }}</strong>
  </article>
</template>

