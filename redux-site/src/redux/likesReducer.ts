import { INCREMENT, DECREMENT } from "./types";

const initialState = {
    likes: 5
}

const likesReducer = (state = initialState, action: any) => {
    console.log('reducer > ', action);
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                likes: state.likes + 1
            }
        case DECREMENT:
            return {
                ...state,
                likes: state.likes - 1
            }
        default:
            return state;
    }
}

export { likesReducer };