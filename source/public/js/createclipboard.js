const createButton = document.querySelector('#create-button');
const workspace = document.querySelector('.workspace');

// task template
function taskElement(task) {
    let taskHTML = `
    <div class="task" unselectable="on">
        <h2 unselectable="on">${task}</h2>
    </div>

    `;
    return taskHTML;
}

// clipboard element Template
function clipboardElement(data) {
    const clipboardHTML = `
    <div class="clipboard-container">
            <div class="clipboard-title">
                <h1>${data}</h1>        
            </div>
        <div class="tasks-container"></div>

    </div>
    `;
    return clipboardHTML;
};
// loads each task in the tasks array
function loadTasks(tasks) {
    const tasksContainer = document.querySelector('.tasks-container');
    tasks.forEach(task => {
        console.log(task)
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
async function createClipboard() {
    const response = await fetch('http://localhost:8080/api/clipboard', { method: 'POST' });
    const data = await response.json();
    loadClipboard(data.message);
}

async function getClipboard() {
    const response = await fetch('http://localhost:8080/api/clipboard', { method: 'GET' });
    const data = await response.json();
    loadClipboard(data.clipboard.title);
    loadTasks(data.clipboard.tasks);
}

createButton.addEventListener('click', createClipboard);
window.addEventListener('load', getClipboard);
