import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { ITodo } from "../models/ITodo";

interface ITodos {
    todos: [ITodo],
}

class UserService {
    static async getUser(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/user');
    }
    static async getTodos(): Promise<AxiosResponse<ITodos>> {
        return $api.get<ITodos>('/todos');
    }
    static async checkTodo(todoId: string, isCompleted: boolean): Promise<void> {
        return $api.post('/setcompleted', { todoId, isCompleted });
    }
}

export default UserService;