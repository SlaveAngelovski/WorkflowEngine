<template>
    <section class="flex flex-col gap-4 p-4">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-semibold text-slate-900">Workflow Engine</h1>
                <p class="text-sm text-slate-600">Create workflows, manage tasks, connect links, and observe runtime
                    updates.</p>
            </div>
            <div class="flex gap-2">
                <BaseButton>Create Workflow</BaseButton>
                <BaseButton>Add Task</BaseButton>
                <BaseButton>Add Link</BaseButton>
            </div>
        </header>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <WorkflowPreviewPanel />
            <WorkflowEditorPanel />
            <TaskListPanel />
            <LinkListPanel />
            <TaskEditorPanel />
            <LinkEditorPanel />
            <ExecutionLogPanel />
        </div>
    </section>
</template>

<script setup lang="ts">
import BaseButton from '../components/BaseButton.vue'
import WorkflowEditorPanel from './WorkflowEditorPanel.vue'
import TaskListPanel from './TaskListPanel.vue'
import LinkListPanel from './LinkListPanel.vue'
import TaskEditorPanel from './TaskEditorPanel.vue'
import LinkEditorPanel from './LinkEditorPanel.vue'
import ExecutionLogPanel from './ExecutionLogPanel.vue'
import WorkflowPreviewPanel from './WorkflowPreviewPanel.vue'
</script>
