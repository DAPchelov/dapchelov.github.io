import { INCREMENT, DECREMENT, INPUT_TEXT } from "./types";

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

const inputText = (text: string) => {
    return {
        type: INPUT_TEXT,
        text
    }
}

export { incrementLikes, decrementLikes, inputText}