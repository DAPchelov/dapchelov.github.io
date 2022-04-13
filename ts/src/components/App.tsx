import React, {useEffect, useState} from "react";
import {PostLine} from "./PostLine";
import {Post} from "components/Post";
import './styles/CSSApp.css';

const App = () => {
    const [response, setResponse] = useState<Post[]>([]);
    let spliced: Post[] = [];
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
            });
            spliced = response;
            spliced.splice(spliced.indexOf(post), 1);
            console.log(response);
            console.log(spliced);
            setResponse(spliced);
        } else {
            console.log("Пост не существует!")
        }
    }
    return (
        <div className={"list"}>
            {response ? response.map((post) => <div>
                <PostLine propsPost={post} key={post.id}/>
                <div className={"trashBt"} onClick={() => deletePost(post)}/>
            </div>) : nullResponse}
        </div>
    )
};

export {App};