import { io } from '../index.js';
import WsUsersController from '../controllers/wsUsersController.js';
import WsCardController from '../controllers/wsCardController.js';
import WsGroupController from '../controllers/wsGroupController.js';
import WsDocController from '../controllers/wsDocController.js';

import tokenService from "../service/token-service.js";

const validateUser = (socket, token) => {
    const user = tokenService.validateAccessToken(token);
    if (!user) {
        // if socket not valid (user === null) do logout user
        socket.emit('TakeAuth', null);
        return null;
    }
    return user;
}

const WsRouter = () => {
    io.on('connection', socket => {
        let user = validateUser(socket, socket.handshake.auth.token);

        const wsUsersCotrol = WsUsersController(socket, user);
        const wsCardCotrol = WsCardController(socket, user);
        const wsGroupControl = WsGroupController(socket, user);
        const wsDocControl = WsDocController(socket, user);
    });
}

export default WsRouter;
