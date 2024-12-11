import cardService from "../service/card-service.js";
import todoService from "../service/todo-service.js";

const takeCards = (socket, groupId) => {
    cardService.getUserCards(groupId).then((data) => {
        socket.emit('TakeCards', data);
    });
}

const WsCardController = (socket, user) => {

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
            user && cardService.postNewCard(groupId, card.message, card.todos).then(() => {
                takeCards(socket, groupId)
            });
        });
        socket.on('EditCard', (data) => {
            const card = data.card;
            const groupId = data.groupId;
            user && cardService.editCard(groupId, card._id, card.message, card.todos).then(() => {
                takeCards(socket, groupId)
            });
        });
        socket.on('RemoveCompletedCards', (data) => {
            const groupId = data.groupId;
            user && cardService.removeCompletedCards(groupId).then(() => {
                takeCards(socket, groupId)
            });
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
}

export default WsCardController;