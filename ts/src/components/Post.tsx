import React from 'react'
import './styles/CSSPost.css';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
interface PropsPost {
    post: Post;
}

const RenderPost: React.FC<PropsPost> = (props: PropsPost) => {
    return (
        <div className={"post"}>
            <div className={"postTitle"}>{props.post.title}</div>
            <div className={"postBody"}>{props.post.body}</div>
        </div>
    )
}

export type {Post, PropsPost};
export {RenderPost}