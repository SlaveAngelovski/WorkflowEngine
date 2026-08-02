<template>
  <PanelCard title="Workflow Preview">
    <div class="preview-card">
      <h3>Onboarding</h3>
      <p>Sign Up: Pending</p>
      <p>Verify Email: Pending</p>
      <p>Add Profile: Pending</p>
    </div>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
</script>

<style scoped>
.preview-card {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 1rem;
  background: #f6f8fa;
}
</style>
