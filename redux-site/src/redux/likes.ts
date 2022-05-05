enum LikesActionTypes {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT'
}
const INPUT_TEXT = 'INPUT_TEXT'

interface LikesState {
    likes: number;
}

interface IncrementAction {
    type: LikesActionTypes.INCREMENT
}

interface DecrementAction {
    type: LikesActionTypes.DECREMENT
}

type LikesAction = IncrementAction | DecrementAction;

export type { LikesAction, LikesState };
export { LikesActionTypes }