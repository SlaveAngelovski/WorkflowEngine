<template>
  <section class="panel">
    <h2>Workflow Editor</h2>
    <label>
      Workflow Name
      <input type="text" placeholder="Onboarding" />
    </label>
    <label>
      State
      <select>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </label>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.panel {
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.75rem;
}
</style>
