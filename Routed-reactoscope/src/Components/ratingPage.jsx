import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {apiKey} from "../constants/apiKey";
import {CartsTable} from "./shared/cartsTable";
import {Header} from "./shared/header";
import {GenreLine} from "./shared/genreLine";

let pageNumber = 1;

function RatingPage() {
    let [page, setPage] = useState(1);
    let [response, setResponse] = useState(null);
    let url = ("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=&page=" + page + "&api_key=" + apiKey);

    const history = useNavigate();
    const nextPage = ()=> {
        const nextPage = (page + 1);
        setPage(nextPage);
        return (history(`/${nextPage}`));
    }
    const prevPage = ()=> {
        let prevPage = page;
        if (prevPage > 1) {
            prevPage = page - 1;
        }
        setPage(prevPage);
        return (history(`/${prevPage}`));
    }

    function newQuery (value) {
        history(`/find/${value}/${page}`);
    }

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setResponse(json))
    }, [url]);
    useEffect(() => {
        if ((response != null) && ((response.results.length === 0) && (page > 1))) {
            pageNumber = page - 1;
            setPage(pageNumber);
        }
    }, [response]);

    return (
        <div>
            <Header nextPage={nextPage} prevPage={prevPage} newQuery={newQuery}/>
            <GenreLine/>
            <CartsTable response={response}/>
        </div>
    );
}
export {RatingPage}