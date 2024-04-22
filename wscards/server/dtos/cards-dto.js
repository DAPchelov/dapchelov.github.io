class CardsDto {
    _id = '';
    userid = '';
    cards = [];

    constructor(model) {
        if (model !== null) {
            this._id = model._id;
            this.userid = model.userid;
            this.cards = model.cards;
        }
    };
};

export default CardsDto;