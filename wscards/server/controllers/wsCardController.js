import cardService from "../service/card-service.js";
import todoService from "../service/todo-service.js";

const takeCards = (socket, groupId) => {
    cardService.getGroupCards(groupId).then((data) => {
        socket.emit('TakeCards', data);
    });
}

const WsCardController = (socket) => {

        socket.on('GetCards', (data) => {
            const groupId = data.groupId;
            console.log('GetCards groupId: ' + groupId);
            groupId && cardService.getGroupCards(groupId).then((data) => {
                socket.emit('TakeCards', data);
            });
        });
        socket.on('PostCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            groupId && cardService.postNewCard(groupId, card.message, card.todos).then(() => {
                takeCards(socket, groupId)
            });
        });
        socket.on('EditCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            groupId && cardService.editCard(groupId, card._id, card.message, card.todos).then(() => {
                takeCards(socket, groupId)
            });
        });
        socket.on('RemoveCompletedCards', (data) => {
            const groupId = data.groupId;
            groupId && cardService.removeCompletedCards(groupId).then(() => {
                takeCards(socket, groupId)
            });
        });
        socket.on('CheckCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            groupId && cardService.checkCard(groupId, card._id, card.isCompleted);
        });
        socket.on('RemoveOneCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            groupId && cardService.removeOneCard(groupId, card._id).then(() => {
                takeCards(socket, groupId)
            });
        });
        socket.on('CheckTodo', (data) => {
            const card = data.card;
            const todo = data.todo;
            const groupId = data.groupId;
            groupId && todoService.checkTodo(groupId, card._id, todo._id);
        });
}

export default WsCardController;