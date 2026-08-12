
// State
let menuShown = false;

function setPage(url) {
    document.location.href = url;
}


function addParallaxEffect() {
    window.addEventListener("scroll", function() {
        let sy = this.scrollY;
        let parallax = .4;
        document.querySelector("div.home-section").style.backgroundPositionY = `${sy * parallax}px`
    })
}

function addAliceWalking() {
    
}

function addTTSPlayers() {
    let buttons = document.getElementsByClassName("tts-button");
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.addEventListener("click", function() {
            let speech = new SpeechSynthesisUtterance(button.parentElement.innerText);
            speech.lang = "en-GB";
            speech.pitch = 1.2;
            speechSynthesis.speak(speech);
        })
    }
}

function addMenuListToggler() {

}

function addMenuScripts() {
    let menuItems = document.getElementsByClassName("menu-item");
    let menuIcon = document.getElementById("menu-icon");
    addMenuListToggler();

    menuIcon.addEventListener("click", function() {
        setPage("index.html");
    })
    for (let i = 0; i < menuItems.length; i++) {
        let item = menuItems[i];
        item.addEventListener("click", function() {
            setPage(this.id + ".html");
        })
    }
}

function downloadGramlyApk() {
    let a = document.createElement("a");
    a.href = "resources/Gramly-Early-Release-V5.apk"
    a.download = "Gramly.apk";
    a.click();
}

for (let footer of document.getElementsByClassName("basic-footer")) {
    footer.getElementsByTagName("p")[0].innerHTML = "(C) STI COLLEGE LIPA 2026-2027. MAWD 202 - GROUP 4";
}