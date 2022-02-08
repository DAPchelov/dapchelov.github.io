let currentSlideIndex = 0;
const sliderLineEl = document.getElementsByClassName("slider-line")[0]; // прокручиваемая полоса (её будем смещать)
const tabsEls = document.getElementsByClassName("tabItem"); // кнопки в нижней части слайдера
const colorBtnUnPress = "rgb(226, 255, 253)";
const colorBtnOnpress = "rgb(184, 213, 211)";

/** ---------------------------------- */
function makeFirstTabOnpressed() {
    tabsEls[0].style.backgroundColor = colorBtnOnpress;
}

function registerListeners() {
    document.getElementById("nextBtn").addEventListener("click", scrollToNextSlide);
    document.getElementById("prevBtn").addEventListener("click", scrollToPrevSlide);
    for (let j = 0; j < tabsEls.length; j++) {
        tabsEls[j].addEventListener("click", function () {
            sliderLineEl.style.left = -j * 1000 + "px";
            makeCurrentTabUnpressed();
            currentSlideIndex = j;
            makeCurrentTabOnpressed();
        });
    }
}

function makeCurrentTabUnpressed() {
    tabsEls[currentSlideIndex].style.backgroundColor = colorBtnUnPress;
}

function makeCurrentTabOnpressed() {
    tabsEls[currentSlideIndex].style.backgroundColor = colorBtnOnpress;
}

function moveCurrentSlideToVisibleArea() {
    sliderLineEl.style.left = -currentSlideIndex * 1000 + "px";
}

function validateCurrentSlideIndex(isIncrement) {
    if (isIncrement) {
        if (currentSlideIndex > tabsEls.length - 1) {
            currentSlideIndex = 0;
        }
    } else {
        if (currentSlideIndex < 0) {
            currentSlideIndex = tabsEls.length - 1;
        }
    }
}

function scrollToNextSlide () {
    makeCurrentTabUnpressed();

    currentSlideIndex++;
    validateCurrentSlideIndex(true);

    makeCurrentTabOnpressed();
    moveCurrentSlideToVisibleArea();
}

function scrollToPrevSlide () {
    makeCurrentTabUnpressed();

    currentSlideIndex--;
    validateCurrentSlideIndex(false);

    makeCurrentTabOnpressed();
    moveCurrentSlideToVisibleArea();
}

/** ---------------------------------- */

makeFirstTabOnpressed();
registerListeners();