import ApiError from '../exeptions/api-error.js'
import DocModel from '../models/doc-model.js'


class DocService {

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
            await DocModel.updateOne({ _id: newDoc._id }, { $set: { creatorId: newDoc.creatorId, docDecNum: newDoc.docDecNum, docName: newDoc.docName, prodName: newDoc.prodName, folderNum: newDoc.folderNum } });
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

    async deleteDoc(docDecNum) {
        try {
            const candidate = await DocModel.findOne({ docDecNum });
            if (candidate) {
                await DocModel.deleteOne({ docDecNum: docDecNum });
                return (docDecNum);
            } if (!candidate) {
                throw ApiError.BadRequest(`Удаляемый документ не найден`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async searchDocs(searchType, searchPromt) {
        try {
            let docs = undefined;
            if (searchType === 'docDecNum') {
                docs = await DocModel.find({ docDecNum: { $regex: searchPromt + "([a-zA-Z0-9]?)" } });
            }
            if (searchType === 'docName') {
                docs = await DocModel.find({ docName: { $regex: searchPromt + "([a-zA-Z0-9]?)" } });
            }
            if (searchType === 'prodName') {
                docs = await DocModel.find({ prodName: { $regex: searchPromt + "([a-zA-Z0-9]?)" } });
            }
            if (searchType === 'folderNum') {
                docs = await DocModel.find({ folderNum: { $regex: searchPromt } });
            }
            if (docs.length > 0) {
                return (docs);
            } if (docs.length === 0) {
                throw ApiError.BadRequest(`Искомые документы не найдены`);
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