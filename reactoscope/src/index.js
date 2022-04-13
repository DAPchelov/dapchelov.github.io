import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {useState, useEffect} from 'react';
import arrowButton from "./ico/arrow.png";

let pageNumber = 1;

function MakeHeader(props) {
    return (
        <div className="header">
            <div className="logo" onClick={() => {
                props.newReq("rating");
                props.newSearchContent("")
            }}>REACTOSCOPE
            </div>
            <div className="pageArrows">
                <img className="prevButton" src={arrowButton} onClick={() => prevPage(props)}/>
                <img className="nextButton" src={arrowButton} onClick={() => nextPage(props)}/>
            </div>
            <input type="text" className="searchInput" onChange={(event) => {
                props.newReq("search");
                props.newSearchContent(event.target.value)
            }}/>
        </div>
    )
}

function nextPage(props) {
    if (pageNumber < 500) {
        pageNumber++;
        props.newPage(pageNumber)
    }
}

function prevPage(props) {
    if (pageNumber > 1) {
        pageNumber--;
        props.newPage(pageNumber)
    }
}

function MakeGenreLine(props) {
    const genreMap = new Map(
        [["Drama", 18], ["Crime", 80], ["Comedy", 35], ["Action", 28], ["Thriller", 53], ["Documentary", 99],
            ["Adventure", 12], ["Science Fiction", 878], ["Animation", 16], ["Family", 10751], ["Romance", 10749], ["Mystery", 9648],
            ["Horror", 27], ["Fantasy", 14], ["War", 10752], ["Music", 10402], ["Western", 37], ["History", 36], ["TV Movie", 10770]]);
    const buttons = [];
    for (let genre of genreMap) {
        buttons.push(<div className="genreButton" onClick={() => {
            props.newReq("genre");
            props.newSearchContent(genre[1])
        }}>{genre[0]}</div>)
    }
    return (
        <div className="genreLine">
            {buttons}
        </div>
    )
}

function Cart(props) {
    return (
        <div className="cart">
            <img src={"https://image.tmdb.org/t/p/w500/" + props.film.poster_path}/>
            <div className="annotation">
                {props.film.title}
            </div>
        </div>
    )
}

function FillPage(props) {
    const carts = [];
    for (let i = 0; i < props.collection.length; i++) {
        carts.push(<Cart film={props.collection[i]}/>);
    }
    return carts;
}

function Page() {
    let [searchContent, setSearchContent] = useState("");
    let [page, setPage] = useState(1);
    let [request, setRequest] = useState("rating");

    let [url, setUrl] = useState("");
    let [response, setResponse] = useState(null);

    useEffect(() => {
        const api_key = "api_key=8523c5bd6d26c68b7c80861d8e57494e";
        const serverUrl = "https://api.themoviedb.org/3/discover/movie";

        if (request !== "search") {
            setUrl(serverUrl + "?" + "sort_by=" + "popularity.desc" + "&" + "with_genres=" + searchContent + "&" + "page=" + page + "&" + api_key);
        } else {
            if (searchContent.length === 0) {
                setRequest("rating");
                setPage(1);
            } else {
                setUrl("https://api.themoviedb.org/3/search/movie?query=" + searchContent + "&" + "page=" + page + "&" + api_key);
            }
        }
    }, [searchContent, request, page]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(json => setResponse(json))
    }, [url]);
    useEffect(() => {
        if ((response != null)&&((response.results.length === 0) && (page > 1))) {
            pageNumber = page - 1;
            setPage(pageNumber);
        }
    }, [response]);
    return (
        <div>
            <MakeHeader newReq={setRequest} newSearchContent={setSearchContent} newPage={setPage}/>
            <MakeGenreLine newReq={setRequest} newSearchContent={setSearchContent}/>
            <div className="pageBody">
                {response ? <FillPage collection={response.results}/> : console.log("response is null")}
            </div>
        </div>
    );
}

// ========================================

// ========================================

ReactDOM.render(
        <Page/>,
    document.getElementById('root')
);
