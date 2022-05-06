import { TitleActionTypes, TitleState } from "./title";
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
        type: TitleActionTypes.INPUT_TEXT,
        payload: text
    }
}

export { incrementLikes, decrementLikes, inputText}