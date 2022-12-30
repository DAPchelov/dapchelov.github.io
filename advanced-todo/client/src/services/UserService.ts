import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { ITodo } from "../models/ITodo";

class UserService {
    static async fetchUser(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/user');
    }
    static async fetchTodos(): Promise<AxiosResponse<[ITodo]>> {
        return $api.get<[ITodo]>('/todos');
    }
}

export default UserService;