import React from "react";
import {GenreButton} from "./genreButton";

const GenreLine = () => {
    const genres = {
        Drama: 18,
        Crime: 80,
        Comedy: 35,
        Action: 28,
        Thriller: 53,
        Documentary: 99,
        Adventure: 12,
        Science_Fiction: 878,
        Animation: 16,
        Family: 10751,
        Romance: 10749,
        Mystery: 9648,
        Horror: 27,
        Fantasy: 14,
        War: 10752,
        Music: 10402,
        Western: 37,
        History: 36,
        TV_Movie: 10770
    }
    const buttons = [];
    Object.entries(genres).map((genre) => buttons.push(
        <GenreButton key={genre[0]} genre={genre}/>
    ));
    return (
        <div className="genreLine">
            {buttons}
        </div>
    )
}
export {GenreLine}