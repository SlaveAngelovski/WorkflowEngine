<template>
  <PanelCard title="Add Task">
    <FormField label="Task Name">
      <input type="text" placeholder="New Task" />
    </FormField>
    <FormField label="State">
      <select>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </FormField>
    <BaseButton>Create Task</BaseButton>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import FormField from '../components/FormField.vue'
import BaseButton from '../components/BaseButton.vue'
</script>
