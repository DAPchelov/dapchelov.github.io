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

    setTodos(todos: ITodo[]) {
        this.todos = todos;
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

    clearCard() {
        this.setTodos([]);
        this.setMessage('');
    }

    removeTodo(id: ITodo['_id']) {
        this.setTodos(this.todos.filter(todo => todo._id !== id));
    }

    async postCard(): Promise<void> {
        // delete TEMP todo IDs before post new card to BE. It will get new IDs in the database
        if (this.message.length > 0) {
            this.todos.forEach(todo => { delete (todo._id) });
            $api.post('/postcard', { message: this.message, todos: this.todos, });
            this.clearCard();
        }
    }


}

export default NewCardService;