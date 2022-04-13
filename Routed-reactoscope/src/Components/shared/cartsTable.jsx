import {Header} from "./header";
import {GenreLine} from "./genreLine";
import {Cart} from "./cart";
import React from "react";

function CartsTable (props) {
    return (
        <div>
            {props.response ?
                <div className="pageBody">
                    {props.response.results.map((film) =>
                        <Cart key={film.id} film={film}/>
                    )}
                </div>
                : console.log("response is null")}
        </div>
    );
}
export {CartsTable};