import React, {useEffect, useState} from "react";
import {Post, RenderPost} from "./Post";
import {Comment, RenderComment} from "./Comment";
import {useParams} from "react-router-dom";
import './styles/CSSPostPage.css';

const PostPage: React.FC = () => {
    const params = useParams();
    const [responsePost, setResponsePost] = useState<Post>();
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
            .then((response) => response.json())
            .then((json) => setResponsePost(json));
    }, [])

    const [responseComments, setResponseComments] = useState<Comment[]>();
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`)
            .then((response) => response.json())
            .then((json) => setResponseComments(json));
    }, [])

    return (
        <div>
            {responsePost && <RenderPost post={responsePost}/>}
            <div className={"comments"}>
                {responseComments && responseComments.map((comment) => <RenderComment comment={comment} key={comment.id}/>)}
            </div>
        </div>
    )
}

export {PostPage}