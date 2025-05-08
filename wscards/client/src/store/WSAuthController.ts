import { makeAutoObservable } from 'mobx';
import { io } from 'socket.io-client';

class WSAuthController {
    private accessToken: string | null = localStorage.getItem('accessToken');
    private refreshToken: string | null = localStorage.getItem('refreshToken');

    isAuth: boolean = false;
    userId: string = '';
    login: string = '';
    password: string = '';

    socket = io('http://pchel.ddns.net:5000/', {
        auth: {
            token: this.accessToken
        }
    });

    constructor() {

        this.socket.emit('RefreshAuth', { refreshToken: this.refreshToken });

        this.socket.on('TakeAuth', (authData: { isAuth: boolean, userId: string, accessToken: string, refreshToken: string }) => {
            this.isAuth = authData.isAuth;
            this.userId = authData.userId
            this.accessToken = authData.accessToken;
            this.refreshToken = authData.refreshToken;
            localStorage.setItem('accessToken', authData.accessToken);
            localStorage.setItem('refreshToken', authData.refreshToken);
            this.socket.close();
            this.socket.open();
        })
        makeAutoObservable(this);
    }

    doLogin() {
        this.socket.emit('Login', { login: this.login, password: this.password });
    }
    doLogout() {
        this.socket.emit('Logout');
    }
    doRegistration() {
        this.socket.emit('Registration', { login: this.login, password: this.password });
    }
    getUserData() {
        this.socket.emit('GetUserData', this.userId)
    }
};
export default WSAuthController;