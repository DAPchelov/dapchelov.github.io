import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

class UserService {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }
}

export default UserService;