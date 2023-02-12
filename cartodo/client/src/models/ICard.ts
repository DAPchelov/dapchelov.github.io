interface ITodo {
    _id: string;
    isCompleted: boolean;
    message: string;
}
export interface ICard {
    _id: string;
    isAccepted: boolean;
    isCompleted: boolean;
    message: string;
    todos:[ITodo];
}