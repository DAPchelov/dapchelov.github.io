const apiKeyAddition = "&api_key=8523c5bd6d26c68b7c80861d8e57494e"
let posters = document.getElementsByClassName("poster");
let annotations = document.getElementsByClassName("annotation");
let filmCollection;
let pageNumber = 1;
let filterMode = "rating";
let filterContent = 18;
let genreButtons = document.getElementsByClassName("genreBtn");

for (let i = 0; i < genreButtons.length; i++) {
    genreButtons[i].addEventListener("click", () => selectOtherGenre(i));
}
document.getElementById("nextBtn").addEventListener("click", nextPage);
document.getElementById("prevBtn").addEventListener("click", prevPage);
document.getElementById("searchButton").addEventListener("click", searchFilms);
document.getElementById("searchInput").addEventListener("keypress", searchFilms);

mainAsyncFunction();

async function mainAsyncFunction() {
    await fillFilmCollection();
    removeCarts();
    createCarts(filmCollection.length);
    fillPosters();
    fillAnnotations();
    requestDetailsAnnotation();
}
function selectOtherGenre(i) {
    filterContent = genreButtons[i].getAttribute("genreId");
    filterMode = "genre";
    mainAsyncFunction();
    changeGenre(genreButtons[i].textContent);
}
function searchFilms() {
    filterMode = "search";
    filterContent = document.getElementById("searchInput").value;
    mainAsyncFunction();
}
function nextPage() {
    pageNumber++;
    mainAsyncFunction();
}
function prevPage() {
    if (pageNumber > 1) {
        pageNumber--;
    }
    mainAsyncFunction();
}

async function fillFilmCollection() {
    if (filterMode === "rating") {
        await getFilmCollectionByRating();
    }
    if (filterMode === "genre") {
        await getFilmCollectionByGenre();
    }
    if (filterMode === "search") {
        await getFilmCollectionBySearch();
    }
}

function createCarts(count) {
    for (let i = 0; i < count; i++) {
        let cartsTable = document.getElementById("cartsTable");
        cartsTable.innerHTML += `<div class="cart"></div>`;
    }
    createPosters();
    createAnnotates();
}

function removeCarts() {
    let cartsTable = document.getElementById("cartsTable");
    while (cartsTable.firstChild) {
        cartsTable.removeChild(cartsTable.firstChild);
    }
}

function createPosters() {
    let carts = document.getElementsByClassName("cart");
    for (let cart of carts) {
        cart.innerHTML += `<div class="poster"></div>`;
    }
}

function createAnnotates() {
    let carts = document.getElementsByClassName("cart");
    for (let cart of carts) {
        cart.innerHTML += `<div class="annotation"></div>`;
    }
}

function fillPosters() {
    for (let i = 0; i < posters.length; i++) {
        posters[i].innerHTML += `<img class="posterImage" src='https://image.tmdb.org/t/p/w500/${filmCollection[i].poster_path}'>`;
    }
}

function fillAnnotations() {
    for (let i = 0; i < annotations.length; i++) {
        annotations[i].innerHTML += filmCollection[i].title;

    }
}

async function getFilmCollectionByRating() {
    let response = await fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc" + apiKeyAddition + "&page=" + pageNumber);
    let collection = await response.json();
    filmCollection = collection.results;
}

async function getFilmCollectionByGenre() {
    let response = await fetch("https://api.themoviedb.org/3/discover/movie?with_genres=" + filterContent + "&sort_by=vote_average.desc&vote_count.gte=10" + apiKeyAddition + "&page=" + pageNumber);
    let collection = await response.json();
    filmCollection = collection.results;
}

async function getFilmCollectionBySearch() {
    let response = await fetch("https://api.themoviedb.org/3/search/movie?query=" + filterContent + apiKeyAddition)
    let collection = await response.json();
    filmCollection = collection.results;
}

function changeGenre(textContent) {
    let selectedGenreField = document.getElementById("selectedGenre");
    selectedGenreField.innerText = textContent;
}

function requestDetailsAnnotation() {
    let carts = document.getElementsByClassName("cart");
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener("click", () => makeNewWindowWithFilm(i));
    }
}

async function makeNewWindowWithFilm(cartNumber) {
    window.open("details.html" + "?" + "id=" + filmCollection[cartNumber].id + apiKeyAddition);
}


