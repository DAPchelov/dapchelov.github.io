document.addEventListener("keydown", function (event) {
    const keyDown = document.getElementById(event.code[3]) // find an element by pressing a key
    if (keyDown !== null) { // if the required element was found

        keyDown.classList.add("keyPressed"); // add the class "keyPressed" to element

        const audio = document.createElement("Audio"); // making a sound
        audio.src = ("KeySounds/" + event.code[3] + ".mp3");
        audio.play();
    }
});

document.addEventListener("keyup", function () {
    const keyUp = document.querySelector(".keyPressed"); // find an element with class "keyPressed"
    if (keyUp !== null) { // if the required element was found
        keyUp.classList.remove("keyPressed"); // delete class "keyPressed" -> normal condition
    }
});