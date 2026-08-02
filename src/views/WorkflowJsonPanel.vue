<template>
    <PanelCard title="Workflow JSON">
        <pre
            class="max-h-[50vh] overflow-auto rounded-md bg-slate-950 p-3 text-xs leading-6 text-slate-100">{{ formattedWorkflow }}</pre>
    </PanelCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PanelCard from '../components/PanelCard.vue'
import { workflowRuntime } from '../engine/workflowRuntime'

const runtime = workflowRuntime

const formattedWorkflow = computed(() => JSON.stringify(runtime.workflow.value, null, 2))
</script>
