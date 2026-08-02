<template>
  <section class="panel">
    <h2>Links</h2>
    <ul>
      <li>
        <span>Sign Up → Verify Email</span>
        <span class="badge">Parallel</span>
        <button type="button">Remove</button>
      </li>
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

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.badge {
  font-size: 0.8rem;
  color: #57606a;
}
</style>
