import userService from '../service/user-service.js';

const WsUserController = (socket) => {
    
        socket.on('GetUserData', (userId) => {
            userService.getUser(userId).then((user) => {
                socket.emit('TakeUserData', user);
            });
        });
}

export default WsUserController;