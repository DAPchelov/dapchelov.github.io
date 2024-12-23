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
            const addedDoc = await DocModel.create(newDoc)
            return ({
                _id: addedDoc._id,
                docDecNum: addedDoc.docDecNum,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async editDoc(newDoc) {
        try {
            await DocModel.updateOne({ _id: newDoc._id }, { $set: { creatorId: newDoc.creatorId, docDecNum: newDoc.docDecNum, docName: newDoc.docName, folderNum: newDoc.folderNum } });
            return ({ _id: newDoc._id, docDecNum: newDoc.docDecNum });
        } catch (error) {
            console.log(error);
        }
    }

    async getDoc(docId) {
        try {
            const doc = await DocModel.findOne({ _id: docId });
            return doc;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteDoc(docId) {
        try {
            const candidate = await DocModel.findOne({ docId });
            if (candidate) {
                await DocModel.deleteOne({ _id: docId });
                return (docId);
            } if (!candidate) {
                throw ApiError.BadRequest(`Удаляемый документ не найден`);
            }
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