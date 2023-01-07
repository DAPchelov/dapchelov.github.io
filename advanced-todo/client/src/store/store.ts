import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { ITodo } from "../models/ITodo";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import TodoService from "../services/TodoService";
class Store {
    
    user: IUser = {} as IUser;
    todos: [ITodo] = {} as [ITodo];

    isAuth: boolean = false;
    isLoading: boolean = false;

    isCompletedDisplayMode: boolean | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
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
    setCheckTodo(todoId: string, isCompleted: boolean) {
        let todo = this.todos.find(todo => todo._id === todoId);
            if (todo) {
                todo.isCompleted = isCompleted;
            }
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
        try {
            const response = await TodoService.getTodos();
            this.setTodos(response.data.todos);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkTodo(todoId: string, isCompleted: boolean) {
        try {
            await TodoService.checkTodo(todoId, isCompleted);
            this.setCheckTodo(todoId, isCompleted);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }

    }

    async postTodo(todoMessage: string) {
        try {
            await TodoService.postTodo(todoMessage);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeCompletedTodos() {
        try {
            await TodoService.removeCompletedTodos();
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeOneTodo(todoId: string) {
        try {
            await TodoService.removeOneTodo(todoId);
        } catch(e: any) {
            console.log(e.response?.data?.message);
        }
    }
}

export default Store;