import { makeAutoObservable } from "mobx";
import $api from "../http";
import { ITodo } from "../models/ITodo";
import { v4 as uuidv4 } from 'uuid';

class NewCardService {

    message: string = '';
    todos: ITodo[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setMessage(newCardMessage: string) {
        this.message = newCardMessage;
    }

    addTodo(postIsCompleted: boolean, postMessage: string) {
        const newTodo: ITodo = {
            message: postMessage,
            isCompleted: postIsCompleted,
            // add TEMP todo IDs only for normal rendering <TodoList> in <InputForm>
            _id: uuidv4(),
        };

        this.todos.push(newTodo);
    }

    async postCard(): Promise<void> {
        // delete TEMP todo IDs before post new card to BE. It will get new IDs in the database
        if (this.message.length > 0) {
            this.todos.map(todo => { delete (todo._id) });
            $api.post('/postcard', { message: this.message, todos: this.todos, });
            this.clearCard();
        }
    }

    clearCard() {
        this.todos.length = 0;
        this.message = '';
    }
}

export default NewCardService;