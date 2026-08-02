<template>
    <button :type="type"
        class="rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
        <slot />
    </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    type?: 'button' | 'submit' | 'reset'
}>(), {
    type: 'button',
})
</script>
