console.log("hello world");
const workspace = document.querySelector('.workspace');

// Getting data from the database


// clipboard element Template
function clipboardElement(data) {
    const clipboardHTML = `
    <div>
    <h1>Hello ${data}</h1>
    </div>
    `;
    return clipboardHTML;
};

// Loadclipboard function
function loadClipboard() {
    const clipboardFrag = document
        .createRange()
        .createContextualFragment(clipboardElement("hellow world"));
    // Apend clipboard to workspace in the DOM
    workspace.appendChild(clipboardFrag);
}

//Event listener for loading clipboard templates
window.addEventListener('load', loadClipboard);