const createButton = document.querySelector('#create-button');



function createClipboard() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        console.log(this.responseText);
    };
    request.open('POST', '/api/clipboard/add', true);
    request.send();
};


createButton.addEventListener('click', createClipboard);