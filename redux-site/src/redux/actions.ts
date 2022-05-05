import { INPUT_TEXT } from "./types";
import { LikesActionTypes } from './likes';


const incrementLikes = () => {
    return {
        type: LikesActionTypes.INCREMENT
    }
}

const decrementLikes = () => {
    return {
        type: LikesActionTypes.DECREMENT
    }
}

const inputText = (text: string) => {
    return {
        type: INPUT_TEXT,
        text
    }
}

export { incrementLikes, decrementLikes, inputText}