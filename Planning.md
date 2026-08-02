# WorkflowEngine
Workflow Engine test

Parts:
* Workflow: (a collection of Tasks and their Links), it has properties: state (pending, in progress, completed), Id.
* Tasks: sub components of the workflow, they have properties: state (pending, in progress, completed), Id, Links.
* Links: define the relationship between the Tasks, and how the source Task state changes(linear, parallel, or conditional) depending on the conditions, the Links also have: source Task(sourceTaskId), target Task(targetTaskId), isStartingTask, isEndingTask and conditions.


Link Abstraction
To manage these relationships, implement a dedicated link abstraction that explicitly defines the relationships and their effects. This abstraction should include:

* Source Component: The component (Workflow or Task) that initiates the state change.
* Target Component(s): The component (Workflow or Task) affected by the state change.
* State Transition Rules: The specific rules that define how a state change in the source component affects the target component. For example, "if Task A moves to In Progress, Task B should move to In Progress."


Link Interactions

The system should handle the following scenarios:

* Changing a Workflow state affects only its linked Tasks states.
* Changing a Task state affects other linked Tasks or the linked Workflow state.
* Any state transitions for Workflow and Tasks are valid, but the links should define the valid transitions.
* From any state to any other state.
* Even going back to a previous state.

Challenge Goal

Build a program that can:
* Create a Workflow execution. (a "running" stateful instance of a defined workflow process)
* Create Task executions. ("running" stateful instances of tasks)
* Use Links to control the execution flow of the Workflow.
* Put the pieces together to form a Workflow Engine that can manage the state transitions of the Workflow and Tasks based on the Links.
* Update the state of a Workflow or Task and ensure that the state changes cascade correctly according to the Links.

Model out one flow and demonstrate how the system can manage the state transitions.

Example of a business process to model with your Workflow (But feel free to use some other business process in your example!):

Workflow: Onboarding
Tasks: [
   Sign Up,
   Verify Email,
   Add Profile
]
States: [
   Pending,
   In Progress,
   Completed
]

Example:
   - A state change in the Workflow or any of it's Tasks can trigger state changes in other Tasks or the Workflow.
      - So either 'Onboarding' or 'Sign Up' moving to 'In Progress' could trigger the other to move to 'In Progress'.
   - State changes can be linear, parallel, or conditional.
      - So 'Sign Up' moving to 'Completed' could trigger 'Verify Email' and 'Add Profile' to move to 'In Progress'.
   - Conditional side effects occur only when specific requirements are met.
      - A conditional could be a merge point where multiple Tasks must reach a specific state before the Workflow can move to the next state.
      - So when 'Verify Email' and 'Add Profile' are both 'Completed', 'Onboarding' moves to 'Completed'.


Code:
* Ensure it is modular and easy to extend.
* Focus on clean architecture and readability.


What I need to make, in non sorted order:
* Functionality to create a workflow.
* Functionality to create Tasks.
* Functionality to create Links.
* Think about how the Links will be impelemented, will they be a child of Tasks or separate entity under Workflow.
* Functionality to find the Task by its Id.
* Functionality to check if the condition is satisfied.
* Functionality to get and set the state of the task.
* Functioanlity to update the task of the workflow.
* Functionality to generate an id. 
* Separate workflow definition from workflow execution instance.
* Define the state machine rules clearly.
* Define how links are stored and owned.
* Define validation rules for links and graph structure.
* Define how conditions are evaluated.
* Define how cascading state changes are triggered and ordered.
* Define how to prevent loops and duplicate transitions.
* Define persistence or storage strategy.
* Define event/history/audit behavior for state changes.
* Define error handling for invalid transitions.

Challenges during the design process:
* How to define the links and at what level to put them.
* How to present the interactivity and state changes.
* How to separate UI concerns from the workflow engine logic.

UI Flow and Components
The user experience

Main UI layout:
* WorkflowPage
    * header with workflow name and current workflow state
    * toolbar with buttons to create workflow, add task, add link, and reset the view
* WorkflowEditorPanel
    * form to create and edit the workflow name and state
* TaskListPanel
    * list of all tasks
    * each task row shows its name, state, and remove button
    * each task row can be selected to edit or change its state
* LinkListPanel
    * list of all links
    * each link row shows source task, link type, target tasks, condition, and remove button
* TaskEditorPanel
    * form to create a task
    * fields: id (generated), name, state dropdown, optional outgoing links reference
* LinkEditorPanel
    * form to create a link
    * fields: id (generated), name, sourceTaskId dropdown, linkType dropdown, targetTaskIds dropdown, triggerState dropdown, targetState dropdown, and an optional condition section
* ExecutionLogPanel
    * shows the runtime history of state changes and link triggers
* WorkflowPreviewPanel
    * displays the current workflow state in a simple readable format, such as a list or card based view
    * can highlight tasks whose state changed recently

User flow:
* Create workflow
    * generate id
    * input for the name
    * input (dropdown) for the state, preselected to pending
    * create the workflow object in the app state
* Add task
    * generate id
    * input for the name
    * input (dropdown) for the state, preselected to pending
    * create the task and add it to the workflow tasks array
    * optionally select outgoing links later through the link editor
* Create link
    * generate id
    * input for the name
    * input (dropdown) for the sourceTaskId
    * input (dropdown) for the linkType
        * linear: one targetTaskId
        * parallel: multiple targetTaskIds
        * conditional: multiple targetTaskIds and an optional condition section
    * input (dropdown) for the targetTaskIds
    * input (dropdown) for the triggerState
    * input (dropdown) for the targetState
    * optional condition section
        * condition type dropdown: all-completed or state-equals
        * taskIds dropdown with multiple selections
        * expectedState dropdown
    * create the link in the workflow links array
    * append the new link id to the source task outgoingLinkIds
    * validate that target task ids exist
* Update task state
    * select a task from the UI
    * change its state from a dropdown
    * trigger the runtime engine to evaluate outgoing links from that task
    * show the resulting target state changes in the preview and log panels
* Remove workflow/task/link
    * provide remove buttons in each list panel
    * remove the item from the relevant array and update related references

Runtime Description
This section describes the engine requirements that will later be implemented as utility functions and core runtime logic.

Core entities:
* Workflow
    * has id, name, state, tasks, links, and execution history
* Task
    * has id, name, state, and outgoingLinkIds
* Link
    * has id, name, sourceTaskId, linkType, targetTaskIds, triggerState, targetState, and optional condition
* Condition
    * can evaluate whether a set of tasks has reached the required state

Runtime responsibilities:
* Create a workflow instance from the provided data
* Create tasks and add them to the workflow
* Create links and connect them to the correct source and target tasks
* Find a task by id
* Get and set task state
* Get and set workflow state
* Validate that the workflow structure is consistent
    * source task exists
    * target tasks exist
    * conditional links contain a condition
    * linear links contain a single target
* Evaluate outgoing links for a changed task
* Check if the task’s new state matches the link triggerState
* Check whether the optional condition is satisfied
* Apply target state updates to the relevant tasks
* Record a runtime event for each state change and link trigger
* Prevent loops and duplicate transitions during propagation
* Support state changes that can move forward or backward between states

Runtime execution flow:
* When a task state changes, find the task by id
* Read the task’s outgoingLinkIds
* Resolve the corresponding links from the workflow links array
* For each link, evaluate whether it should fire
    * source task state must match triggerState
    * optional condition must be satisfied
* If the link fires, update each target task to targetState
* Record the change in the execution history
* Continue propagation if additional links are triggered by the new target states

Utility functions to generate later:
* generateId()
* getTaskById(workflow, taskId)
* getOutgoingLinks(workflow, sourceTaskId)
* evaluateCondition(workflow, condition)
* setTaskState(workflow, taskId, newState)
* applyLinkTransition(workflow, link)
* validateWorkflow(workflow)
* recordEvent(workflow, message, type)


