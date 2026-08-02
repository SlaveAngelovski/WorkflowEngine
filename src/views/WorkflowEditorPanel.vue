<template>
    <PanelCard title="Workflow Editor" class="flex gap-4">
        <FormField label="Workflow Name">
            <input class="rounded-md border border-slate-300 px-3 py-2" type="text" :value="workflow.name" />
        </FormField>
        <FormField label="State">
            <select class="rounded-md border border-slate-300 px-3 py-2" :value="workflow.state">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
        </FormField>
    </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import FormField from '../components/FormField.vue'
import { sampleWorkflow } from '../data/sampleWorkflow'

const workflow = sampleWorkflow
</script>
