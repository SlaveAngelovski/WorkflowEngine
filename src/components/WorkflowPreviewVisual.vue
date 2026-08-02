<template>
  <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="font-semibold text-slate-800">{{ workflow.name }}</h3>
      <span class="rounded-full bg-slate-200 px-2 py-1 text-xs font-medium uppercase text-slate-600">
        {{ workflow.state }}
      </span>
    </div>

    <div class="flex flex-col gap-4">
      <div v-for="task in workflow.tasks" :key="task.id" class="rounded-lg border border-slate-300 bg-white p-3 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="font-medium text-slate-700">{{ task.name }}</span>
          <span class="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">{{ task.state }}</span>
        </div>

        <div v-if="getOutgoingLinks(task.id).length" class="mt-3 flex flex-wrap gap-2">
          <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">Links</span>
          <span
            v-for="link in getOutgoingLinks(task.id)"
            :key="link.id"
            class="rounded-full border border-slate-300 bg-slate-50 px-2 py-1 text-xs text-slate-600"
          >
            {{ link.name }} → {{ getTargetNames(link) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Link, Workflow } from '../types/workflow'

const props = defineProps<{
  workflow: Workflow
}>()

function getOutgoingLinks(taskId: string) {
  return props.workflow.links.filter((link) => link.sourceTaskId === taskId)
}

function getTargetNames(link: Link) {
  return link.targetTaskIds
    .map((targetId) => props.workflow.tasks.find((task) => task.id === targetId)?.name ?? targetId)
    .join(', ')
}
</script>
