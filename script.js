const addButton = document.getElementById('add');
const taskList = document.getElementById('task-list');

addButton.addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        taskList.appendChild(listItem);
        listItem.innerHTML = `<input type="checkbox" class="task-checkbox">${taskText}<button class="delete">Delete</button>`;
        taskInput.value = '';
    }
});

taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const listItem = event.target.parentElement;
        taskList.removeChild(listItem);
    }
});

taskList.addEventListener('change', function(event) {
    if (event.target.classList.contains('task-checkbox')) {
        const listItem = event.target.parentElement;
        if (event.target.checked) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
    }
});
