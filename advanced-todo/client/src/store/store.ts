import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { ITodo } from "../models/ITodo";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import TodoService from "../services/TodoService";
class Store {

    private user: IUser = {} as IUser;
    private todos: [ITodo] = {} as [ITodo];

    private isAuth: boolean = false;
    private isLoading: boolean = false;
    private isTodosLoading: boolean = false;

    private isCompletedDisplayMode: boolean | undefined = undefined;

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
    getIsTodosLoading() {
        return this.isTodosLoading
    }
    getTodos() {
        return this.todos
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
    setIsTodosLoading(bool: boolean) {
        this.isTodosLoading = bool;
    }
    setTodos(todos: [ITodo]) {
        this.todos = todos;
    }
    setIsCompletedDisplayMode(mode: boolean | undefined) {
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
            this.setIsLoading(true);
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.receiveTodos();
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
            this.receiveTodos();
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
            this.setTodos({} as [ITodo]);
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

    async receiveTodos() {
        try {
            this.setIsTodosLoading(true);
            await TodoService.getTodos().then((response) => {
                this.setTodos(response.data.todos);
                this.setIsTodosLoading(false);
            });

        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async pullTodos() {
        try {
            await TodoService.getTodos().then((response) => {
                this.setTodos(response.data.todos);
            });

        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkTodo(todoId: string, isCompleted: boolean) {
        try {
            await TodoService.checkTodo(todoId, isCompleted);
            this.setCheckTodo(todoId, isCompleted);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }

    }

    async postTodo(todoMessage: string) {
        try {
            await TodoService.postTodo(todoMessage);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeCompletedTodos() {
        try {
            await TodoService.removeCompletedTodos();
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async removeOneTodo(todoId: string) {
        try {
            await TodoService.removeOneTodo(todoId);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }
}

export default Store;