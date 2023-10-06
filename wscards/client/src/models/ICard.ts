import { ITodo } from "./ITodo";

export interface ICard {
    _id: string;
    isAccepted: boolean;
    isCompleted: boolean;
    message: string;
    todos:[ITodo];
}