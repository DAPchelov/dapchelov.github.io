import CardsListModel from "../models/cardsList-model";
import CardsDto from '../dtos/cards-dto';

class CardService {
    async postNewCard(reqUserId, postMessage, postTodos) {
        const newCard = {
            isAccepted: true,
            isCompleted: false,
            message: postMessage,
            todos: postTodos,
        }
        await CardsListModel.updateOne({ userId: reqUserId }, { $push: { cards: newCard } });
    }
    async removeCompletedCards(reqUserId) {
        await CardsListModel.updateOne({ userId: reqUserId }, { $pull: { cards: { isCompleted: true } } });
    }
    async setCardCompleted(reqUserId, cardId, isCompleted) {
        await CardsListModel.updateOne({ userId: reqUserId, 'cards._id': cardId }, {$set: {"cards.$.isCompleted": isCompleted}});
    }
    async removeOneCard(reqUserId, cardId) {
        await CardsListModel.updateOne({ userId: reqUserId }, { $pull: { cards: { _id: cardId } } });
    }
    async getUserCards(reqUserId) {
        const cardsList = await CardsListModel.findOne({ userId: reqUserId });
        const cardsListDto = new CardsDto(cardsList);
 
        return { cards: cardsListDto.cards }
    }
    // may adapt to work with cards
    // async setTodoCompleted(reqUserId, todoId, isCompleted) {
    //     await CardsListModel.updateOne({ userId: reqUserId, 'todos._id': todoId }, {$set: {"todos.$.isCompleted": isCompleted}});
    // }
    // async removeOneTodo(reqUserId, todoId) {
    //     await CardsListModel.updateOne({ userId: reqUserId }, { $pull: { todos: { _id: todoId } } });
    // }
};

export default new CardService();