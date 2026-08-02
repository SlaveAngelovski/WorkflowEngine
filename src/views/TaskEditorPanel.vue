<template>
    <PanelCard title="Add Task">
        <form class="flex flex-col gap-3" @submit.prevent="handleCreateTask">
            <FormField label="Task Name">
                <input v-model="taskName" class="rounded-md border border-slate-300 px-3 py-2" type="text"
                    placeholder="New Task" required />
            </FormField>
            <FormField label="State">
                <select v-model="taskState" class="rounded-md border border-slate-300 px-3 py-2" required>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </FormField>
            <BaseButton type="submit">Create Task</BaseButton>
        </form>
    </PanelCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PanelCard from '../components/PanelCard.vue'
import FormField from '../components/FormField.vue'
import BaseButton from '../components/BaseButton.vue'
import { workflowRuntime } from '../engine/workflowRuntime'
import type { State } from '../types/workflow'

const runtime = workflowRuntime
const taskName = ref('')
const taskState = ref<State>('pending')

function handleCreateTask() {
    runtime.addTask(taskName.value.trim(), taskState.value)
    taskName.value = ''
    taskState.value = 'pending'
}
</script>
