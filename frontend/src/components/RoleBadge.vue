<script setup lang="ts">
defineProps<{
  role: string;
}>();
</script>

<template>
  <span class="badge role">{{ role }}</span>
</template>

