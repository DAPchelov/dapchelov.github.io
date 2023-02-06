import $api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
class UserService {
    static async getUser(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/user');
    }
}

export default UserService;