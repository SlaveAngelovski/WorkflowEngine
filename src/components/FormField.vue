<template>
  <label class="mt-3 flex flex-col gap-1">
    <span class="text-sm font-semibold text-slate-700">{{ label }}</span>
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
