# Todo List App

## Overview
A simple Todo List app built with vanilla JavaScript that demonstrates DOM manipulation, event delegation, and array-based state management. Users can add, edit, delete, and mark tasks as completed, with data persisted in LocalStorage.

## Key Features
- Add tasks using the input field and button
- Edit tasks: Click "Edit" to enable inline editing, then "Save" to update (disabled for completed tasks)
- Delete tasks with the "Delete" button
- Toggle task completion with a checkbox – applies strikethrough styling
- Dynamic re-rendering keeps the UI synchronized with data
- Task data persists across browser sessions using LocalStorage

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

## How It Works
- Task data is stored in LocalStorage
- The `renderTasks()` function rebuilds the task list when changes occur, using `forEach` and `dataset.id` for element targeting
- Events are delegated to the task list container for improved performance

## Installation & Usage
1. Clone the repository: `git clone https://github.com/SunyeongJ-dev/todo-app`
2. Open `index.html` in your browser
3. Start adding, editing, and managing your tasks

## Licence
MIT
