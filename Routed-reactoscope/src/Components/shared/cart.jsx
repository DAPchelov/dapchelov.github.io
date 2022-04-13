import React from "react";

const Cart = (props) => {
    let url = "/film" + "/" + props.film.id;
    return (
        <div className="cart">
            <img src={"https://image.tmdb.org/t/p/w500/" + props.film.poster_path}/>
            <a href={url} className="annotation"> {props.film.title} </a>
        </div>
    )
}

export {Cart}