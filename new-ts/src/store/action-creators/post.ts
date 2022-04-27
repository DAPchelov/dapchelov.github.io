
import axios from "axios";
import { Dispatch } from "redux";
import { PostAction, PostActionTypes } from "types/posts";

export const fetchPosts = () => {
    return function(dispatch: Dispatch<PostAction>) {
        dispatch({ type: PostActionTypes.FETCH_POSTS });
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: json}))
    }
}





// export const fetchPosts = () => {
//     return async (dispatch: Dispatch<PostAction>) => {
//         try {
//             dispatch({ type: PostActionTypes.FETCH_POSTS });
//             const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
//             dispatch({type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: response.data})
//         } catch (e) {
//             dispatch({ type: PostActionTypes.FETCH_POSTS_ERROR, payload: "Ошибка загрузки постов" })
//         }
//     }
// }