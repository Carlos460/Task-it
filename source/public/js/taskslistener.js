workspace.addEventListener('click', (e) => {
    const targetTask = e.target;
    let hasDoneClass = targetTask.classList.contains('done');
    if (e.target.classList.contains('task-text')) {
        if (hasDoneClass) {
            targetTask.classList.remove('done');
        } else if (!hasDoneClass) {
            targetTask.classList.add('done');
        }
    }
    if (e.target.classList.contains('delete')) {
        targetTask.parentElement.remove();
    }
    if (e.target.classList.contains('add-task')) {
        const targetTasksContainer = targetTask.parentElement.parentElement.childNodes[3];
        const targetClipboardTitle = targetTask.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML;
        const targetTaskInput = targetTask.parentElement.childNodes[3];
        const taskData = {
            clipboardTitle: targetClipboardTitle,
            taskText: targetTaskInput.value
        };
        console.log(taskData);
        if (targetTaskInput.value !== '') {
            addTaskToClipboard(taskData, targetTasksContainer);
        }
        targetTaskInput.value = '';
    }
});