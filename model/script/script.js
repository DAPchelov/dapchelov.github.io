let i = 0; // хранит текущее состояние слайдера
const sliderLine = document.getElementsByClassName("slider-line")[0]; // прокручиваемая полоса (её будем смещать)
const tabs = document.getElementsByClassName("tabItem"); // кнопки в нижней части слайдера

tabs[0].style.backgroundColor = "rgb(184,213,211)"; // первая кнопка нажата в начальном состоянии слайдера

/* слушает кнопкку некст, по нажатию некст отжимает текущую нижнюю кнопку, увеличивает i, делает нажатой следующую нижнюю
* кнопку и смещает слайдер влево на 1000px, при увеличении i не даёт значению выйти за диапозон больше 3 (по кол-ву кнопок) */
document.getElementById("nextBtn").addEventListener("click", function () {
    tabs[i].style.backgroundColor = "rgb(226, 255, 253)";
    if (++i > 3) {
        i = 0;
    }
    tabs[i].style.backgroundColor = "rgb(184, 213, 211)";
    sliderLine.style.left = -i * 1000 + "px";
});

// тоже самое, но слушается кновка prev и i уменьшается
document.getElementById("prevBtn").addEventListener("click", function () {
    tabs[i].style.backgroundColor = "rgb(226, 255, 253)";
    if (--i < 0) {
        i = 3;
    }
    tabs[i].style.backgroundColor = "rgb(184, 213, 211)";
    sliderLine.style.left = -i * 1000 + "px";
});

/* всем кнопкам внизу слайдера назначается слушатель клика. По клику слайдер сдвигается соответсвенно номеру нажатой кнопки,
* текущая нажатая кнопка отжимается, текущему номеру присваивается новое значение, кнопка с новым номером нажимается*/
for (let j = 0; j < tabs.length; j++) {
    tabs[j].addEventListener("click", function () {
        sliderLine.style.left = -j * 1000 + "px";
        tabs[i].style.backgroundColor = "rgb(226, 255, 253)";
        i = j;
        tabs[i].style.backgroundColor = "rgb(184,213,211)";
    });
}