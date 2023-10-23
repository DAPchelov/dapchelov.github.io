import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';
import { ICard } from '../models/ICard';
import { IUser } from '../models/IUser';
import NewCardController from './NewCardController';

import AuthService from '../services/AuthService';

class WSStore {
    private token: string | null = localStorage.getItem('token');

    private socket = io('http://pchel.ddns.net:5000/', {
        auth: {
            token: this.token
        }
    });

    private user: IUser = {} as IUser;
    private cards: [ICard] = {} as [ICard];
    private isAuth: boolean = localStorage.getItem('isAuth') === 'true';
    private isCompletedDisplayMode: boolean | undefined = undefined;

    newCard: NewCardController = new NewCardController('', '', [], this.socket);

    constructor() {
        this.socket.on('TakeAuth', async (data) => {

            if (data !== null) {
                this.setUser(data);
                localStorage.setItem('isAuth', 'true');
                this.setIsAuth(true);
            } else {
                localStorage.setItem('isAuth', 'false');
                this.setIsAuth(false);

                AuthService.refresh().then((response) => {
                    localStorage.setItem('token', response.data.accessToken);
                    this.setToken(response.data.accessToken);

                    this.getAuth();
                });
            }
        });

        this.socket.on('TakeCards', (data) => {
            this.setCards(data.cards);
        })
        makeAutoObservable(this);
    }

    setUser(user: IUser) {
        this.user = user;
    }
    setCards(cards: [ICard]) {
        this.cards = cards;
    }
    setIsAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }
    setToken(token: string | null) {
        this.token = token;
    }
    setIsCompletedDisplayMode(mode: boolean | undefined) {
        this.isCompletedDisplayMode = mode;
    }

    getUser() {
        return this.user
    }
    getCards() {
        return this.cards
    }
    getIsAuth() {
        return this.isAuth
    }
    getIsCompletedDisplayMode() {
        return this.isCompletedDisplayMode
    }

    async getAuth() {
        this.socket.emit('GetAuth', { token: this.token });
    }
    async receiveCards() {
        this.socket.emit('GetCards', { token: this.token });
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

    editCard(_id: string) {
        const editableCard = this.cards.find((card) => card._id === _id);
        if (editableCard) {
            this.newCard = new NewCardController(editableCard._id, editableCard.message, editableCard.todos, this.socket)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.setItem('isAuth', 'false');
            this.setIsAuth(false);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async refreshAuth() {
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeCompletedCards() {
        try {
            this.socket.emit('RemoveCompletedCards');
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkCard(cardId: string, isCompleted: boolean) {
        try {
            this.socket.emit('CheckCard', { card: { _id: cardId, isCompleted: isCompleted } });
            this.setCheckCard(cardId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeOneCard(cardId: string) {
        try {
            this.socket.emit('RemoveOneCard', { card: { _id: cardId } });
            this.receiveCards();
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkTodo(cardId: string, todoId: string) {
        try {
            this.socket.emit('CheckTodo', { card: { _id: cardId }, todo: { _id: todoId } });
            this.setCheckTodo(cardId, todoId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
};
export default WSStore;