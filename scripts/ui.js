
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
    let canvas = document.querySelector("canvas#alice");
    let ctx = canvas.getContext("2d");
    const img = document.getElementById("alice-sprite");
    let frame = 0;
    let ticks = 0;
    let spinAnim = [0, 1, 3, 2]
    ctx.imageSmoothingEnabled = false;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // src pos then dest pos on canvas
        if (ticks >= 25) {
            frame = (frame + 1) % 4
            ticks = 0;
        }
        ticks += 1;
        ctx.drawImage(img, 0, 48*spinAnim[frame], 32, 48, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(draw);
    }
    draw();
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