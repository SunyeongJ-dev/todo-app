# Todo List App

## Overview
A simple Todo List app built with vanilla JavaScript, demonstrating DOM manipulation, event delegation, and array-based state management. Users can add, edit, delete, and mark tasks as completed. Planned: LocalStorage for persistence.

## Key Features
- Add tasks via input and button.
- Edit tasks: Click "Edit" to inline input, "Save" to update (hides on completed tasks).
- Delete tasks with "Delete" button.
- Toggle completion with checkbox – adds strikethrough styling.
- Dynamic re-rendering keeps UI in sync with data.

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

## How It Works
- Tasks stored in let tasks = [] array of objects { id: number, text: string, completed: boolean }. renderTasks() rebuilds the list on changes using forEach and dataset.id for targeting. Events delegated to taskList for efficiency.

## Installation & Usage
1. Clone: git clone [https://github.com/SunyeongJ-dev/todo-app].
2. Open index.html in a browser.
3. Add/edit/delete tasks as needed.

## License
MIT
