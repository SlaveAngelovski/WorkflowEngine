# WorkflowEngine

A small Vue 3 + TypeScript workflow engine prototype for modeling task-based flows with links, conditions, and runtime state changes.

## How it works

A workflow contains tasks and links. When a task changes state, the engine checks the outgoing links and updates the linked tasks accordingly. The runtime also records events and keeps the workflow state in sync.


The project is structured as:
- Presentation layer: Vue components and panels
- Application layer: workflow runtime wrapper
- Domain layer: workflow engine pure functions
- Data layer: sample workflow and in memory state

The flow is:
- UI calls runtime method
- runtime calls workflow engine
- engine returns new state
- runtime updates the shared in-memory state
- Vue components rerender

## Assumptions

- Workflows are modeled as simple directed graphs of tasks and transitions.
- States are limited to pending, in-progress, and completed.
- Links can be linear, parallel, or conditional.
- The UI is a demo/prototype.

## How to run

1. Install dependencies:
   - npm install
2. Start the app:
   - npm run dev
3. Open the local Vite URL shown in the terminal.

## How AI was used

I used AI as a coding partner during the project to help me build the prototype faster due to the time constraint and turn my planning notes into something working. In practice, it helped me implement the idea, while I guided the direction with my own feedback and preferences.

My main points of guidance were:
- preferring a Vue 3 + TypeScript structure without Pinia, because I wanted to keep the project simple and to better visualize how the workflow engine works,
- keeping the UI simple and focused on the workflow experience instead of making it too complicated,
- building a custom runtime model instead of using a ready-made state library,
- making the links and their states visible so the reviewer could clearly see how the workflow logic works,
- adjusting the workflow behavior based on the planning document and the goal of making the engine feel like a real prototype, not just a static example.


