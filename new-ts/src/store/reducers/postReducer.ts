import { PostAction, PostActionTypes, PostState } from "../../types/posts"

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null
}

export const postReducer = (state = initialState, action: PostAction): PostState => {
    switch (action.type) {
        case PostActionTypes.FETCH_POSTS:
            return { loading: true, error: null, posts: [] }
        case PostActionTypes.FETCH_POSTS_SUCCESS:
            return { loading: false, error: null, posts: action.payload }
        case PostActionTypes.FETCH_POSTS_ERROR:
            return { loading: false, error: action.payload, posts: [] }
        case PostActionTypes.DELETE_POST:
            return { loading: false, error: null, posts: action.payload }
        case PostActionTypes.ADD_POST:
            return { loading: false, error: null, posts: action.payload }
        default:
            return state
    }
}