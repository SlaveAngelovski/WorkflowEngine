<template>
    <section class="rounded-lg border border-slate-300 bg-white p-4 shadow-sm">
        <h2 v-if="title" class="mb-3 text-lg font-semibold text-slate-800">{{ title }}</h2>
        <slot />
    </section>
</template>

<script setup lang="ts">
defineProps<{
    title?: string
}>()
</script>
