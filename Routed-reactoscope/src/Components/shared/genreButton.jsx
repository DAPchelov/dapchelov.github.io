import {Link} from "react-router-dom";
import React from "react";

function GenreButton (props) {
    return (
    <div className="genreButton">
        <Link to={"/genres/" + props.genre[1] + "/1"}>
            {props.genre[0]}
        </Link>
    </div>
    )
}
export {GenreButton};