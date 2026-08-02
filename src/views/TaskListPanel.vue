<template>
  <PanelCard title="Tasks">
    <ul>
      <li>
        <span>Sign Up</span>
        <span class="badge">Pending</span>
        <BaseButton>Remove</BaseButton>
      </li>
      <li>
        <span>Verify Email</span>
        <span class="badge">Pending</span>
        <BaseButton>Remove</BaseButton>
      </li>
    </ul>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import BaseButton from '../components/BaseButton.vue'
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
