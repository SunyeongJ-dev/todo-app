const addButton = document.getElementById("add");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", function () {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    taskList.appendChild(listItem);
    listItem.innerHTML = `<input type="checkbox" class="task-checkbox" />${taskText}<button class="edit">Edit</button>
          <button class="delete">Delete</button>`;
    taskInput.value = "";
  }
});

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const listItem = event.target.parentElement;
    taskList.removeChild(listItem);
  } else if (event.target.classList.contains("edit")) {
    const listItem = event.target.parentElement;
    listItem.innerHTML = `<input type="checkbox" class="task-checkbox" /><input type="text" id="new-task" placeholder="Edit task..." /><button class="save">Save</button>
        <button class="delete">Delete</button>`;
  } else if (event.target.classList.contains("save")) {
    const listItem = event.target.parentElement;
    const taskText = listItem.querySelector("input[type='text']").value.trim();
    if (taskText !== "") {
      listItem.innerHTML = `<input type="checkbox" class="task-checkbox" />${taskText}<button class="edit">Edit</button>
          <button class="delete">Delete</button>`;
    }
  }
});

taskList.addEventListener("change", function (event) {
  if (event.target.classList.contains("task-checkbox")) {
    const listItem = event.target.parentElement;
    if (event.target.checked) {
      listItem.classList.add("completed");
    } else {
      listItem.classList.remove("completed");
    }
  }
});
