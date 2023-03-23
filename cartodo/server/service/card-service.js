import CardsListModel from '../models/cardsList-model';
import CardsDto from '../dtos/cards-dto';

class CardService {
    async postNewCard(reqUserId, postMessage, postTodos) {
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
    async getUserCards(reqUserId) {
        const cardsList = await CardsListModel.findOne({ userId: reqUserId });
        const cardsListDto = new CardsDto(cardsList);

        return { cards: cardsListDto.cards }
    }

};

export default new CardService();