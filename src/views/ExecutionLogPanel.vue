<template>
    <PanelCard title="Execution Log">
        <ul class="flex flex-col gap-2 text-sm text-slate-600">
            <li v-for="event in runtime.events.value" :key="event.id">
                {{ event.message }}
            </li>
            <li v-if="!runtime.events.value.length">No runtime events yet.</li>
        </ul>
    </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import { workflowRuntime } from '../engine/workflowRuntime'

const runtime = workflowRuntime
</script>
