enum TitleActionTypes {
    INPUT_TEXT = 'INPUT_TEXT',
}

interface TitleState {
    text: string;
}

interface InputAction {
    type: TitleActionTypes.INPUT_TEXT,
    payload: string;
}

type TitleAction = InputAction;

export type { TitleAction, TitleState };
export { TitleActionTypes }