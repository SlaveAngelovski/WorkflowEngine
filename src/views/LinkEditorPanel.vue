<template>
  <PanelCard title="Create Link">
    <FormField label="Link Name">
      <input type="text" placeholder="Link 1" />
    </FormField>
    <FormField label="Source Task">
      <select>
        <option value="task-signup">Sign Up</option>
      </select>
    </FormField>
    <FormField label="Link Type">
      <select>
        <option value="linear">Linear</option>
        <option value="parallel">Parallel</option>
        <option value="conditional">Conditional</option>
      </select>
    </FormField>
    <FormField label="Target Tasks">
      <select multiple>
        <option value="task-verify">Verify Email</option>
        <option value="task-profile">Add Profile</option>
      </select>
    </FormField>
    <FormField label="Trigger State">
      <select>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </FormField>
    <FormField label="Target State">
      <select>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </FormField>
    <div class="condition-block">
      <h3>Condition</h3>
      <FormField label="Condition Type">
        <select>
          <option value="all-completed">All Completed</option>
          <option value="state-equals">State Equals</option>
        </select>
      </FormField>
      <FormField label="Task IDs">
        <select multiple>
          <option value="task-verify">Verify Email</option>
          <option value="task-profile">Add Profile</option>
        </select>
      </FormField>
      <FormField label="Expected State">
        <select>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </FormField>
    </div>
    <BaseButton>Create Link</BaseButton>
  </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import FormField from '../components/FormField.vue'
import BaseButton from '../components/BaseButton.vue'
</script>

<style scoped>
.condition-block {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #d0d7de;
}
</style>
