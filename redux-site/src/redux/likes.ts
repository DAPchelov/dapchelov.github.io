enum LikesActionTypes {
    INCREMENT_LIKE = 'INCREMENT_LIKE'
}

interface IncrementLike {
    type: LikesActionTypes.INCREMENT_LIKE
}

export interface LikeState {
    likes: number;
}

export interface LikeState {
    likes: number;
}

export type Action = IncrementLike;