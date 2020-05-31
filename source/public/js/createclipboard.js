const createButton = document.querySelector('#create-button');
const workspace = document.querySelector('.workspace');

// Getting data from the database

// clipboard element Template
function clipboardElement(data) {
    const clipboardHTML = `
    <div>
    <h1> Clipboard Created:${data}</h1>
    </div>
    `;
    return clipboardHTML;
};

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
    const response = await fetch('http://localhost:8080/api/clipboard/add', { method: 'POST' });
    const data = await response.json();
    console.log(data)
    loadClipboard(data.some);
}

createButton.addEventListener('click', createClipboard);