import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

class UserService {
    static async fetchUser(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/user');
    }
    static async fetchTodos(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/user');
    }
}

export default UserService;