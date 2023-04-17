import $api, { API_URL } from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse> {
        return $api.post<AuthResponse>(`${API_URL}/login`, { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse> {
        return $api.post<AuthResponse>(`${API_URL}/registration`, { email, password });
    }

    static async logout(): Promise<void> {
        return $api.post(`${API_URL}/logout`);
    }

    static async refresh(): Promise<AxiosResponse> {
        return await $api.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
    }
}

export default AuthService;