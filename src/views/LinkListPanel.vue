<template>
  <PanelCard title="Links">
    <ul class="flex flex-col gap-3">
      <li v-for="link in workflow.links" :key="link.id" class="flex items-center justify-between gap-3">
        <span>{{ getLinkLabel(link) }}</span>
        <span class="text-sm text-slate-500">{{ link.linkType }}</span>
        <BaseButton>Remove</BaseButton>
      </li>
    </ul>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import BaseButton from '../components/BaseButton.vue'
import { sampleWorkflow } from '../data/sampleWorkflow'
import type { Link } from '../types/workflow'

const workflow = sampleWorkflow

function getLinkLabel(link: Link) {
  const source = workflow.tasks.find((task) => task.id === link.sourceTaskId)?.name ?? link.sourceTaskId
  const targets = link.targetTaskIds
    .map((targetId) => workflow.tasks.find((task) => task.id === targetId)?.name ?? targetId)
    .join(', ')

  return `${source} → ${targets}`
}
</script>
