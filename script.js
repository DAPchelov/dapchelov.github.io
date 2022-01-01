document.addEventListener("keydown", function (event) {
    if (event.code === "KeyA") {

        let audio = document.createElement("Audio");
        audio.src = "WhiteKeys/A.mp3"
        audio.play();

        let key = document.querySelector("#A");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyS") {
        let audio = document.createElement("Audio");
        audio.src = "WhiteKeys/S.mp3"
        audio.play();

        let key = document.querySelector("#S");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyD") {
        let audio = document.createElement("Audio");
        audio.src = "WhiteKeys/D.mp3"
        audio.play();

        let key = document.querySelector("#D");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyF") {
        let audio = document.createElement("Audio");
        audio.src = "WhiteKeys/F.mp3"
        audio.play();

        let key = document.querySelector("#F");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyG") {
        let audio = document.createElement("Audio");
        audio.src = "WhiteKeys/G.mp3"
        audio.play();

        let key = document.querySelector("#G");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyH") {
        let audio = document.createElement("Audio");
        audio.src = "WhiteKeys/H.mp3"
        audio.play();

        let key = document.querySelector("#H");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyJ") {
        let audio = document.createElement("Audio");
        audio.src = "WhiteKeys/J.mp3"
        audio.play();

        let key = document.querySelector("#J");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyW") {
        let audio = document.createElement("Audio");
        audio.src = "BlackKeys/W.mp3"
        audio.play();

        let key = document.querySelector("#W");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyE") {
        let audio = document.createElement("Audio");
        audio.src = "BlackKeys/E.mp3"
        audio.play();

        let key = document.querySelector("#E");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyT") {
        let audio = document.createElement("Audio");
        audio.src = "BlackKeys/T.mp3"
        audio.play();

        let key = document.querySelector("#T");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyY") {
        let audio = document.createElement("Audio");
        audio.src = "BlackKeys/Y.mp3"
        audio.play();

        let key = document.querySelector("#Y");
        key.classList.add("keyPressed");

    } else if (event.code === "KeyU") {
        let audio = document.createElement("Audio");
        audio.src = "BlackKeys/U.mp3"
        audio.play();

        let key = document.querySelector("#U");
        key.classList.add("keyPressed");
    } else {
        console.log("Warning!");
    }
});
document.addEventListener("keyup", function () {
        let key = document.querySelector(".keyPressed");
        if (key !== undefined) {
            key.classList.remove("keyPressed");
        }
});