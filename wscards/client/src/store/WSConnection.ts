import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';
import { ICard } from '../models/ICard';
import { IUser } from '../models/IUser';
import NewCardService from '../services/NewCardService';

import AuthService from '../services/AuthService';
import CardService from '../services/CardService';
import TodoService from '../services/TodoService';


class WSConnection {
    private token: string | null = localStorage.getItem('token');

    private socket = io('http://pchel.ddns.net:5000/', {
        auth: {
            token: this.token
        }
    });

    user: IUser = {} as IUser;
    cards: [ICard] = {} as [ICard];
    isAuth: boolean = localStorage.getItem('isAuth') === 'true';
    private isCompletedDisplayMode: boolean | undefined = undefined;

    newCard: NewCardService = new NewCardService();

    constructor() {
        this.socket.on('TakeAuth', async (data) => {
            
            if (data !== null) {
                this.setUser(data);
                console.log('Success Auth!', data);
                localStorage.setItem('isAuth', 'true');
                this.setIsAuth(true);
            } else {
                console.log('Auth not successful!');
                localStorage.setItem('isAuth', 'false');
                this.setIsAuth(false);

                const response = await AuthService.refresh();
                localStorage.setItem('token', response.data.accessToken);
                this.setToken(response.data.accessToken);

                this.getAuth();
                this.getCards();
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

    async checkCard(cardId: string, isCompleted: boolean) {
        try {
            await CardService.checkCard(cardId, isCompleted);
            this.setCheckCard(cardId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }

    }

    async postCard(cardMessage: string) {
        try {
            await CardService.postCard(cardMessage);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeCompletedCards() {
        try {
            await CardService.removeCompletedCards();
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeOneCard(cardId: string) {
        try {
            await CardService.removeOneCard(cardId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeTodo(cardId: string, todoId: string) {
        try {
            await TodoService.removeTodo(cardId, todoId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkTodo(cardId: string, todoId: string) {
        try {
            await TodoService.checkTodo(cardId, todoId);
            this.setCheckTodo(cardId, todoId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
};
export default WSConnection;