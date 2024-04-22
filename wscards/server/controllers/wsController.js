import { io } from '../index.js';
import tokenService from "../service/token-service.js";
import cardService from "../service/card-service.js";
import todoService from "../service/todo-service.js";
import groupService from "../service/group-service.js"
import userService from '../service/user-service.js';

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
            user && userService.setSocketId(user._id, socket.id);
            socket.emit('TakeAuth', user);
        });
        socket.on('GetCards', (data) => {
            console.log('GetCards groupId: ' + data.groupId);
            let groupId = data.groupId;
            if (groupId === undefined) {
                // console.log('GroupId Changed!');
                groupId = user._id;
            }
            user && cardService.getUserCards(groupId).then((data) => {
                socket.emit('TakeCards', data);
            });
        });
        socket.on('PostCard', (data) => {
            const card = data.card;
            user && cardService.postNewCard(user._id, card.message, card.todos).then(takeCards(socket, user));
        });
        socket.on('EditCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            user && cardService.editCard(groupId, card._id, card.message, card.todos).then(takeCards(socket, user));
        });
        socket.on('RemoveCompletedCards', () => {
            user && cardService.removeCompletedCards(user._id).then(takeCards(socket, user));
        });
        socket.on('CheckCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            user && cardService.checkCard(groupId, card._id, card.isCompleted);
        });
        socket.on('RemoveOneCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            user && cardService.removeOneCard(groupId, card._id).then(takeCards(socket, user));
        });
        socket.on('CheckTodo', (data) => {
            const card = data.card;
            const todo = data.todo;
            const groupId = data.groupId;
            user && todoService.checkTodo(groupId, card._id, todo._id);
        });
        socket.on('CreateNewGroup', (data) => {
            try {
                user && groupService.createNewGroup(data.label, user._id, data.users);
            } catch (error) {
                console.log(error);
            }

        });
        socket.on('ReceiveAllUsers', () => {
            user && userService.getAllUsers().then((data) => {
                socket.emit('TakeAllUsers', data);
            });
        });
        socket.on('ReceiveUserLoggedInGroups', () => {
            user && groupService.getUserLoggedInGroups(user._id).then((data) => {
                socket.emit('TakeUserLoggedInGroups', data);
            });
        });
    });
}

export default WsController;