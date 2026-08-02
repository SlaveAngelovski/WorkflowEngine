<template>
  <section class="panel">
    <h2>Execution Log</h2>
    <ul>
      <li>Sign Up moved to Completed</li>
      <li>Verify Email moved to In Progress</li>
      <li>Add Profile moved to In Progress</li>
    </ul>
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

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
