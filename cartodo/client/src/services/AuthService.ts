import $api, { API_URL } from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${API_URL}/login`, { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${API_URL}/registration`, { email, password });
    }

    static async logout(): Promise<void> {
        return $api.post(`${API_URL}/logout`);
    }
}

export default AuthService;