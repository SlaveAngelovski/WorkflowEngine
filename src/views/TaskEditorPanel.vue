<template>
  <section class="panel">
    <h2>Add Task</h2>
    <label>
      Task Name
      <input type="text" placeholder="New Task" />
    </label>
    <label>
      State
      <select>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </label>
    <button type="button">Create Task</button>
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
