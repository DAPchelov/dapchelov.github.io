import userService from '../service/user-service.js';

const WsUsersController = (socket) => {
        socket.on('ReceiveAllUsers', (data) => {
            data.userId && userService.getAllUsers().then((data) => {
                socket.emit('TakeAllUsers', data);
            });
        });
}

export default WsUsersController;