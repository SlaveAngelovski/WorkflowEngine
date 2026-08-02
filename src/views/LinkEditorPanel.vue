<template>
    <PanelCard title="Create Link">
        <form class="flex flex-col gap-3" @submit.prevent="handleCreateLink">
            <FormField label="Link Name">
                <input v-model="linkName" class="rounded-md border border-slate-300 px-3 py-2" type="text"
                    placeholder="Link 1" required />
            </FormField>
            <FormField label="Source Task">
                <select v-model="sourceTaskId" class="rounded-md border border-slate-300 px-3 py-2" required>
                    <option value="">Select a source task</option>
                    <option v-for="task in runtime.workflow.value.tasks" :key="task.id" :value="task.id">{{ task.name }}
                    </option>
                </select>
            </FormField>
            <FormField label="Link Type">
                <select v-model="linkType" class="rounded-md border border-slate-300 px-3 py-2" required>
                    <option value="linear">Linear</option>
                    <option value="parallel">Parallel</option>
                    <option value="conditional">Conditional</option>
                </select>
            </FormField>
            <FormField label="Target Tasks">
                <select v-model="targetTaskIds" class="rounded-md border border-slate-300 px-3 py-2" multiple required>
                    <option v-for="task in runtime.workflow.value.tasks" :key="task.id" :value="task.id">{{ task.name }}
                    </option>
                </select>
            </FormField>
            <FormField label="Trigger State">
                <select v-model="triggerState" class="rounded-md border border-slate-300 px-3 py-2" required>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </FormField>
            <FormField label="Target State">
                <select v-model="targetState" class="rounded-md border border-slate-300 px-3 py-2" required>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </FormField>
            <div class="mt-4 border-t border-slate-200 pt-3">
                <h3 class="text-sm font-semibold text-slate-700">Condition</h3>
                <FormField label="Condition Type">
                    <select v-model="conditionType" class="rounded-md border border-slate-300 px-3 py-2"
                        :required="linkType === 'conditional'" :disabled="linkType !== 'conditional'">
                        <option value="all-completed">All Completed</option>
                        <option value="state-equals">State Equals</option>
                    </select>
                </FormField>
                <FormField label="Task IDs">
                    <select v-model="conditionTaskIds" class="rounded-md border border-slate-300 px-3 py-2" multiple
                        :required="linkType === 'conditional'" :disabled="linkType !== 'conditional'">
                        <option v-for="task in runtime.workflow.value.tasks" :key="task.id" :value="task.id">{{
                            task.name }}
                        </option>
                    </select>
                </FormField>
                <FormField label="Expected State">
                    <select v-model="expectedState" class="rounded-md border border-slate-300 px-3 py-2"
                        :required="linkType === 'conditional'" :disabled="linkType !== 'conditional'">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </FormField>
            </div>
            <div class="mt-4">
                <BaseButton type="submit">Create Link</BaseButton>
            </div>
        </form>
    </PanelCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PanelCard from '../components/PanelCard.vue'
import FormField from '../components/FormField.vue'
import BaseButton from '../components/BaseButton.vue'
import { workflowRuntime } from '../engine/workflowRuntime'
import type { LinkType, State } from '../types/workflow'

const runtime = workflowRuntime
const linkName = ref('')
const sourceTaskId = ref('')
const linkType = ref<LinkType>('parallel')
const targetTaskIds = ref<string[]>([])
const triggerState = ref<State>('completed')
const targetState = ref<State>('in-progress')
const conditionType = ref<'all-completed' | 'state-equals'>('all-completed')
const conditionTaskIds = ref<string[]>([])
const expectedState = ref<State>('completed')

function handleCreateLink() {
    runtime.addLink({
        name: linkName.value.trim(),
        sourceTaskId: sourceTaskId.value,
        linkType: linkType.value,
        targetTaskIds: targetTaskIds.value,
        triggerState: triggerState.value,
        targetState: targetState.value,
        condition: conditionType.value
            ? {
                type: conditionType.value,
                taskIds: conditionTaskIds.value,
                expectedState: expectedState.value,
            }
            : undefined,
    })

    linkName.value = ''
    sourceTaskId.value = ''
    linkType.value = 'parallel'
    targetTaskIds.value = []
    triggerState.value = 'completed'
    targetState.value = 'in-progress'
    conditionType.value = 'all-completed'
    conditionTaskIds.value = []
    expectedState.value = 'completed'
}
</script>
