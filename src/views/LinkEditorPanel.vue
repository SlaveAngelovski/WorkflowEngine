<template>
  <PanelCard title="Create Link">
    <FormField label="Link Name">
      <input class="rounded-md border border-slate-300 px-3 py-2" type="text" placeholder="Link 1" />
    </FormField>
    <FormField label="Source Task">
      <select class="rounded-md border border-slate-300 px-3 py-2">
        <option value="task-signup">Sign Up</option>
      </select>
    </FormField>
    <FormField label="Link Type">
      <select class="rounded-md border border-slate-300 px-3 py-2">
        <option value="linear">Linear</option>
        <option value="parallel">Parallel</option>
        <option value="conditional">Conditional</option>
      </select>
    </FormField>
    <FormField label="Target Tasks">
      <select class="rounded-md border border-slate-300 px-3 py-2" multiple>
        <option value="task-verify">Verify Email</option>
        <option value="task-profile">Add Profile</option>
      </select>
    </FormField>
    <FormField label="Trigger State">
      <select class="rounded-md border border-slate-300 px-3 py-2">
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </FormField>
    <FormField label="Target State">
      <select class="rounded-md border border-slate-300 px-3 py-2">
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </FormField>
    <div class="mt-4 border-t border-slate-200 pt-3">
      <h3 class="text-sm font-semibold text-slate-700">Condition</h3>
      <FormField label="Condition Type">
        <select class="rounded-md border border-slate-300 px-3 py-2">
          <option value="all-completed">All Completed</option>
          <option value="state-equals">State Equals</option>
        </select>
      </FormField>
      <FormField label="Task IDs">
        <select class="rounded-md border border-slate-300 px-3 py-2" multiple>
          <option value="task-verify">Verify Email</option>
          <option value="task-profile">Add Profile</option>
        </select>
      </FormField>
      <FormField label="Expected State">
        <select class="rounded-md border border-slate-300 px-3 py-2">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </FormField>
    </div>
    <div class="mt-4">
      <BaseButton>Create Link</BaseButton>
    </div>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import FormField from '../components/FormField.vue'
import BaseButton from '../components/BaseButton.vue'
</script>
