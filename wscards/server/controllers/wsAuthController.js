import userService from "../service/user-service.js";


class WsAuthController {
    constructor(socket) {

        socket.on('Registration', async (registrationData) => {
            const { login, password } = registrationData;
            const userData = await userService.registration(login, password);
            const authData = {
                isAuth: userData.isAuth,
                userId: userData.userId,
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
            }
            socket.emit('TakeAuth', authData);
        })

        socket.on('Login', async (loginData) => {
            const { login, password } = loginData;
            const userData = await userService.login(login, password);
            const authData = {
                isAuth: userData.isAuth,
                userId: userData.userId,
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
            }
            socket.emit('TakeAuth', authData);
        })

        socket.on('RefreshAuth', async (refreshData) => {
            const userData = await userService.refresh(refreshData.refreshToken);
            const authData = {
                isAuth: userData.isAuth,
                userId: userData.userId,
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
            }
            socket.emit('TakeAuth', authData);
        })

        socket.on('Logout', async (refreshToken) => {
            const userData = await userService.logout(refreshToken);
            const authData = {
                isAuth: userData.isAuth,
                userId: userData.userId,
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
            }
            socket.emit('TakeAuth', authData);
        })
    }
}

export default WsAuthController;