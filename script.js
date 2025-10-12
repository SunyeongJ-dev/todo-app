const deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const listItem = this.parentElement;
        listItem.remove();
    });
});