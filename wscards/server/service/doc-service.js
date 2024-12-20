import ApiError from '../exeptions/api-error.js'
import DocModel from '../models/doc-model.js'


class DocService {
    // async editCard(reqUserId, cardId, postMessage, postTodos) {
    //     // delete TEMP todo IDs before post new card to BE. It will get new IDs in the database
    //     postTodos.forEach(todo => { delete (todo._id) });
    //     await CardsListModel.updateOne({ userId: reqUserId, 'cards._id': cardId }, { $set: { 'cards.$.message': postMessage } });
    //     await CardsListModel.updateOne({ userId: reqUserId, 'cards._id': cardId }, { $set: { 'cards.$.todos': postTodos } });
    // }
    async postNewDoc(reqUserId, postDoc) {
        try {
            const newDoc = {
                creatorId: reqUserId,
                docDecNum: postDoc.docDecNum,
                docName: postDoc.docName,
                prodName: postDoc.prodName,
                folderNum: postDoc.folderNum,
            }
            const candidate = await DocModel.findOne({ docDecNum: newDoc.docDecNum });
            if (candidate) {
                throw ApiError.BadRequest(`Запись с таким номером ${newDoc.docDecNum} уже существует`)
            }
            await DocModel.create(newDoc)
            return(newDoc.docDecNum);
        } catch (error) {
            console.log(error);
        }
    }
    // async removeCompletedCards(reqUserId) {
    //     await CardsListModel.updateOne({ userId: reqUserId }, { $pull: { cards: { isCompleted: true } } });
    // }
    // async checkCard(reqUserId, cardId, isCompleted) {
    //     await CardsListModel.updateOne({ userId: reqUserId, 'cards._id': cardId }, { $set: { 'cards.$.isCompleted': isCompleted } });
    // }
    // async removeOneCard(reqUserId, cardId) {
    //     await CardsListModel.updateOne({ userId: reqUserId }, { $pull: { cards: { _id: cardId } } });
    // }
    // async getUserCards(reqUserId) {
    //     const cardsList = await CardsListModel.findOne({ userId: reqUserId });
    //     const cardsListDto = new CardsDto(cardsList);
    //     return { cards: cardsListDto.cards }
    // }
};

export default new DocService();