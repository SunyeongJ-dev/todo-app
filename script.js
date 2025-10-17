const addButton = document.getElementById("add");
const taskContainer = document.getElementById("task-container");
const taskList = document.getElementById("task-list");
const completedTaskList = document.getElementById("completed-task-list");
let tasks = []; // Array to hold tasks

// Initial Render
document.addEventListener("DOMContentLoaded", renderTasks);

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
    tasks.push({ id: Date.now(), text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
});

// Delete, Edit and Save Task
taskContainer.addEventListener("click", function (event) {
  const listItem = event.target.parentElement;
  if (event.target.classList.contains("delete")) {
    const taskId = parseInt(listItem.dataset.id);
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
  } else if (event.target.classList.contains("edit")) {
    editTask(listItem);
  } else if (event.target.classList.contains("save")) {
    saveEditedTask(listItem);
  }
});

// Double Click to Edit Task
taskContainer.addEventListener("dblclick", function (event) {
  const listItem = event.target.parentElement;
  const button = listItem.querySelector("button");
  editTask(listItem);
  if (button.classList.contains("save")) {
    saveEditedTask(listItem);
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
