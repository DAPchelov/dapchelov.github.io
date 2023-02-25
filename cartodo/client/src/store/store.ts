import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { ICard } from "../models/ICard";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import CardService from "../services/CardService";
import NewCardService from "../services/NewCardService";
class Store {

    private user: IUser = {} as IUser;
    private cards: [ICard] = {} as [ICard];

    private isAuth: boolean = false;
    private isLoading: boolean = false;
    private isCardsLoading: boolean = false;

    private isCompletedDisplayMode: boolean | undefined = undefined;

    newCard: NewCardService = new NewCardService();

    constructor() {
        makeAutoObservable(this);
    }

    getIsAuth() {
        return this.isAuth
    }
    getUser() {
        return this.user
    }
    getIsLoading() {
        return this.isLoading
    }
    getIsCardsLoading() {
        return this.isCardsLoading
    }
    getCards() {
        return this.cards
    }
    getIsCompletedDisplayMode() {
        return this.isCompletedDisplayMode
    }

    setIsAuth(bool: boolean) {
        this.isAuth = bool;
    }
    setUser(user: IUser) {
        this.user = user;
    }
    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setIsCardsLoading(bool: boolean) {
        this.isCardsLoading = bool;
    }
    setCards(cards: [ICard]) {
        this.cards = cards;
    }
    setIsCompletedDisplayMode(mode: boolean | undefined) {
        this.isCompletedDisplayMode = mode;
    }
    setCheckCard(cardId: string, isCompleted: boolean) {
        let card = this.cards.find(card => card._id === cardId);
        if (card) {
            card.isCompleted = isCompleted;
        }
    }

    async login(email: string, password: string) {
        try {
            this.setIsLoading(true);
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.receiveCards();
            this.setUser(response.data.user);
            this.setIsAuth(true);
            this.setIsLoading(false);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.receiveCards();
            this.setUser(response.data.user);
            this.setIsAuth(true);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout;
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser({} as IUser);
            this.setCards({} as [ICard]);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setIsLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
        this.setIsLoading(false);
    }

    async receiveCards() {
        try {
            this.setIsCardsLoading(true);
            await CardService.getCards().then((response) => {
                this.setCards(response.data.cards);
                this.setIsCardsLoading(false);
            });

        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async pullCards() {
        try {
            await CardService.getCards().then((response) => {
                this.setCards(response.data.cards);
            });

        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

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
}

export default Store;