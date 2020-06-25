const createButton = document.querySelector('#create-button');
const workspace = document.querySelector('.workspace');
const titleElement = document.querySelector('.form-group');
const titleInput = document.querySelector('#title-input');
const flaskbutton = document.querySelector('.flask-button');

// task template
function taskElement(task) {
    let taskHTML = `
    <div class="task" unselectable="on">
        <div class="task-text">${task}</div>
        <button class="delete delete-task-button">remove</button>  
    </div>`;
    return taskHTML;
};

// clipboard element Template
function clipboardElement(data) {
    const clipboardHTML = `
    <div class="clipboard-container">
        <div class="clipboard-title">
            <h1>${data}</h1>
            <button class="delete-clipboard-button" >X</button>
        </div>
        <div class="tasks-container"></div>
            <div class="task-input-container">
                <button class="button-primary add-task">Add</button>
                <input class="task-input-class" type="text" id="task-input">
            </div>
    </div>`;
    return clipboardHTML;
};
// loads single tasks created by client
function loadTask(taskText, tasksContainer) {
    const taskFrag = document
        .createRange()
        .createContextualFragment(taskElement(taskText));
    tasksContainer.appendChild(taskFrag);
}

// loads each task in the tasks array
function loadTasks(tasks, containerList, targetContainerTitle) {
    containerList.forEach(childContainer => {
        if (childContainer.tagName === 'DIV' && childContainer.childNodes[1].childNodes[1].innerHTML === targetContainerTitle) {
            tasks.forEach(task => {
                const tasksContainer = childContainer.childNodes[3];
                const taskFrag = document
                    .createRange()
                    .createContextualFragment(taskElement(task));
                tasksContainer.appendChild(taskFrag);
            });
        }
    });
}
// Loadclipboard function
function loadClipboard(data) {
    const clipboardFrag = document
        .createRange()
        .createContextualFragment(clipboardElement(data));
    // Apend clipboard to workspace in the DOM
    workspace.appendChild(clipboardFrag);
}

// requests to create a clipboard
async function createClipboard(inputData) {
    const response = await fetch('/api/clipboard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData)
    });
    const data = await response.json();
    loadClipboard(data.title);
}

async function loadAllClipboards() {
    const response = await fetch('/api/clipboard', {
        method: 'GET'
    });
    const data = await response.json();
    data.forEach(clipboard => {
        loadClipboard(clipboard.title);
    });
    const workspaceChildNodes = workspace.childNodes;
    data.forEach(clipboard => {
        loadTasks(clipboard.tasks, workspaceChildNodes, clipboard.title);
    });
}

async function addTaskToClipboard(inputData, tasksContainer) {
    const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const data = await response.json();
    loadTask(data, tasksContainer);
}
async function removeTaskFromClipboard(inputData) {
    const response = await fetch('/api/task', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const data = await response.json();
}
async function removeClipboard(bodyData) {
    const response = await fetch('/api/clipboard', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    });
    const data = await response.json();
    console.log(data);
}

createButton.addEventListener('click', () => {
    titleElement.classList.remove('hidden');
    titleInput.focus();
});
window.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !titleElement.classList.contains('hidden')) {
        const title = {
            title: titleInput.value
        };
        createClipboard(title);
        titleElement.classList.add('hidden');
        titleInput.value = "";
    } else if (e.key === 'Escape') {
        console.log("esc pressed");
    }
});

window.addEventListener('load', (e) => {
    loadAllClipboards()
});

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