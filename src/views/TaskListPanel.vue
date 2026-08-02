<template>
  <PanelCard title="Tasks">
    <ul class="flex flex-col gap-3">
      <li v-for="task in workflow.tasks" :key="task.id" class="flex items-center justify-between gap-3">
        <span>{{ task.name }}</span>
        <span class="text-sm text-slate-500">{{ task.state }}</span>
        <BaseButton>Remove</BaseButton>
      </li>
    </ul>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import BaseButton from '../components/BaseButton.vue'
import { sampleWorkflow } from '../data/sampleWorkflow'

const workflow = sampleWorkflow
</script>
