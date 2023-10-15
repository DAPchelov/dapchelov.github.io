import { makeAutoObservable } from "mobx";
import $api from "../http";
import { ITodo } from "../models/ITodo";
import { v4 as uuidv4 } from 'uuid';

class NewCardService {

    _id: string = '';
    message: string = '';
    todos: ITodo[] = [];

    constructor(_id: string, message: string, todos: ITodo[]) {
        this.message = message;
        this.todos = todos;
        this._id = _id;
        makeAutoObservable(this);
    }


    setMessage(newCardMessage: string) {
        this.message = newCardMessage;
    }

    setTodos(todos: ITodo[]) {
        this.todos = todos;
    }

    clearCard() {
        this.setTodos([]);
        this.setMessage('');
    }

    addTodo(postMessage: string, postIsCompleted: boolean) {
        const newTodo: ITodo = {
            message: postMessage,
            isCompleted: postIsCompleted,
            // add TEMP todo IDs only for normal rendering <TodoFields> in <InputForm>
            _id: uuidv4(),
        };
        this.todos.push(newTodo);
    }

    removeTodo(id: ITodo['_id']) {
        this.setTodos(this.todos.filter(todo => todo._id !== id));
    }

    checkTodo(id: ITodo['_id']) {
        const todo = this.todos.find(todo => todo._id === id);
        if (todo) {
            todo.isCompleted = !todo.isCompleted
        }
    }

    async postCard(): Promise<void> {
        if (this.message.length > 0) {
            await $api.post('/postcard', { message: this.message, todos: this.todos });
            this.clearCard();
        }
    }

    async editCard(): Promise<void> {
        await $api.post('/editcard', { _id: this._id, message: this.message, todos: this.todos });
        this.clearCard();
    }
    setTodoMessage(message: string, id?: string) {
        const todo = this.todos.find(todo => todo._id === id);
        if (todo) {
            todo.message = message
        }
    }
}

export default NewCardService;