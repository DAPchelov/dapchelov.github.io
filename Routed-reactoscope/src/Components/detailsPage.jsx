import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {apiKey} from "../constants/apiKey";
import {AnnotationRow} from "./shared/annotationRow";

function DetailsPage() {
    let [url, setUrl] = useState("");
    let [response, setResponse] = useState(null);
    const params = useParams();

    useEffect(() => {
            setUrl("https://api.themoviedb.org/3/movie/" + params.filmId + "?" + "api_key=" + apiKey)
        }, []
    )

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setResponse(json))
    }, [url]);

    return (
        <div>
            {response ?
                <div className="detailsPage">
                    <div className="detailsPoster">
                        <img src={"https://image.tmdb.org/t/p/w500/" + response.poster_path}/>
                    </div>
                    <div className="annotationDetails">
                        <AnnotationRow name={"Title"} value={response.title}/>
                        <AnnotationRow name={"Genre"} value={response.genres[0].name}/>
                        <AnnotationRow name={"Release"} value={response.release_date}/>
                        <AnnotationRow name={"Popularity"} value={response.popularity}/>
                        <AnnotationRow name={"Original language"} value={response.original_language}/>
                        <AnnotationRow name={"Average vote"} value={response.vote_average}/>
                        <AnnotationRow name={"Status"} value={response.status}/>
                    </div>
                    <div className="detailsOverview">
                        {response.overview}
                    </div>
                </div>
                : console.log("response is null")}
        </div>
    );
}

export {DetailsPage}