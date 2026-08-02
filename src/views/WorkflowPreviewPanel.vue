<template>
    <PanelCard title="Workflow Preview">
        <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between gap-3">
                <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">Current workflow</p>
                    <h3 class="text-lg font-semibold text-slate-800">{{ runtime.workflow.value.name }}</h3>
                </div>
                <span class="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium uppercase text-slate-600">
                    {{ runtime.workflow.value.state }}
                </span>
            </div>

            <div class="grid gap-3 md:grid-cols-2">
                <div v-for="task in runtime.workflow.value.tasks" :key="task.id"
                    class="rounded-md border border-slate-200 bg-slate-50 p-3">
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-slate-700">{{ task.name }}</span>
                        <span class="rounded-full bg-white px-2 py-1 text-xs text-slate-600">{{ task.state }}</span>
                    </div>
                    <p class="mt-2 text-sm text-slate-500">
                        {{runtime.workflow.value.links.filter((link) => link.sourceTaskId === task.id).length}}
                        outgoing link(s)
                    </p>
                </div>
            </div>
        </div>
    </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import { workflowRuntime } from '../engine/workflowRuntime'

const runtime = workflowRuntime
</script>
