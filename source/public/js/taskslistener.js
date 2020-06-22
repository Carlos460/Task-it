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
        const targetClipboardTitle = targetTask.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].innerHTML;
        const targetTaskText = targetTask.parentElement.childNodes[1].innerHTML;
        removeTaskFromClipboard({
            title: targetClipboardTitle,
            taskText: targetTaskText
        });
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
        if (targetTaskInput.value !== '') {
            addTaskToClipboard(taskData, targetTasksContainer);
        }
        targetTaskInput.value = '';
    }
    if (e.target.classList.contains('delete-clipboard-button')) {
        const targetClipboardTitle = targetTask.parentElement.childNodes[1].innerHTML;
        const clipboardData = {
            title: targetClipboardTitle
        }
        removeClipboard(clipboardData);
        targetTask.parentElement.parentElement.remove();
    }
});