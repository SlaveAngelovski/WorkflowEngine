<template>
    <PanelCard title="Links">
        <ul class="flex flex-col gap-3">
            <li v-for="link in runtime.workflow.value.links" :key="link.id"
                class="rounded-md border border-slate-200 bg-slate-50 p-3">
                <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0 flex-1">
                        <p class="font-medium text-slate-800">{{ link.name }}</p>
                        <div class="mt-2 rounded-md border border-slate-200 bg-white p-2">
                            <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Transition</p>
                            <p class="mt-1 text-sm text-slate-700">{{ getLinkDescription(link) }}</p>
                        </div>
                        <div class="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                            <span class="rounded-full bg-white px-2 py-1">{{ formatLinkType(link.linkType) }}</span>
                            <span class="rounded-full bg-white px-2 py-1">From {{ getSourceName(link) }}</span>
                            <span class="rounded-full bg-white px-2 py-1">To {{ getTargetNames(link) }}</span>
                        </div>
                        <p v-if="link.condition" class="mt-2 text-xs text-slate-500">
                            Condition: {{ getConditionSummary(link) }}
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

function getSourceName(link: Link) {
    return runtime.workflow.value.tasks.find((task) => task.id === link.sourceTaskId)?.name ?? link.sourceTaskId
}

function getLinkLabel(link: Link) {
    const source = getSourceName(link)
    const targets = link.targetTaskIds
        .map((targetId) => runtime.workflow.value.tasks.find((task) => task.id === targetId)?.name ?? targetId)
        .join(', ')

    return `${source} → ${targets}`
}

function getLinkDescription(link: Link) {
    return `When ${getSourceName(link)} is ${formatStateLabel(link.triggerState)}, it updates ${getTargetNames(link)} to ${formatStateLabel(link.targetState)}.`
}

function formatStateLabel(state: string) {
    switch (state) {
        case 'pending':
            return 'Pending'
        case 'in-progress':
            return 'In Progress'
        case 'completed':
            return 'Completed'
        default:
            return state
    }
}

function formatLinkType(linkType: string) {
    switch (linkType) {
        case 'default':
            return 'Default transition'
        case 'conditional':
            return 'Conditional transition'
        default:
            return linkType
    }
}

function getConditionSummary(link: Link) {
    if (!link.condition) {
        return ''
    }

    const taskNames = (link.condition.taskIds ?? [])
        .map((taskId) => runtime.workflow.value.tasks.find((task) => task.id === taskId)?.name ?? taskId)
        .join(', ')

    if (!taskNames) {
        return ''
    }

    if (link.condition.expectedState) {
        return `on ${taskNames} = ${link.condition.expectedState}`
    }

    return `on ${taskNames}`
}

function getTargetNames(link: Link) {
    return link.targetTaskIds
        .map((targetId) => runtime.workflow.value.tasks.find((task) => task.id === targetId)?.name ?? targetId)
        .join(', ')
}
</script>
