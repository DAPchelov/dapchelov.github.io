let icons = document.getElementsByClassName("icons");
for (let icon of icons) {
    icon.addEventListener("mouseover", function () {
        document.getElementById("infoString").innerHTML = icon.getAttribute("infoStr");
    });
}
