<template>
  <PanelCard title="Workflow Editor">
    <FormField label="Workflow Name">
      <input type="text" placeholder="Onboarding" />
    </FormField>
    <FormField label="State">
      <select>
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
</script>
