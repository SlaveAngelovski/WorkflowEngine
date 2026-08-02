<template>
  <PanelCard title="Tasks">
    <ul class="flex flex-col gap-3">
      <li class="flex items-center justify-between gap-3">
        <span>Sign Up</span>
        <span class="text-sm text-slate-500">Pending</span>
        <BaseButton>Remove</BaseButton>
      </li>
      <li class="flex items-center justify-between gap-3">
        <span>Verify Email</span>
        <span class="text-sm text-slate-500">Pending</span>
        <BaseButton>Remove</BaseButton>
      </li>
    </ul>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import BaseButton from '../components/BaseButton.vue'
</script>
