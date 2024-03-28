import ApiError from '../exeptions/api-error.js'

import GroupModel from "../models/group-model.js";

class GroupService {
    async createNewGroup(label, ownerId, usersId) {
        const candidate = await GroupModel.findOne({ label });
        if (candidate) {
            throw ApiError.BadRequest(`Группа с таким названием ${label} уже существует`)
        }
        const groupUsers = usersId.map((userId) => {
           return ({
            userId,
            isLoggedIn: false,
           }) 
        });

        GroupModel.create({
            label: label,
            ownerId: ownerId,
            users: groupUsers,
        });
        // add new users to group
        // await GroupModel.updateOne({ label: label }, { $push: { users: groupUsers } });
    };

    async getGroupCards(reqLabel) {
        const cardsList = await CardsListModel.findOne({ label: reqLabel });
        const cardsListDto = new CardsDto(cardsList);
        return { cards: cardsListDto.cards }
    }
}

export default new GroupService();