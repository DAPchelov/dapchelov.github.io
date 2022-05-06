import { TitleActionTypes, TitleState, TitleAction } from "./title";

const initialState: TitleState = {
    text: ''
}

const inputReducer = (state = initialState, action: TitleAction): TitleState => {
    switch (action.type) {
        case TitleActionTypes.INPUT_TEXT: 
            return {
                ...state,
                text: action.payload
            }
        default:
            return state;
    }
}

export { inputReducer };