import React, {ChangeEvent, useCallback, useState} from "react";
import axios from "axios";
import './styles/CSSNewPostPage.css';
import {Post} from "components/Post";

const NewPostPage: React.FC = () => {
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [createrId, setCreaterId] = useState(1);

    const handleSetNewTitle =  useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
      setNewTitle(event.target.value)
    },[]);

    const handleSetNewBody = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewBody(event.target.value)
    },[]);

    const postPost = () => {

        const newPost: Post = {
            userId: createrId,
            title: newTitle,
            body: newBody,
        }

        axios({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: newPost,
        })
    }

    return (
        <div className={"newPost"}>
            <div className={"typeText"}>Type a title</div>
            <textarea value={newTitle} className={"titleInput"} onChange={handleSetNewTitle}/>
            <div className={"typeText"}>Type a content</div>
            <textarea value={newBody} className={"bodyInput"} onChange={handleSetNewBody}/>
            <div className={"createPostButton"} onClick={postPost}>Publish new Post</div>
        </div>
    )
}

export {NewPostPage};