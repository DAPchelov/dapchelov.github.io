import AuthService from '../services/AuthService';

class authController {

    async login(email: string, password: string) {
        try {
            await AuthService.login(email, password).then((response) => {
                localStorage.setItem('token', response.data.accessToken);
            })
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }

    }

    async registration(email: string, password: string) {
        try {
            await AuthService.registration(email, password).then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                // localStorage.setItem('isAuth', 'true');
            });
        } catch (e: any) {
            console.log(e.response?.data?.message);
            // localStorage.setItem('isAuth', 'false');
        }
    }
}

export default new authController