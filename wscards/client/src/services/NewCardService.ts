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
        // delete TEMP todo IDs before post new card to BE. It will get new IDs in the database
        if (this.message.length > 0) {
            this.todos.forEach(todo => { delete (todo._id) });
            $api.post('/postcard', { message: this.message, todos: this.todos });
            // $api.post('/postcard', { _id: '6523a1210188fec1175b1ad8', message: '3', todos: [{isCompleted: false, message: '3'}], });
            this.clearCard();
        }
    }

    async editCard(): Promise<void> {
        $api.post('/editcard', { _id: this._id, message: this.message, todos: this.todos });
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