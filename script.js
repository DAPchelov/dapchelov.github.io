document.addEventListener("keydown", function (event) {

    let audio = document.createElement("Audio");
    audio.src = ("KeySounds/" + event.code[3] + ".mp3");
    audio.play();

    let key = document.querySelector("#" + event.code[3]);
    key.classList.add("keyPressed");

});
document.addEventListener("keyup", function () {
    let key = document.querySelector(".keyPressed");
    if (key !== undefined) {
        key.classList.remove("keyPressed");
    }
});