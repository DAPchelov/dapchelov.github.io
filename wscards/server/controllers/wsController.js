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
const takeCards = (socket, groupId) => {
    cardService.getUserCards(groupId).then((data) => {
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
            let groupId = data.groupId;
            user && cardService.getUserCards(groupId).then((data) => {
                socket.emit('TakeCards', data);
            });
            console.log('GetCards groupId: ' + groupId);
        });
        socket.on('PostCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            user && cardService.postNewCard(groupId, card.message, card.todos).then(takeCards(socket, groupId));
        });
        socket.on('EditCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            user && cardService.editCard(groupId, card._id, card.message, card.todos).then(takeCards(socket, groupId));
        });
        socket.on('RemoveCompletedCards', (data) => {
            const groupId = data.groupId;
            user && cardService.removeCompletedCards(groupId).then(takeCards(socket, groupId));
        });
        socket.on('CheckCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            user && cardService.checkCard(groupId, card._id, card.isCompleted);
        });
        socket.on('RemoveOneCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            user && cardService.removeOneCard(groupId, card._id).then(() => {
                takeCards(socket, groupId)
            });
        });
        socket.on('CheckTodo', (data) => {
            const card = data.card;
            const todo = data.todo;
            const groupId = data.groupId;
            user && todoService.checkTodo(groupId, card._id, todo._id);
        });
        socket.on('CreateNewGroup', (data) => {
            try {
                console.log(data.ownerId + '' + data.label);
                user && groupService.createNewGroup(data.label, data.ownerId, data.users);
            } catch (error) {
                console.log(error);
            }
        });
        socket.on('EditGroup', (data) => {
            try {
                user && groupService.editGroup(data._id, data.label, data.ownerId, data.users);
            } catch (error) {
                console.log(error);
            }
        });
        socket.on('DeleteGroup', (data) => {
            try {
                user && groupService.deleteGroup(data._id);
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
        socket.on('ReceiveUserAllGroups', () => {
            user && groupService.getUserAllGroups(user._id).then((data) => {
                socket.emit('TakeUserAllGroups', data);
            });
        });
    });
}

export default WsController;