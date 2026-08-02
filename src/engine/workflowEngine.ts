import type { Condition, Link, State, Task, Workflow, WorkflowExecutionEvent } from '../types/workflow'

export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

export function getTaskById(workflow: Workflow, taskId: string) {
  return workflow.tasks.find((task) => task.id === taskId)
}

export function getOutgoingLinks(workflow: Workflow, sourceTaskId: string) {
  return workflow.links.filter((link) => link.sourceTaskId === sourceTaskId)
}

export function evaluateCondition(workflow: Workflow, condition?: Condition) {
  if (!condition) {
    return true
  }

  if (condition.type === 'all-completed') {
    return (condition.taskIds ?? []).every((taskId) => {
      const task = getTaskById(workflow, taskId)
      return task?.state === 'completed'
    })
  }

  if (condition.type === 'state-equals') {
    return (condition.taskIds ?? []).every((taskId) => {
      const task = getTaskById(workflow, taskId)
      return task?.state === condition.expectedState
    })
  }

  return false
}

export function validateWorkflow(workflow: Workflow) {
  const issues: Array<{ message: string }> = []

  workflow.tasks.forEach((task) => {
    if (!task.name.trim()) {
      issues.push({ message: `Task ${task.id} must have a name` })
    }
  })

  workflow.links.forEach((link) => {
    if (!getTaskById(workflow, link.sourceTaskId)) {
      issues.push({ message: `Link ${link.id} references unknown source task ${link.sourceTaskId}` })
    }

    link.targetTaskIds.forEach((targetTaskId) => {
      if (!getTaskById(workflow, targetTaskId)) {
        issues.push({ message: `Link ${link.id} references unknown target task ${targetTaskId}` })
      }
    })

    if (link.linkType === 'linear' && link.targetTaskIds.length !== 1) {
      issues.push({ message: `Link ${link.id} must have exactly one target task for linear transitions` })
    }

    if (link.linkType === 'conditional' && !link.condition) {
      issues.push({ message: `Link ${link.id} must include a condition for conditional transitions` })
    }
  })

  return issues
}

export function removeTask(workflow: Workflow, taskId: string) {
  const remainingTasks = workflow.tasks.filter((task) => task.id !== taskId)
  const remainingLinks = workflow.links.filter((link) => link.sourceTaskId !== taskId)

  return {
    ...workflow,
    tasks: remainingTasks,
    links: remainingLinks,
  }
}

export function removeLink(workflow: Workflow, linkId: string) {
  const remainingLinks = workflow.links.filter((link) => link.id !== linkId)
  const nextTasks = workflow.tasks.map((task) => ({
    ...task,
    outgoingLinkIds: task.outgoingLinkIds.filter((id) => id !== linkId),
  }))

  return {
    ...workflow,
    links: remainingLinks,
    tasks: nextTasks,
  }
}

export function createTask(workflow: Workflow, input: Omit<Task, 'id' | 'outgoingLinkIds'>) {
  const task: Task = {
    id: generateId('task'),
    name: input.name,
    state: input.state,
    outgoingLinkIds: [],
  }

  return {
    ...workflow,
    tasks: [...workflow.tasks, task],
  }
}

export function createLink(workflow: Workflow, input: Omit<Link, 'id'>) {
  const link: Link = {
    id: generateId('link'),
    ...input,
  }

  const updatedTask = workflow.tasks.find((task) => task.id === input.sourceTaskId)
  if (updatedTask) {
    return {
      ...workflow,
      links: [...workflow.links, link],
      tasks: workflow.tasks.map((task) =>
        task.id === input.sourceTaskId
          ? { ...task, outgoingLinkIds: [...task.outgoingLinkIds, link.id] }
          : task,
      ),
    }
  }

  return {
    ...workflow,
    links: [...workflow.links, link],
  }
}

export function recordEvent(workflow: Workflow, message: string, type: WorkflowExecutionEvent['type']) {
  const event: WorkflowExecutionEvent = {
    id: generateId('event'),
    type,
    message,
    timestamp: new Date().toISOString(),
  }

  return event
}

export function syncWorkflowState(workflow: Workflow): Workflow {
  const allCompleted = workflow.tasks.length > 0 && workflow.tasks.every((task) => task.state === 'completed')

  return {
    ...workflow,
    state: allCompleted ? 'completed' : 'pending',
  }
}

function propagateRollback(workflow: Workflow, taskId: string, visited = new Set<string>()): Workflow {
  if (visited.has(taskId)) {
    return workflow
  }

  visited.add(taskId)

  let nextWorkflow: Workflow = workflow
  const outgoingLinks = getOutgoingLinks(nextWorkflow, taskId)

  outgoingLinks.forEach((link) => {
    const updatedTasks: Task[] = nextWorkflow.tasks.map((task) => {
      if (!link.targetTaskIds.includes(task.id)) {
        return task
      }

      if (task.state === 'pending') {
        return task
      }

      return { ...task, state: 'pending' as State }
    })

    nextWorkflow = {
      ...nextWorkflow,
      tasks: updatedTasks,
    }

    link.targetTaskIds.forEach((targetTaskId) => {
      nextWorkflow = propagateRollback(nextWorkflow, targetTaskId, visited)
    })
  })

  return nextWorkflow
}

export function applyLinkTransition(workflow: Workflow, link: Link, sourceState: State): Workflow {
  const nextTasks: Task[] = workflow.tasks.map((task) => {
    if (!link.targetTaskIds.includes(task.id)) {
      return task
    }

    if (sourceState === link.triggerState) {
      return { ...task, state: link.targetState }
    }

    if (sourceState === 'pending' && task.state === link.targetState) {
      return { ...task, state: 'pending' }
    }

    return task
  })

  return {
    ...workflow,
    tasks: nextTasks,
  }
}

export function setTaskState(workflow: Workflow, taskId: string, newState: State) {
  const task = getTaskById(workflow, taskId)

  if (!task) {
    return {
      workflow,
      events: [] as WorkflowExecutionEvent[],
    }
  }

  const updatedTask = { ...task, state: newState }
  const updatedTasks = workflow.tasks.map((candidate) => (candidate.id === taskId ? updatedTask : candidate))

  let updatedWorkflow: Workflow = {
    ...workflow,
    tasks: updatedTasks,
  }

  const events: WorkflowExecutionEvent[] = []
  const outgoingLinks = getOutgoingLinks(updatedWorkflow, taskId)

  outgoingLinks.forEach((link) => {
    const shouldFireForward = link.triggerState === newState && evaluateCondition(updatedWorkflow, link.condition)
    const shouldRollback = newState === 'pending'

    if (!shouldFireForward && !shouldRollback) {
      return
    }

    const transitionedWorkflow = applyLinkTransition(updatedWorkflow, link, newState)
    const event = recordEvent(transitionedWorkflow, `${task.name} triggered ${link.name}`, 'link-triggered')
    events.push(event)

    updatedWorkflow.tasks = transitionedWorkflow.tasks
  })

  if (newState === 'pending') {
    updatedWorkflow = propagateRollback(updatedWorkflow, taskId)
  }

  const stateEvent = recordEvent(updatedWorkflow, `${task.name} changed to ${newState}`, 'task-state-changed')
  events.unshift(stateEvent)

  const synchronizedWorkflow = syncWorkflowState(updatedWorkflow)

  return {
    workflow: synchronizedWorkflow,
    events,
  }
}
