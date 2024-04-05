class GroupDto {
    _id;
    label;
    ownerId;
    users;

    constructor(model) {
        this._id = model._id;
        this.label = model.label;
        this.ownerId = model.ownerId;
        this.users = model.users;
    };
};

export default GroupDto;