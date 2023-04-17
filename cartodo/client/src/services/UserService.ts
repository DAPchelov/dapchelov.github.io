import $api, { API_URL } from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

class AuthService {
    static async getUser(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>(`${API_URL}/user`, { withCredentials: true });
    }
}

export default AuthService;