import ApiError from '../exeptions/api-error.js'

import GroupModel from "../models/group-model.js";
import CardsListModel from '../models/cardsList-model.js';
import UserModel from '../models/user-model.js'

import GroupDto from '../dtos/group-dto.js';
import CardsDto from '../dtos/cards-dto.js';

class GroupService {
    async createNewGroup(label, ownerId, users) {
        try {
            const candidate = await GroupModel.findOne({ label });
            if (candidate) {
                throw ApiError.BadRequest(`Группа с таким названием ${label} уже существует`)
            }
            const groupUsers = users.map((user) => {
                return ({
                    userId: user.userId,
                    email: user.email
                })
            });

            GroupModel.create({
                label: label,
                ownerId: ownerId,
                users: groupUsers,
            }).then((group) => {
                const groupDto = new GroupDto(group);
                // CardLists use for groups and users
                CardsListModel.create({ userId: groupDto._id, cards: [] });
            }
            );

        } catch (error) {
            console.log(error);
        }
    };

    async editGroup(label, ownerId, users) {

        try {
            const candidate = await GroupModel.findOne({ label });
            if (candidate.ownerId === ownerId) {
                const groupUsers = users.map((user) => {
                    return ({
                        userId: user.userId,
                        email: user.email
                    })
                });
                // add new users to group
                await GroupModel.updateOne({ label: label }, { $set: { users: groupUsers } });
            } if (candidate.ownerId !== ownerId) {
                throw ApiError.BadRequest(`Пользователь ${ownerId} не владелец группы ${label}`);
            } if (!candidate) {
                throw ApiError.BadRequest(`Группа с таким названием ${label} не существует`)
            }
        } catch (error) {
            console.log(error);
        }
    };

    async getGroupCards(reqLabel) {
        const cardsList = await CardsListModel.findOne({ label: reqLabel });
        const cardsListDto = new CardsDto(cardsList);
        return { cards: cardsListDto.cards }
    }
    async getUserLoggedInGroups(userId) {
        const groups = await GroupModel.find({ 'users.userId': userId, 'users.isLoggedIn': true });
        const groupsDto = groups.map((group) => { return (new GroupDto(group)) });
        return groupsDto
    }
    async getUserAllGroups(userId) {
        const groups = await GroupModel.find({ 'users.userId': userId });



        const groupsDto = groups.map((group) => { return new GroupDto(group) });


        return (groupsDto);
    }
}

export default new GroupService();

