function setPage(url) {
    window.location.href = url;
}

function onSelectorButtonClick(event) {
    const button = event.currentTarget;
    setPage(`${button.id}.html`);
}

function loadSelectorButtons() {
    const buttons = document.getElementsByClassName("buttons");
    for (const button of buttons) {
        button.addEventListener("click", onSelectorButtonClick);
    }
}

loadSelectorButtons();
