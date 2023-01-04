import axios from "axios";
import { makeAutoObservable, observable } from "mobx";
import { observer } from "mobx-react-lite";
import { API_URL } from "../http";
import { ITodo } from "../models/ITodo";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

class Store {
    
    user: IUser = {} as IUser;
    @observable todos: [ITodo] = {} as [ITodo];
    isAuth: boolean = false;
    isLoading: boolean = false;

    isCompletedDisplayMode: boolean | undefined = undefined;

    constructor() {
        makeAutoObservable(this, {}, {deep: true});
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    setUser(user: IUser) {
        this.user = user;
    }
    setLoading(bool: boolean) {
        this.isLoading = bool;
    }
    setTodos(todos:[ITodo]) {
        this.todos = todos;
    }
    setIsCompletedDisplayMode (mode: boolean | undefined) {
        this.isCompletedDisplayMode = mode;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout;
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);

        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }

        this.setLoading(false);
    }

    async receiveTodos() {
        this.setLoading(true);
        try {
            const response = await UserService.getTodos();
            this.setTodos(response.data.todos);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }

        this.setLoading(false);
    }

    async checkTodo(todoId: string, isCompleted: boolean) {
        try {
            await UserService.checkTodo(todoId, isCompleted);
            let todo = this.todos.find(todo => todo._id === todoId);
            if (todo) {
                todo.isCompleted = isCompleted;
            }
            // this.setTodos(response.data);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }
}

export default Store;