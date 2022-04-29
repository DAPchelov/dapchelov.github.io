import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Post} from "components/Post";
import { PostsList } from "./PostsList";
import './styles/CSSApp.css';

const App = () => {
    const [response, setResponse] = useState<Post[]>([]);
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
            <PostsList postsList={response}/>
        </div>
    )
};

export {App};