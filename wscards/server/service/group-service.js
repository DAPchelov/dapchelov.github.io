import GroupModel from "../models/group-model.js";

class GroupService {
    async createNewGroup (reqLabel) {
        const candidate = await GroupModel.findOne({ reqLabel });
        if (candidate) {
            throw ApiError.BadRequest(`Группа с таким названием ${reqLabel} уже существует`)
        }
        
        GroupModel.create({"label":reqLabel});
    };

    async getGroupCards(reqLabel) {
        const cardsList = await CardsListModel.findOne({ label: reqLabel });
        const cardsListDto = new CardsDto(cardsList);
        return { cards: cardsListDto.cards }
    }
}

export default new GroupService();