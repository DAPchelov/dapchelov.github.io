import {Link} from "react-router-dom";
import {Post} from "components/Post";
import React from "react";
import './styles/CSSPostLine.css';

interface propsPostLine {
    propsPost: Post;
}

const PostLine: React.FC<propsPostLine> = (
    {
        propsPost,
    }
) => {
    return (
        <div>
            <Link to={"/post/" + propsPost.id}>{propsPost.title}</Link>
        </div>
    )
}

export {PostLine}