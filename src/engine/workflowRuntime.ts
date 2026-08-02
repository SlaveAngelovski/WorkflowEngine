import { ref } from 'vue'
import { sampleWorkflow } from '../data/sampleWorkflow'
import { createLink, createTask, getTaskById, removeLink, removeTask, recordEvent, setTaskState } from './workflowEngine'
import type { Link, State, Workflow, WorkflowExecutionEvent } from '../types/workflow'

export function createWorkflowRuntime(initialWorkflow: Workflow = sampleWorkflow) {
  const workflow = ref<Workflow>({ ...initialWorkflow })
  const events = ref<WorkflowExecutionEvent[]>([])

  function updateTaskState(taskId: string, newState: State) {
    const result = setTaskState(workflow.value, taskId, newState)
    workflow.value = result.workflow
    events.value = [...events.value, ...result.events]
  }

  function getCurrentTask(taskId: string) {
    return getTaskById(workflow.value, taskId)
  }

  function deleteTask(taskId: string) {
    const nextWorkflow = removeTask(workflow.value, taskId)
    const task = getTaskById(workflow.value, taskId)
    workflow.value = nextWorkflow
    if (task) {
      events.value = [...events.value, recordEvent(nextWorkflow, `Removed task ${task.name}`, 'workflow-state-changed')]
    }
  }

  function addTask(name: string, state: State) {
    const nextWorkflow = createTask(workflow.value, { name, state })
    workflow.value = nextWorkflow
  }

  function addLink(input: Omit<Link, 'id'>) {
    const nextWorkflow = createLink(workflow.value, input)
    workflow.value = nextWorkflow
    events.value = [...events.value, recordEvent(nextWorkflow, `Added link ${input.name}`, 'workflow-state-changed')]
  }

  function deleteLink(linkId: string) {
    const nextWorkflow = removeLink(workflow.value, linkId)
    const link = workflow.value.links.find((candidate) => candidate.id === linkId)
    workflow.value = nextWorkflow
    if (link) {
      events.value = [...events.value, recordEvent(nextWorkflow, `Removed link ${link.name}`, 'workflow-state-changed')]
    }
  }

  return {
    workflow,
    events,
    updateTaskState,
    getCurrentTask,
    deleteTask,
    addTask,
    addLink,
    deleteLink,
  }
}

export const workflowRuntime = createWorkflowRuntime()
