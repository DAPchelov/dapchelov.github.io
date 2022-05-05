import { LikesAction, LikesState, LikesActionTypes } from './likes'

const initialState: LikesState = {
    likes: 5
}

const likesReducer = (state = initialState, action: LikesAction): LikesState => {
    switch (action.type) {
        case LikesActionTypes.INCREMENT:
            return {
                ...state,
                likes: state.likes + 1
            }
        case LikesActionTypes.DECREMENT:
            return {
                ...state,
                likes: state.likes - 1
            }
        default:
            return state;
    }
}

export { likesReducer };