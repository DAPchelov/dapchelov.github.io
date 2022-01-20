let pass = 'TrustNo1';

window.onload = function () {

    document.getElementById("bt_ok").addEventListener("click", checkLock);

    let checkBoxes = document.querySelectorAll('input[type=checkbox]');
    for (let oneCheckBox of checkBoxes) {
        oneCheckBox.onchange = function () { readyChecker() }
    }

    let ranges = document.querySelectorAll('input[type=range]');
    for (let oneRange of ranges) {
        oneRange.onchange = function () { readyChecker() }
    }

    document.getElementById("bt_launch").addEventListener("click", launch);
}

// функция сравнивает длину массива чекнутых чекбоксов с длинной общего массива чекбоксов.
// Проверяет все ранги (слайдеры) на отсутствие значения в одном из них меньше 100.
// если длина массивов чекбоксов одинакова и значения всех слайдоров === 100, вызывает функцию разблокировки кнопки Launch.
// ! Нужно разбить эту функцию на мелкие.
function readyChecker() {

    let numCheckedBoxes = document.querySelectorAll('input[type=checkbox]:checked').length;
    let numAllBoxes = document.querySelectorAll('input[type=checkbox]').length;

    let allRanges = document.querySelectorAll('input[type=range]');

    let isRangesMax = true;
    for (let oneRange of allRanges) {
        if (oneRange.valueAsNumber != 100) {
            isRangesMax = false;
        }
    }

    if ((numCheckedBoxes === numAllBoxes) && (isRangesMax === true)){
        unblockingLaunchBt();
    } else {
        blockingLaunchBt();
    }
}

function checkLock() {
    if (checkPass()) {
        unblocking();
    } else {
        blocking();
    }
}

function unblocking() {
    document.getElementById("masterPass").setAttribute("disabled", "disabled");
    document.getElementById("bt_ok").setAttribute("disabled", "disabled");
    let allSwitchable = document.getElementsByClassName("switchable");
    for (let oneSwitchable of allSwitchable) {
        oneSwitchable.removeAttribute("disabled");
    }
}

function blocking() {
    let allSwitchable = document.getElementsByClassName("switchable");
    for (let oneSwitchable of allSwitchable) {
        oneSwitchable.setAttribute("disabled", "disabled");
    }
}

function checkPass() {
    return (document.getElementById("masterPass").value === pass);
}

function unblockingLaunchBt() {
    document.getElementById("bt_launch").removeAttribute("disabled");
}

function blockingLaunchBt() {
    document.getElementById("bt_launch").setAttribute("disabled", "disabled");
}

function launch(){
    document.querySelector(".rocket").classList.add('flyer');
}