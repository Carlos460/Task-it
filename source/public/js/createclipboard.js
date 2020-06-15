const createButton = document.querySelector('#create-button');
const workspace = document.querySelector('.workspace');
const titleElement = document.querySelector('.form-group');
const titleInput = document.querySelector('#title-input');

// task template
function taskElement(task) {
    let taskHTML = `
    <div class="task" unselectable="on">
        <div class="task-text">${task}</div>
        <div id="delete-task-button">X</div>  
    </div>`;
    return taskHTML;
};

// clipboard element Template
function clipboardElement(data) {
    const clipboardHTML = `
    <div class="clipboard-container">
            <div class="clipboard-title">
                <h1>${data}</h1>
            </div>
        <div class="tasks-container"></div>
        <div class="task-input-container">
            <button class="button-primary">Add</button>
            <input type="text" id="task-input">
        </div>
    </div>
    `;
    return clipboardHTML;
};
// loads each task in the tasks array
function loadTasks(tasks) {
    const tasksContainer = document.querySelector('.tasks-container');
    tasks.forEach(task => {
        const taskFrag = document
            .createRange()
            .createContextualFragment(taskElement(task));
        tasksContainer.appendChild(taskFrag);
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
    loadClipboard(data.message);
}

async function loadAllClipboards() {
    const response = await fetch('/api/clipboard', { method: 'GET' });
    const data = await response.json();
    loadClipboard(data.clipboard.title);
    loadTasks(data.clipboard.tasks);
}

createButton.addEventListener('click', () => {
    titleElement.classList.remove('hidden');
    titleInput.focus();
});
window.addEventListener('keypress', e => {
    if (e.key === 'Enter' && !titleElement.classList.contains('hidden')) {
        const title = { title: titleInput.value };
        createClipboard(title);
        titleElement.classList.add('hidden');
        titleInput.value = "";
    } else if (e.key === 'Escape') {
        console.log("esc pressed");
    }
});

window.addEventListener('load', loadAllClipboards);
