import { IOType } from 'child_process';
import { makeAutoObservable, makeObservable, observable, override } from 'mobx';
import { io } from 'socket.io-client';
import { ICard } from '../models/ICard';
import { IUser } from '../models/IUser';
import AuthService from '../services/AuthService';
import CardService from '../services/CardService';
import NewCardService from '../services/NewCardService';
import TodoService from '../services/TodoService';
import WSConnection from './WSConnection';

class Store {
    socket: WSConnection = new WSConnection(); //WTF?

    // private user: IUser = this.socket.getUser();
    // private cards: [ICard] = this.socket.getCards();
    // private isAuth: boolean = this.socket.getIsAuth();

    private isLoading: boolean = false;
    private isCardsLoading: boolean = true;

    private isCompletedDisplayMode: boolean | undefined = undefined;

    newCard: NewCardService = new NewCardService();

    constructor() {
        // makeObservable(this.socket, {
        //     user: observable,
        //     cards: observable,
        //     isAuth: observable
        // })
        makeAutoObservable(this);
    }

    getSocket() {
        return (this.socket);
    }

    async createSocket() {
        this.socket = new WSConnection();
    }

    // async Login(email: string, password: string) {
    //     authController.login(email, password).then((isSuccessAuth)=>{
    //         isSuccessAuth && socket.emit('GetUser');
    //     })
    // }

    getIsAuth() {
        return this.socket.isAuth
    }
    getUser() {
        return this.socket.user
    }
    getIsLoading() {
        return this.isLoading
    }
    getIsCardsLoading() {
        return this.isCardsLoading
    }
    getCards() {
        return this.socket.cards
    }
    getIsCompletedDisplayMode() {
        return this.isCompletedDisplayMode
    }

    setIsAuth(bool: boolean) {
        localStorage.setItem('isAuth', bool.toString()) //delete this!
        this.socket.isAuth = bool;
    }
    setUser(user: IUser) {
        this.socket.user = user;
    }
    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setIsCardsLoading(bool: boolean) {
        this.isCardsLoading = bool;
    }
    setCards(cards: [ICard]) {
        this.socket.cards = cards;
    }
    setIsCompletedDisplayMode(mode: boolean | undefined) {
        this.isCompletedDisplayMode = mode;
    }
    setCheckCard(cardId: string, isCompleted: boolean) {
        let card = this.socket.cards.find(card => card._id === cardId);
        if (card) {
            card.isCompleted = isCompleted;
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setIsAuth(false);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    //REST LEGACY
    // async receiveUser() {
    //     try {
    //         const response = await UserService.getUser();
    //         this.setUser(response.data);
    //     } catch (e: any) {
    //         console.log(e.response?.data?.message);
    //     }
    // }

    // async receiveCards() {
    //     this.setIsCardsLoading(true);
    //     try {
    //         await CardService.getCards().then((response) => {
    //             this.setCards(response.data.cards);
    //         });

    //     } catch (e: any) {
    //         console.log(e.response?.data?.message);
    //     }
    //     this.setIsCardsLoading(false);
    // }

    // async pullCards() {
    //     try {
    //         await CardService.getCards().then((response) => {
    //             this.setCards(response.data.cards);
    //         });

    //     } catch (e: any) {
    //         console.log(e.response?.data?.message);
    //     }
    // }

    async checkCard(cardId: string, isCompleted: boolean) {
        try {
            await CardService.checkCard(cardId, isCompleted);
            this.setCheckCard(cardId, isCompleted);
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
        // this.pullCards();
    }

    async checkTodo(cardId: string, todoId: string) {
        try {
            await TodoService.checkTodo(cardId, todoId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        // this.pullCards();

    }
}

// export { socket };
export default Store;