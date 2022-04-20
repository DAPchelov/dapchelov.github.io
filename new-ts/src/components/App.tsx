import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {PostLine} from "./PostLine";
import {Post} from "components/Post";
import './styles/CSSApp.css';

const App = () => {
    const [response, setResponse] = useState<Post[]>([]);
    const nullResponse: string = "Response is null";
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then((response) => response.json())
            .then((json) => setResponse(json));
    }, [])

    const deletePost = (post: Post) => {
        if (response != null && response.length > 0) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
                method: 'DELETE',
            })
                .then(() => setResponse((response) => response.filter((x) => x !== post)));
        } else {
            console.log("Пост не существует!")
        }
    }
    return (
        <div className={"listPage"}>
            <Link to={"/newPostPage/"}><div className={"newPostButton"}>Create NEW Post!</div></Link>
            <div className={"list"}>
                {response ? response.map((post) =>
                    <div className={"postLine"}>
                        <PostLine propsPost={post} key={post.id}/>
                        <div className={"trashBt"} onClick={() => deletePost(post)}/>
                    </div>) : nullResponse}
            </div>
        </div>
    )
};

export {App};