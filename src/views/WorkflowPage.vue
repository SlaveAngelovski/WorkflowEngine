<template>
  <section class="workflow-page">
    <header class="workflow-page__header">
      <div>
        <h1>Workflow Engine</h1>
        <p>Create workflows, manage tasks, connect links, and observe runtime updates.</p>
      </div>
      <div class="workflow-page__actions">
        <button type="button">Create Workflow</button>
        <button type="button">Add Task</button>
        <button type="button">Add Link</button>
      </div>
    </header>

    <div class="workflow-page__grid">
      <WorkflowEditorPanel />
      <TaskListPanel />
      <LinkListPanel />
      <TaskEditorPanel />
      <LinkEditorPanel />
      <ExecutionLogPanel />
      <WorkflowPreviewPanel />
    </div>
  </section>
</template>

<script setup lang="ts">
import WorkflowEditorPanel from './WorkflowEditorPanel.vue'
import TaskListPanel from './TaskListPanel.vue'
import LinkListPanel from './LinkListPanel.vue'
import TaskEditorPanel from './TaskEditorPanel.vue'
import LinkEditorPanel from './LinkEditorPanel.vue'
import ExecutionLogPanel from './ExecutionLogPanel.vue'
import WorkflowPreviewPanel from './WorkflowPreviewPanel.vue'
</script>

<style scoped>
.workflow-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.workflow-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.workflow-page__actions {
  display: flex;
  gap: 0.5rem;
}

.workflow-page__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: 1rem;
}
</style>
