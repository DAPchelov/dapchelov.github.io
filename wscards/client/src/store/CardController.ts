import { makeAutoObservable } from "mobx";
import { ITodo } from "../models/ITodo";
import { v4 as uuidv4 } from 'uuid';
import { Socket } from "socket.io-client";
import { ICard } from "../models/ICard";

class NewCardController {

    _id: string = '';
    message: string = '';
    todos: ITodo[] = [];
    isCompleted: boolean = false;
    cards: [ICard] = {} as [ICard];

    socket: Socket = {} as Socket;

    constructor(socket: Socket) {

        this.socket = socket;

        this.socket.on('TakeCards', (data) => {
            this.cards = data.cards;
        })

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

    postCard(groupId: string) {
        if (this.message.length > 0) {
            this.socket.emit('PostCard', { card: { message: this.message, todos: this.todos }, groupId });
            this.clearCard();
        }
    }

    editCard(groupId: string) {
        try {
            this.socket.emit('EditCard', { card: { _id: this._id, message: this.message, todos: this.todos }, groupId });
            this.clearCard();
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    setCheckCard(cardId: string) {
        let card = this.cards.find(card => card._id === cardId);
        if (card) {
            card.isCompleted = !card.isCompleted;
        }
    }
    setCheckTodo(cardId: string, todoId: string) {
        let card = this.cards.find(card => card._id === cardId);
        let todo = card?.todos.find(todo => todo._id === todoId);
        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    }
    redactCard(_id: string) {
        const editableCard = this.cards.find((card) => card._id === _id);
        if (editableCard) {
            this._id = editableCard._id;
            this.message = editableCard.message;
            this.todos = editableCard.todos;
            this.isCompleted = editableCard.isCompleted;
        }
    }
    async checkCard(cardId: string, isCompleted: boolean, groupId: string) {
        this.socket.emit('CheckCard', { card: { _id: cardId, isCompleted: isCompleted }, groupId });
        this.setCheckCard(cardId);
    }

    async checkCardTodo(cardId: string, todoId: string, groupId: string) {
        this.socket.emit('CheckTodo', { card: { _id: cardId }, todo: { _id: todoId }, groupId });
        this.setCheckTodo(cardId, todoId);
    }

    async removeCompletedCards(groupId: string) {
        this.socket.emit('RemoveCompletedCards', { groupId });
    }

    async removeOneCard(cardId: string, groupId: string) {
        this.socket.emit('RemoveOneCard', { card: { _id: cardId }, groupId });
    }
}

export default NewCardController;