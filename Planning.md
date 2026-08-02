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