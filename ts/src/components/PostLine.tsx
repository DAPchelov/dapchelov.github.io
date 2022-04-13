import {Link} from "react-router-dom";
import {Post, PropsPost} from "components/Post";
import React from "react";
import './styles/CSSPostLine.css';

interface propsPostLine {
    propsPost: Post;
    // deletePost: (post: Post) => any;
}

const PostLine: React.FC<propsPostLine> = (
    {
        propsPost,
        // deletePost
    }
) => {
    return (
        <div>
            <div className={"postLine"}>
                <Link to={"/post/" + propsPost.id}>{propsPost.title}</Link>
                {/*<div className={"trashBt"} onClick={deletePost(propsPost)}/>*/}
            </div>
        </div>
    )
}

export {PostLine}