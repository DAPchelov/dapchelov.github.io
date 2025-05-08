import { io } from '../index.js';
import WsUsersController from '../controllers/wsUsersController.js';
import WsCardController from '../controllers/wsCardController.js';
import WsGroupController from '../controllers/wsGroupController.js';
import WsDocController from '../controllers/wsDocController.js';

import tokenService from "../service/token-service.js";
import WsAuthController from '../controllers/wsAuthController.js';
import WsUserController from '../controllers/wsUserController.js';


// const validateUser = (socket, token) => {
//     const user = tokenService.validateAccessToken(token);
//     console.log(user);
//     if (!user) {
//         // if socket not valid (user === null) do logout user
//         // socket.emit('TakeAuth', null);
//         return null;
//     }
//     return user;
// }

const WsRouter = () => {
    io.on('connection', socket => {
            const wsAuthController = new WsAuthController(socket);

            const wsUserController = WsUserController(socket);
            const wsUsersCotrol = WsUsersController(socket);
            const wsCardCotrol = WsCardController(socket);
            const wsGroupControl = WsGroupController(socket);
            const wsDocControl = WsDocController(socket);
        
    });
}

export default WsRouter;
