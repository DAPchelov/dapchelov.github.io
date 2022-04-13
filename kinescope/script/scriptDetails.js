
mainAsyncFunction();

async function mainAsyncFunction() {
    let film = await makeDetailsAnnotation();
    renderDetailsInformation(film);
}

async function makeDetailsAnnotation() {
    const paramString = document.location.search;
    const searchParams = new URLSearchParams(paramString);
    const filmId = searchParams.get("id");
    const apiKey = searchParams.get("api_key");
    const response = await fetch("https://api.themoviedb.org/3/movie/" + filmId + "?" + "api_key=" + apiKey);
    const filmJson = await response.json();
    return (filmJson);
}

function renderDetailsInformation(film) {
    const detailsAnnotationFrame = document.getElementById("detailsAnnotation");
    const template = `
            <div class="annotationRow">
                <div class="annotationParameter">Title</div>
                <div class="annotationContent">${film.title}</div>
            </div>
            <div class="annotationRow">
                <div class="annotationParameter">Genre</div>
                <div class="annotationContent">${film.genres[0].name}</div>
            </div>
            <div class="annotationRow">
                <div class="annotationParameter">Releaze</div>
                <div class="annotationContent">${film.release_date}</div>
            </div>
            <div class="annotationRow">
                <div class="annotationParameter">Popularity</div>
                <div class="annotationContent">${film.popularity}</div>
            </div>
            <div class="annotationRow">
                <div class="annotationParameter">Original language</div>
                <div class="annotationContent">${film.original_language}</div>
            </div>
            <div class="annotationRow">
                <div class="annotationParameter">Average vote</div>
                <div class="annotationContent">${film.vote_average}</div>
            </div>
            <div class="annotationRow">
                <div class="annotationParameter">Status</div>
                <div class="annotationContent">${film.status}</div>
            </div>
            `;
    detailsAnnotationFrame.innerHTML = template;
    document.getElementById("detailsPoster").innerHTML = `<img class="posterImage" src='https://image.tmdb.org/t/p/w500/${film.poster_path}'>`
    document.getElementById("detailsOverview").innerText = film.overview;
}


