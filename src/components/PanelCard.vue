<template>
  <section class="panel-card">
    <h2 v-if="title">{{ title }}</h2>
    <slot />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style scoped>
.panel-card {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
}
</style>
