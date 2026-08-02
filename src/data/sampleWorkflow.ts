import type { Workflow } from '../types/workflow'

export const sampleWorkflow: Workflow = {
  id: 'wf-onboarding',
  name: 'Onboarding',
  state: 'pending',
  tasks: [
    {
      id: 'task-signup',
      name: 'Sign Up',
      state: 'pending',
      outgoingLinkIds: ['link-signup-parallel'],
    },
    {
      id: 'task-verify',
      name: 'Verify Email',
      state: 'pending',
      outgoingLinkIds: [],
    },
    {
      id: 'task-profile',
      name: 'Add Profile',
      state: 'pending',
      outgoingLinkIds: [],
    },
  ],
  links: [
    {
      id: 'link-signup-parallel',
      name: 'Sign Up completes',
      sourceTaskId: 'task-signup',
      linkType: 'parallel',
      targetTaskIds: ['task-verify', 'task-profile'],
      triggerState: 'completed',
      targetState: 'in-progress',
    },
  ],
}
