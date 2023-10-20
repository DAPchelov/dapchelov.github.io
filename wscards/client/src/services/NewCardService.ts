import { makeAutoObservable } from "mobx";
import { ITodo } from "../models/ITodo";
import { v4 as uuidv4 } from 'uuid';
import { Socket } from "socket.io-client";

class NewCardService {

    _id: string = '';
    message: string = '';
    todos: ITodo[] = [];
    socket: Socket = {} as Socket;

    constructor(_id: string, message: string, todos: ITodo[], socket: Socket) {
        this.message = message;
        this.todos = todos;
        this._id = _id;
        this.socket = socket;
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
    setTodoMessage(message: string, id?: string) {
        const todo = this.todos.find(todo => todo._id === id);
        if (todo) {
            todo.message = message
        }
    }

    postCard() {
        try {
            if (this.message.length > 0) {
                this.socket.emit('PostCard', { card: { message: this.message, todos: this.todos } });
                this.clearCard();
            }
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    editCard() {
        try {
            this.socket.emit('EditCard', { card: { _id: this._id, message: this.message, todos: this.todos } });
            this.clearCard();
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    
}

export default NewCardService;