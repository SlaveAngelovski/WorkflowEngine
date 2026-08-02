import { describe, expect, it } from 'vitest'
import { sampleWorkflow } from '../data/sampleWorkflow'
import { createWorkflowRuntime } from '../engine/workflowRuntime'
import {
  applyLinkTransition,
  createLink,
  createTask,
  evaluateCondition,
  getTaskById,
  removeLink,
  removeTask,
  setTaskState,
  syncWorkflowState,
  validateWorkflow,
} from './workflowEngine'

describe('workflow engine utilities', () => {
  it('finds a task by id', () => {
    const task = getTaskById(sampleWorkflow, 'task-signup')

    expect(task?.name).toBe('Sign Up')
  })

  it('evaluates completed conditions correctly', () => {
    const workflow = {
      ...sampleWorkflow,
      tasks: sampleWorkflow.tasks.map((task) =>
        task.id === 'task-verify'
          ? { ...task, state: 'completed' as const }
          : task.id === 'task-profile'
            ? { ...task, state: 'completed' as const }
            : task,
      ),
    }

    const condition = {
      type: 'all-completed' as const,
      taskIds: ['task-verify', 'task-profile'],
    }

    expect(evaluateCondition(workflow, condition)).toBe(true)
  })

  it('updates a task state and propagates it to linked targets', () => {
    const updated = setTaskState(sampleWorkflow, 'task-signup', 'completed')

    const verify = getTaskById(updated.workflow, 'task-verify')
    const profile = getTaskById(updated.workflow, 'task-profile')

    expect(verify?.state).toBe('in-progress')
    expect(profile?.state).toBe('pending')
    expect(updated.events.length).toBeGreaterThan(0)
  })

  it('applies a link transition directly to linked tasks', () => {
    const updated = applyLinkTransition(sampleWorkflow, sampleWorkflow.links[0], 'completed')
    expect(getTaskById(updated, 'task-verify')?.state).toBe('in-progress')
  })

  it('marks the workflow as completed only when every task is completed', () => {
    const completedWorkflow = {
      ...sampleWorkflow,
      tasks: sampleWorkflow.tasks.map((task) => ({ ...task, state: 'completed' as const })),
    }

    expect(syncWorkflowState(sampleWorkflow).state).toBe('pending')
    expect(syncWorkflowState(completedWorkflow).state).toBe('completed')
  })

  it('does not trigger a conditional link until its condition is satisfied', () => {
    const workflow = setTaskState(sampleWorkflow, 'task-setup', 'completed').workflow
    const welcome = getTaskById(workflow, 'task-welcome')

    expect(welcome?.state).toBe('pending')
  })

  it('rolls back downstream tasks recursively when a task moves back to pending', () => {
    let workflow = sampleWorkflow

    workflow = setTaskState(workflow, 'task-signup', 'completed').workflow
    workflow = setTaskState(workflow, 'task-verify', 'completed').workflow
    workflow = setTaskState(workflow, 'task-profile', 'completed').workflow
    workflow = setTaskState(workflow, 'task-consent', 'completed').workflow

    expect(getTaskById(workflow, 'task-welcome')?.state).toBe('in-progress')

    workflow = setTaskState(workflow, 'task-profile', 'pending').workflow

    expect(getTaskById(workflow, 'task-consent')?.state).toBe('pending')
    expect(getTaskById(workflow, 'task-setup')?.state).toBe('pending')
    expect(getTaskById(workflow, 'task-welcome')?.state).toBe('pending')
  })

  it('validates workflow references', () => {
    const invalidWorkflow = {
      ...sampleWorkflow,
      links: [
        {
          ...sampleWorkflow.links[0],
          targetTaskIds: ['missing-task'],
        },
      ],
    }

    const issues = validateWorkflow(invalidWorkflow)

    expect(issues).toContainEqual(expect.objectContaining({ message: expect.stringContaining('missing-task') }))
  })

  it('creates tasks and links and removes links cleanly', () => {
    const withTask = createTask(sampleWorkflow, { name: 'Review Docs', state: 'pending' })
    expect(withTask.tasks).toHaveLength(sampleWorkflow.tasks.length + 1)

    const withLink = createLink(sampleWorkflow, {
      name: 'Review docs link',
      sourceTaskId: 'task-signup',
      linkType: 'linear',
      targetTaskIds: ['task-verify'],
      triggerState: 'completed',
      targetState: 'in-progress',
    })

    expect(withLink.links).toHaveLength(sampleWorkflow.links.length + 1)

    const withoutLink = removeLink(sampleWorkflow, 'link-signup-linear')
    expect(withoutLink.links.some((link) => link.id === 'link-signup-linear')).toBe(false)
    expect(withoutLink.tasks.find((task) => task.id === 'task-signup')?.outgoingLinkIds).not.toContain('link-signup-linear')
  })

  it('removes a task and its dependent links', () => {
    const updated = removeTask(sampleWorkflow, 'task-signup')

    expect(updated.tasks.some((task) => task.id === 'task-signup')).toBe(false)
    expect(updated.links.every((link) => link.sourceTaskId !== 'task-signup')).toBe(true)
  })
})

describe('workflow runtime', () => {
  it('updates workflow state and records events when task state changes', () => {
    const runtime = createWorkflowRuntime(sampleWorkflow)

    runtime.updateTaskState('task-signup', 'completed')

    expect(runtime.workflow.value.tasks.find((task) => task.id === 'task-verify')?.state).toBe('in-progress')
    expect(runtime.events.value.length).toBeGreaterThan(0)
  })
})
