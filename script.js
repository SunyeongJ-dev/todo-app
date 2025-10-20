const addButton = document.getElementById("add");
const taskContainer = document.getElementById("task-container");
const taskList = document.getElementById("task-list");
const completedTaskList = document.getElementById("completed-task-list");
const clearTodoButton = document.getElementById("clear-todos");
const clearCompletedButton = document.getElementById("clear-completed");
let tasks = []; // Array to hold tasks

// Initial Render
document.addEventListener("DOMContentLoaded", renderTasks);

function isMobileView() {
  return window.matchMedia("(max-width: 767px)").matches;
}

/* Functions */
// Render Tasks
function renderTasks() {
  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";
  loadTasks();
  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.dataset.id = task.id;
    listItem.innerHTML = `<input type="checkbox" id="task-${
      task.id
    }" class="task-checkbox" ${task.completed ? "checked" : ""} /><p class="${
      task.completed ? "completed" : ""
    }">${task.text}</p>${
      task.completed
        ? '<span style="visibility: hidden;"></span>'
        : '<button class="edit">Edit</button>'
    } <button class="delete">Delete</button>`;
    if (task.completed) {
      completedTaskList.appendChild(listItem);
    } else {
      taskList.appendChild(listItem);
    }
  });
}

// Save Task to Local Storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

// Check if Task List is Empty
function isTodoListEmpty() {
  return tasks.filter((task) => !task.completed).length === 0;
}
function isCompletedListEmpty() {
  return tasks.filter((task) => task.completed).length === 0;
}

// Clear All To-Do Tasks
function clearTodoTasks() {
  tasks = tasks.filter((task) => task.completed);
  saveTasks();
  renderTasks();
}

// Clear All Completed Tasks
function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}

// Confirm and Clear Tasks
function confirmAndClear(type) {
  let emptyCheck, confirmText, clearFunction;
  if (type === "todo") {
    emptyCheck = isTodoListEmpty();
    confirmText = "Clear all to-do tasks?";
    clearFunction = clearTodoTasks;
  } else if (type === "completed") {
    emptyCheck = isCompletedListEmpty();
    confirmText = "Clear all completed tasks?";
    clearFunction = clearCompletedTasks;
  }
  if (emptyCheck) return;
  if (!confirm(confirmText)) return;
  clearFunction();
}

// Edit Task
function editTask(listItem) {
  const task = listItem.querySelector("p");
  const button = listItem.querySelector("button");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = task.textContent;
  listItem.replaceChild(editInput, task);
  button.textContent = "Save";
  button.classList.remove("edit");
  button.classList.add("save");
  editInput.focus();

  editInput.addEventListener("blur", () => {
    saveEditedTask(listItem);
  });
  editInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveEditedTask(listItem);
    }
  });
}

// Save Edited Task
function saveEditedTask(listItem) {
  const taskText = listItem.querySelector("input[type='text']").value.trim();
  if (taskText !== "") {
    const taskId = parseInt(listItem.dataset.id);
    const task = tasks.find((t) => t.id === taskId);
    task.text = taskText;
    saveTasks();
    renderTasks();
  } else {
    renderTasks();
  }
}

/* Event Handlers */
// Add Task
addButton.addEventListener("click", function () {
  const taskInput = document.getElementById("new-task"); // Get input field
  const taskText = taskInput.value.trim(); // Get and trim input value
  if (taskText !== "") {
    const newTask = { id: Date.now(), text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = "";

    const listItem = document.createElement("li");
    listItem.className = "task-item fade-in";
    listItem.dataset.id = newTask.id;
    listItem.innerHTML = `<input type="checkbox" id="task-${newTask.id}" class="task-checkbox" /><p>${newTask.text}</p><button class="edit">Edit</button> <button class="delete">Delete</button>`;
    taskList.appendChild(listItem);
  }
});

// Delete, Edit and Save Task
taskContainer.addEventListener("click", function (event) {
  const listItem = event.target.parentElement;
  if (event.target.classList.contains("delete")) {
    const taskId = parseInt(listItem.dataset.id);
    listItem.classList.add("fade-out");
    setTimeout(() => {
      tasks = tasks.filter((task) => task.id !== taskId);
      saveTasks();
      renderTasks();
    }, 290);
  } else if (event.target.classList.contains("edit")) {
    editTask(listItem);
  } else if (event.target.classList.contains("save")) {
    saveEditedTask(listItem);
  }
});

// Double Click to Edit Task
taskContainer.addEventListener("dblclick", function (event) {
  if (
    event.target.tagName === "P" &&
    !event.target.classList.contains("completed")
  ) {
    const listItem = event.target.parentElement;
    editTask(listItem);
  }
});

// Mark Task as Completed
taskContainer.addEventListener("change", function (event) {
  if (event.target.classList.contains("task-checkbox")) {
    const listItem = event.target.parentElement;
    const taskId = parseInt(listItem.dataset.id);
    const isChecked = event.target.checked;
    tasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = isChecked;
      }
      return task;
    });
    saveTasks();
    renderTasks();
  }
});

// Clear All To-Do and Completed Tasks
clearTodoButton.addEventListener("click", () => {
  if (isMobileView()) {
    if (isTodoListEmpty() && isCompletedListEmpty()) return;
    if (!confirm("Clear all tasks?")) return;
    tasks = [];
    saveTasks();
    renderTasks();
  } else {
    confirmAndClear("todo");
  }
});

clearCompletedButton.addEventListener("click", () => {
  if (isMobileView()) return;
  confirmAndClear("completed");
});
