import { describe, expect, it } from 'vitest'
import { sampleWorkflow } from '../data/sampleWorkflow'
import { evaluateCondition, getTaskById, removeTask, setTaskState, validateWorkflow } from './workflowEngine'

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
    expect(profile?.state).toBe('in-progress')
    expect(updated.events.length).toBeGreaterThan(0)
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

  it('removes a task and its dependent links', () => {
    const updated = removeTask(sampleWorkflow, 'task-signup')

    expect(updated.tasks.some((task) => task.id === 'task-signup')).toBe(false)
    expect(updated.links.every((link) => link.sourceTaskId !== 'task-signup')).toBe(true)
  })
})
