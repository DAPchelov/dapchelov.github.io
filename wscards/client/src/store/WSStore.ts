import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';
import { ICard } from '../models/ICard';
import { IUser } from '../models/IUser';
import { IGroup } from '../models/IGroup';

import NewCardController from './NewCardController';
import NewGroupController from './NewGroupController';

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
    private allUserGroups: [IGroup] = {} as [IGroup];
    private currentGroupId: string = this.user._id;

    newCard: NewCardController = new NewCardController('', '', [], this.socket);
    newGroup: NewGroupController = new NewGroupController(this.socket, '', '', []);

    constructor() {
        this.socket.on('TakeAuth', async (data) => {

            if (data !== null) {
                this.setUser(data);
                localStorage.setItem('isAuth', 'true');
                this.getBasicState();
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
        // this.socket.on('TakeUserLoggedInGroups', (data) => {
        //     this.setLoggedInGroups(data);
        // })
        this.socket.on('TakeUserAllGroups', (data) => {
            this.setAllUserGroups(data);
        })

        makeAutoObservable(this);
    }

    async getBasicState() {
        await this.receiveGroupCards(this.getUser()._id);
        await this.receiveUserAllGroups();
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
    // setLoggedInGroups(groups: [IGroup]) {
    //     this.loggedInGroups = groups;
    // }
    setCurrentGroupId(id: string) {
        this.currentGroupId = id;
    }
    setAllUserGroups(groups: [IGroup]) {
        this.allUserGroups = groups;
    }

    getUser() {
        return this.user;
    }
    getCards() {
        return this.cards;
    }
    getIsAuth() {
        return this.isAuth;
    }
    getIsCompletedDisplayMode() {
        return this.isCompletedDisplayMode;
    }
    // getLoggedInGroups() {
    //     return this.loggedInGroups;
    // }
    getCurrentGroupId() {
        return this.currentGroupId;
    }
    getAllUserGroups() {
        return this.allUserGroups;
    }

    async getAuth() {
        this.socket.emit('GetAuth', { token: this.token });
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
    editGroup(_id: string) {
        const editableGroup = this.allUserGroups.find((group) => group._id === _id);
        if (editableGroup) {
            this.newGroup = new NewGroupController(this.socket, editableGroup.label, editableGroup.ownerId, editableGroup.users);
            // this.newCard = new NewCardController(editableCard._id, editableCard.message, editableCard.todos, this.socket)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setToken(null);
            localStorage.setItem('isAuth', 'false');
            this.setIsAuth(false);
            this.newGroup.clearForm();
            this.socket.close();
            this.socket.open();
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

    async removeCompletedCards(groupId: string) {
        try {
            this.socket.emit('RemoveCompletedCards', { groupId });
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkCard(cardId: string, isCompleted: boolean, groupId: string) {
        try {
            this.socket.emit('CheckCard', { card: { _id: cardId, isCompleted: isCompleted }, groupId });
            this.setCheckCard(cardId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeOneCard(cardId: string, groupId: string) {
        try {
            this.socket.emit('RemoveOneCard', { card: { _id: cardId }, groupId });
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkTodo(cardId: string, todoId: string, groupId: string) {
        try {
            this.socket.emit('CheckTodo', { card: { _id: cardId }, todo: { _id: todoId }, groupId });
            this.setCheckTodo(cardId, todoId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async createNewGroup(label: string) {
        try {
            this.socket.emit('CreateNewGroup', { label: label });
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    // async ReceiveUserLoggedInGroups() {
    //     try {
    //         this.socket.emit('ReceiveUserLoggedInGroups');
    //     } catch (e: any) {
    //         console.log(e.response?.data?.message);
    //     }
    // }
    async receiveUserAllGroups() {
        try {
            this.socket.emit('ReceiveUserAllGroups');
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
    async receiveGroupCards(groupId: string) {
        try {
            this.socket.emit('GetCards', { groupId });
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
};
export default WSStore;