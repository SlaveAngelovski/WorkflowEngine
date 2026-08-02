<template>
    <section class="flex flex-col gap-4 p-4">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 class="text-2xl font-semibold text-slate-900">Workflow Engine</h1>
                <p class="text-sm text-slate-600">Create workflows, manage tasks, connect links, and observe runtime
                    updates.</p>
            </div>
            <div class="flex gap-2">
                <BaseButton @click="toggleDrawer">{{ isDrawerOpen ? 'Hide Panel' : 'Show Create Panel' }}</BaseButton>
            </div>
        </header>

        <div class="flex flex-col gap-4 xl:flex-row">
            <div class="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
                <WorkflowPreviewPanel class="lg:col-span-2" />
                <TaskListPanel />
                <LinkListPanel />
                <ExecutionLogPanel />
            </div>

            <aside
                class="fixed right-0 top-0 z-20 h-full w-full max-w-[360px] border-l border-slate-300 bg-white p-4 shadow-2xl transition-transform duration-300 xl:relative xl:right-auto xl:h-auto xl:max-w-[360px] xl:rounded-lg xl:border xl:shadow-sm"
                :class="isDrawerOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0 xl:hidden'">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-slate-800">Workflow Actions</h2>
                    <BaseButton @click="toggleDrawer">Close</BaseButton>
                </div>
                <div class="mt-4 flex flex-col gap-3">
                    <CollapsiblePanel title="Create Workflow">
                        <FormField label="Workflow Name">
                            <input class="rounded-md border border-slate-300 px-3 py-2" type="text" />
                        </FormField>
                        <FormField label="State">
                            <select class="rounded-md border border-slate-300 px-3 py-2">
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </FormField>
                        <BaseButton class="mt-3">Create Workflow</BaseButton>
                    </CollapsiblePanel>
                    <CollapsiblePanel title="Add Task">
                        <TaskEditorPanel />
                    </CollapsiblePanel>
                    <CollapsiblePanel title="Create Link">
                        <LinkEditorPanel />
                    </CollapsiblePanel>
                </div>
            </aside>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import CollapsiblePanel from '../components/CollapsiblePanel.vue'
import FormField from '../components/FormField.vue'
import TaskListPanel from './TaskListPanel.vue'
import LinkListPanel from './LinkListPanel.vue'
import TaskEditorPanel from './TaskEditorPanel.vue'
import LinkEditorPanel from './LinkEditorPanel.vue'
import ExecutionLogPanel from './ExecutionLogPanel.vue'
import WorkflowPreviewPanel from './WorkflowPreviewPanel.vue'

const isDrawerOpen = ref(false)

function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
}
</script>
