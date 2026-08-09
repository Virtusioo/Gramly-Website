
function setPage(url) {
    document.location.href = url;
}

function onSelectorButtonClick(event) {
    let button = event.target;
    setPage(button.id + ".html");
}

function loadSelectorButtons() {
    let buttons = document.getElementsByClassName("buttons");
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener("click", onSelectorButtonClick);
    }
}

loadSelectorButtons();