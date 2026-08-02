<template>
  <button class="base-button" type="button">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
.base-button {
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #f6f8fa;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
</style>
