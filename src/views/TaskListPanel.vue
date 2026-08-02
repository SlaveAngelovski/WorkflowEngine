<template>
    <PanelCard title="Tasks">
        <ul class="flex flex-col gap-3">
            <li v-for="task in runtime.workflow.value.tasks" :key="task.id"
                class="flex items-center justify-between gap-3">
                <span>{{ task.name }}</span>
                <select class="rounded-md border border-slate-300 px-2 py-1 text-sm" :value="task.state"
                    @change="(event) => runtime.updateTaskState(task.id, (event.target as HTMLSelectElement).value as State)">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <BaseButton @click="runtime.deleteTask(task.id)">Remove</BaseButton>
            </li>
        </ul>
    </PanelCard>
</template>

<script setup lang="ts">
import PanelCard from '../components/PanelCard.vue'
import BaseButton from '../components/BaseButton.vue'
import { workflowRuntime } from '../engine/workflowRuntime'
import type { State } from '../types/workflow'

const runtime = workflowRuntime
</script>
