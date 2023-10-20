import { io } from '../index';
import tokenService from "../service/token-service";
import cardService from "../service/card-service";
import todoService from "../service/todo-service";

const validateUser = (socket, token) => {
    const user = tokenService.validateAccessToken(token);
    if (!user) {
        // if socket not valid (user === null) do logout user
        socket.emit('TakeAuth', null);
        return null;
    }
    return user;
}
const takeCards = (socket, user) => {
    cardService.getUserCards(user._id).then((data) => {
        socket.emit('TakeCards', data);
    });
}

const WsController = () => {
    io.on('connection', socket => {
        let user = validateUser(socket, socket.handshake.auth.token);
        socket.emit('TakeAuth', user);

        socket.on('GetAuth', (data) => {
            user = tokenService.validateAccessToken(data.token);
            socket.emit('TakeAuth', user);
        });
        socket.on('GetCards', (data) => {
            const user = validateUser(socket, data.token);
            user && cardService.getUserCards(user._id).then((data) => {
                socket.emit('TakeCards', data);
            });
        });
        socket.on('PostCard', (data) => {
            const card = data.card;
            user && cardService.postNewCard(user._id, card.message, card.todos).then(takeCards(socket, user));
        });
        socket.on('EditCard', (data) => {
            const card = data.card;
            user && cardService.editCard(user._id, card._id, card.message, card.todos).then(takeCards(socket, user));
        });
        socket.on('RemoveCompletedCards', () => {
            user && cardService.removeCompletedCards(user._id).then(takeCards(socket, user));
        });
        socket.on('CheckCard', (data) => {
            const card = data.card;
            user && cardService.checkCard(user._id, card._id, card.isCompleted);
        });
        socket.on('RemoveOneCard', (data) => {
            const card = data.card;
            user && cardService.removeOneCard(user._id, card._id).then(takeCards(socket, user));
        });
        socket.on('CheckTodo', (data) => {
            const card = data.card;
            const todo = data.todo;
            user && todoService.checkTodo(user._id, card._id, todo._id);
        });
    });
}

export default WsController;