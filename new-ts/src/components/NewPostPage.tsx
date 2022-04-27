import React, {ChangeEvent, useCallback, useState} from "react";
import axios from "axios";
import './styles/CSSNewPostPage.css';
import {Post} from "components/Post";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { PostActionTypes } from "../types/posts";
import { Link } from "react-router-dom";

const NewPostPage: React.FC = () => {
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [createrId, setCreaterId] = useState(1234);

    const { posts, error, loading } = useTypedSelector(state => state.post)
    const dispatch = useDispatch();

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
        }).then (() => dispatch ({type: PostActionTypes.ADD_POST, payload: posts.push(newPost)}));

        console.log(posts);
    }

    return (
        <div className={"newPost"}>
            <div className={"typeText"}>Type a title</div>
            <textarea value={newTitle} className={"titleInput"} onChange={handleSetNewTitle}/>
            <div className={"typeText"}>Type a content</div>
            <textarea value={newBody} className={"bodyInput"} onChange={handleSetNewBody}/>
            <Link to={"/"}><div className={"createPostButton"} onClick={postPost}>Publish new Post</div></Link>
        </div>
    )
}

export {NewPostPage};