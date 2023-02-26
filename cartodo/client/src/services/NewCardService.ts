import { makeAutoObservable } from "mobx";
import $api from "../http";
import { ITodo } from "../models/ITodo";

class NewCardService {

    message: string = '';
    todos: ITodo[] = [];

    constructor() {
        makeAutoObservable(this);
      }


    writeMessage(newCardMessage: string) {
        this.message = newCardMessage;
    }

    addTodo(postIsCompleted: boolean, postMessage: string) {
        const newTodo: ITodo = {
            message: postMessage,
            isCompleted: postIsCompleted
        };

        this.todos.push(newTodo);
    }

    async postCard(): Promise<void> {
        return $api.post('/postcard', { message: this.message, todos: this.todos, });
    }
}

export default NewCardService;