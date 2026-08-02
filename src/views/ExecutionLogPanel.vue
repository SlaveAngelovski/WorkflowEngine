<template>
  <PanelCard title="Execution Log">
    <ul>
      <li>Sign Up moved to Completed</li>
      <li>Verify Email moved to In Progress</li>
      <li>Add Profile moved to In Progress</li>
    </ul>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
