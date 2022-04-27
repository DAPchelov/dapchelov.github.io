import { Post } from "../components/Post"

export interface PostState {
    posts: Post[];
    loading: boolean;
    error: null | string;
}

export enum PostActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR',
    DELETE_POST = 'DELETE_POST',
    ADD_POST = 'ADD_POST'
}

interface FetchPostAction {
    type: PostActionTypes.FETCH_POSTS;
}

interface FetchPostSuccessAction {
    type: PostActionTypes.FETCH_POSTS_SUCCESS;
    payload: Post[];
}

interface FetchPostErrorAction {
    type: PostActionTypes.FETCH_POSTS_ERROR;
    payload: string;
}

interface DeletePost {
    type: PostActionTypes.DELETE_POST;
    payload: Post[];
}

interface AddPost {
    type: PostActionTypes.ADD_POST;
    payload: Post[];
}
export type PostAction = FetchPostAction | FetchPostErrorAction | FetchPostSuccessAction | DeletePost | AddPost;