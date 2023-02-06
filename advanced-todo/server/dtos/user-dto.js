class UserDto {
    _id;
    email;
    isActivated;

    constructor(model) {
        this._id = model._id;
        this.email = model.email;
        this.isActivated = model.isActivated;
    };
};

export default UserDto;