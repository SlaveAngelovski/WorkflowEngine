<template>
  <PanelCard title="Workflow Preview">
    <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h3 class="mb-2 font-semibold text-slate-800">{{ workflow.name }}</h3>
      <p v-for="task in workflow.tasks" :key="task.id" class="text-sm text-slate-600">
        {{ task.name }}: {{ task.state }}
      </p>
    </div>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import { sampleWorkflow } from '../data/sampleWorkflow'

const workflow = sampleWorkflow
</script>
