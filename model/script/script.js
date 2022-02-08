let i = 0; // хранит текущее состояние слайдера
const sliderLine = document.getElementsByClassName("slider-line")[0]; // прокручиваемая полоса (её будем смещать)
const tabs = document.getElementsByClassName("tabItem"); // кнопки в нижней части слайдера
const colorBtnUnPress = "rgb(226, 255, 253)" //цвет отжатой кнопки
const colorBtnPress = "rgb(184, 213, 211)" //цвет нажатой кнопки

tabs[0].style.backgroundColor = colorBtnPress; // первая кнопка нажата в начальном состоянии слайдера

// слушает кнопкки, по нажатию вызывает функцию скролла
document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", prevSlide);

/* функции скролла. Отжимает текущую нижнюю кнопку, увеличивает i, делает нажатой следующую нижнюю кнопку
и смещает слайдер влево на 1000px, при увеличении i не даёт значению выйти за диапозон больше количества кнопок */
function nextSlide () {
    tabs[i].style.backgroundColor = colorBtnUnPress;
    i++;
    if (i > tabs.length - 1) {
        i = 0;
    }
    tabs[i].style.backgroundColor = colorBtnPress;
    sliderLine.style.left = -i * 1000 + "px";
}

// тоже самое, но i уменьшается, слайдер крутится в обратную сторону
function prevSlide () {
    tabs[i].style.backgroundColor = colorBtnUnPress;
    i--;
    if (i < 0) {
        i = tabs.length - 1;
    }
    tabs[i].style.backgroundColor = colorBtnPress;
    sliderLine.style.left = -i * 1000 + "px";
}

/* всем кнопкам внизу слайдера назначается слушатель клика. По клику слайдер сдвигается соответсвенно номеру нажатой кнопки,
* текущая нажатая кнопка отжимается, текущему номеру присваивается новое значение, кнопка с новым номером нажимается*/
for (let j = 0; j < tabs.length; j++) {
    tabs[j].addEventListener("click", function () {
        sliderLine.style.left = -j * 1000 + "px";
        tabs[i].style.backgroundColor = colorBtnUnPress;
        i = j;
        tabs[i].style.backgroundColor = colorBtnPress;
    });
}