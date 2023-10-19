import { io } from '../index';
import tokenService from "../service/token-service";
import cardService from "../service/card-service";

const validateUser = (socket, token) => {
    const user = tokenService.validateAccessToken(token);
    if (!user) {
        // if socket not valid (user === null) do logout user
        socket.emit('TakeAuth', null);
        return null;
    }
    return user;
}

const WsController = () => {
    io.on('connection', socket => {
        socket.emit('TakeAuth', validateUser(socket, socket.handshake.auth.token));

        socket.on('GetAuth', (data) => {
            let user = tokenService.validateAccessToken(data.token);
            socket.emit('TakeAuth', user);
        });
        socket.on('GetCards', (data) => {
            let user = validateUser(socket, data.token);
            user && cardService.getUserCards(user._id).then((data) => {
                socket.emit('TakeCards', data);
            });
        });
    });
}

export default WsController;