import tokenService from "../service/token-service.js";
import userService from '../service/user-service.js';

const WsUsersController = (socket, user) => {
    
        socket.emit('TakeAuth', user);

        socket.on('GetAuth', (data) => {
            user = tokenService.validateAccessToken(data.token);
            user && userService.setSocketId(user._id, socket.id);
            socket.emit('TakeAuth', user);
        });
        socket.on('ReceiveAllUsers', () => {
            user && userService.getAllUsers().then((data) => {
                socket.emit('TakeAllUsers', data);
            });
        });
}

export default WsUsersController;