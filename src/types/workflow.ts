export type State = 'pending' | 'in-progress' | 'completed';

export type LinkType = 'linear' | 'parallel' | 'conditional';

export type Task = {
    id: string;
    name: string;
    state: State;
    outgoingLinkIds: string[];
}

export type Condition = {
    type: 'all-completed' | 'state-equals';
    taskIds?: string[];
    expectedState?: State;
}

export type Link = {
    id: string;
    name: string;
    sourceTaskId: string;
    linkType: 'linear' | 'parallel' | 'conditional';
    // “When this source task reaches this state,
    // and optionally this condition is satisfied,
    // then update these target tasks to this state.”
    targetTaskIds: string[];
    triggerState: State;
    targetState: State;
    condition?: {
        type: 'all-completed' | 'state-equals';
        taskIds?: string[];
        expectedState?: State;
    };
}

export type Workflow = {
    id: string;
    name: string;
    state: State;
    tasks: Task[];
    links: Link[];
}

export type WorkflowExecutionEvent = {
    id: string;
    type: 'task-state-changed' | 'workflow-state-changed' | 'link-triggered';
    message: string;
    timestamp: string;
}
