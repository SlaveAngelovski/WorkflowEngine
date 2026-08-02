<template>
  <section class="panel">
    <h2>Create Link</h2>
    <label>
      Link Name
      <input type="text" placeholder="Link 1" />
    </label>
    <label>
      Source Task
      <select>
        <option value="task-signup">Sign Up</option>
      </select>
    </label>
    <label>
      Link Type
      <select>
        <option value="linear">Linear</option>
        <option value="parallel">Parallel</option>
        <option value="conditional">Conditional</option>
      </select>
    </label>
    <label>
      Target Tasks
      <select multiple>
        <option value="task-verify">Verify Email</option>
        <option value="task-profile">Add Profile</option>
      </select>
    </label>
    <label>
      Trigger State
      <select>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </label>
    <label>
      Target State
      <select>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </label>
    <div class="condition-block">
      <h3>Condition</h3>
      <label>
        Condition Type
        <select>
          <option value="all-completed">All Completed</option>
          <option value="state-equals">State Equals</option>
        </select>
      </label>
      <label>
        Task IDs
        <select multiple>
          <option value="task-verify">Verify Email</option>
          <option value="task-profile">Add Profile</option>
        </select>
      </label>
      <label>
        Expected State
        <select>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>
    </div>
    <button type="button">Create Link</button>
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

.condition-block {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #d0d7de;
}
</style>
