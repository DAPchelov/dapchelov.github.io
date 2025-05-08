import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';


export const API_URL = 'http://pchel.ddns.net:5000/api';

// const $api = axios.create({
//     withCredentials: true,
//     baseURL: API_URL
// })

// $api.interceptors.request.use((config) => {
//     config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
//     return config;
// })

// $api.interceptors.response.use((config) => {
//     return config;
// }, (async error => {
//     const originalRequest = error.config;
    
//     if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
//             localStorage.setItem('token', response.data.accessToken);
//             return $api.request(originalRequest);
//         } catch (e: any) {
//             if (e.response.status === 419) {
//                 localStorage.setItem("isAuth", "false");
//                 console.log('Время токена авторизации истекло');
//             }
//             console.log('Не авторзован');
//         }
//     }
//     throw error;
// }))

// export default $api;