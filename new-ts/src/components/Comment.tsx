import React from 'react'
import './styles/CSSComment.css';

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
interface PropsComment {
    comment: Comment;
}

const RenderComment: React.FC<PropsComment> = (props: PropsComment) => {
    return (
        <div className={"comment"}>
            <div className={"commentName"}><div>Name: {props.comment.name}</div><div>{props.comment.email}</div></div>
            <div className={"commentBody"}>{props.comment.body}</div>
        </div>
    )
}

export type {Comment};
export {RenderComment}