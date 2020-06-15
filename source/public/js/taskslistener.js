workspace.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-text')) {
        const targetTask = e.target;
        let hasDoneClass = targetTask.classList.contains('done');
        console.log(hasDoneClass);
        if (hasDoneClass) {
            targetTask.classList.remove('done');
        } else if (!hasDoneClass) {
            targetTask.classList.add('done');
        }

    }
});