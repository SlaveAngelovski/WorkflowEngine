<template>
    <PanelCard title="Links">
        <ul class="flex flex-col gap-3">
            <li v-for="link in runtime.workflow.value.links" :key="link.id"
                class="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0 flex-1">
                        <p class="font-medium text-slate-800">{{ link.name }}</p>
                        <p class="mt-1 text-sm text-slate-600">{{ getLinkLabel(link) }}</p>
                        <div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                            <span class="rounded-full bg-white px-2 py-1">{{ link.linkType }}</span>
                            <span class="rounded-full bg-white px-2 py-1">trigger: {{ link.triggerState }}</span>
                            <span class="rounded-full bg-white px-2 py-1">target: {{ link.targetState }}</span>
                            <span class="rounded-full bg-white px-2 py-1">targets: {{ getTargetNames(link) }}</span>
                        </div>
                        <p v-if="link.condition" class="mt-2 text-xs text-slate-500">
                            condition: {{ link.condition.type }} {{ getConditionSummary(link) }}
                        </p>
                    </div>
                    <BaseButton @click="runtime.deleteLink(link.id)">Remove</BaseButton>
                </div>
            </li>
        </ul>
    </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import BaseButton from '../components/BaseButton.vue'
import { workflowRuntime } from '../engine/workflowRuntime'
import type { Link } from '../types/workflow'

const runtime = workflowRuntime

function getLinkLabel(link: Link) {
    const source = runtime.workflow.value.tasks.find((task) => task.id === link.sourceTaskId)?.name ?? link.sourceTaskId
    const targets = link.targetTaskIds
        .map((targetId) => runtime.workflow.value.tasks.find((task) => task.id === targetId)?.name ?? targetId)
        .join(', ')

    return `${source} → ${targets}`
}

function getConditionSummary(link: Link) {
    if (!link.condition) {
        return ''
    }

    const taskNames = (link.condition.taskIds ?? [])
        .map((taskId) => runtime.workflow.value.tasks.find((task) => task.id === taskId)?.name ?? taskId)
        .join(', ')

    return taskNames ? `on ${taskNames} = ${link.condition.expectedState}` : `= ${link.condition.expectedState}`
}

function getTargetNames(link: Link) {
    return link.targetTaskIds
        .map((targetId) => runtime.workflow.value.tasks.find((task) => task.id === targetId)?.name ?? targetId)
        .join(', ')
}
</script>
