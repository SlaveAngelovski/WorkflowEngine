<template>
  <PanelCard title="Workflow Preview">
    <WorkflowPreviewVisual :workflow="workflow" />
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import WorkflowPreviewVisual from '../components/WorkflowPreviewVisual.vue'
import { sampleWorkflow } from '../data/sampleWorkflow'

const workflow = sampleWorkflow
</script>
