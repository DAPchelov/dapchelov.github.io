import { io } from '../index';
import tokenService from "../service/token-service";
import cardService from "../service/card-service";

const WsController = () => {
    io.on('connection', socket => {
        socket.emit('TakeAuth', tokenService.validateAccessToken(socket.handshake.auth.token));

        socket.on('GetAuth', (data) => {
            let user = tokenService.validateAccessToken(data.token);
            // console.log('TakeAuth!', 'user:', userToken);
            socket.emit('TakeAuth', user);
        });
        socket.on('GetCards', (data) => {
            let user = tokenService.validateAccessToken(data.token);            
            if (user) {
                cardService.getUserCards(user._id).then((data) => {
                    // console.log('TakeCards!', 'cards:', data);
                    socket.emit('TakeCards', data);
                });
            } else {
                // if socket not valid (user === null) do logout user
                socket.emit('TakeAuth', null);
            }
        });
    });
}

export default WsController;