import { INCREMENT, DECREMENT } from "./types";

const incrementLikes = () => {
    return {
        type: INCREMENT
    }
}

const decrementLikes = () => {
    return {
        type: DECREMENT
    }
}

export { incrementLikes, decrementLikes}