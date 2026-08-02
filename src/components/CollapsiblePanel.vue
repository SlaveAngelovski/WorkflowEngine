<template>
    <div class="relative">
        <button type="button"
            class="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-left shadow-sm"
            @click="toggle">
            <span class="font-semibold text-slate-800">{{ title }}</span>
            <span class="text-sm text-slate-500">{{ isOpen ? 'Hide' : 'Show' }}</span>
        </button>

        <div v-if="isOpen" class="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    title: string
    defaultOpen?: boolean
}>()

const isOpen = ref(props.defaultOpen ?? true)

function toggle() {
    isOpen.value = !isOpen.value
}
</script>
