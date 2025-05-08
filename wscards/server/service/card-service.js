import CardsListModel from '../models/cardsList-model.js';
import CardsDto from '../dtos/cards-dto.js';

class CardService {
    async editCard(reqUserId, cardId, postMessage, postTodos) {
        // delete TEMP todo IDs before post new card to BE. It will get new IDs in the database
        postTodos.forEach(todo => { delete (todo._id) });
        await CardsListModel.updateOne({ userId: reqUserId, 'cards._id': cardId }, { $set: { 'cards.$.message': postMessage } });
        await CardsListModel.updateOne({ userId: reqUserId, 'cards._id': cardId }, { $set: { 'cards.$.todos': postTodos } });
    }
    async postNewCard(reqUserId, postMessage, postTodos) {
        // delete TEMP todo IDs before post new card to BE. It will get new IDs in the database
        postTodos.forEach(todo => { delete (todo._id) });
        const newCard = {
            isAccepted: false,
            isCompleted: false,
            message: postMessage,
            todos: postTodos,
        }
        await CardsListModel.updateOne({ userId: reqUserId }, { $push: { cards: newCard } });
    }
    async removeCompletedCards(reqUserId) {
        await CardsListModel.updateOne({ userId: reqUserId }, { $pull: { cards: { isCompleted: true } } });
    }
    async checkCard(reqUserId, cardId, isCompleted) {
        await CardsListModel.updateOne({ userId: reqUserId, 'cards._id': cardId }, { $set: { 'cards.$.isCompleted': isCompleted } });
    }
    async removeOneCard(reqUserId, cardId) {
        await CardsListModel.updateOne({ userId: reqUserId }, { $pull: { cards: { _id: cardId } } });
    }
    async getGroupCards(reqGroupId) {
        const cardsList = await CardsListModel.findOne({ userId: reqGroupId });
        const cardsListDto = new CardsDto(cardsList);
        return { cards: cardsListDto.cards }
    }
};

export default new CardService();