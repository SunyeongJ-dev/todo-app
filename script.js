const addButton = document.getElementById('add');
const deleteButtons = document.querySelectorAll('.delete');

addButton.addEventListener('click', function() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        taskList.appendChild(listItem);
        listItem.innerHTML = `<input type="checkbox">${taskText}<button class="delete">Delete</button>`;
        taskInput.value = '';
    }
});

deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const listItem = this.parentElement;
        listItem.remove();
    });
});