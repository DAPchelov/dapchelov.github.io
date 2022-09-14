import { ITodo } from "./ITodo";

export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;
    todos: [ITodo];
}