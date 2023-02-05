class UserDto {
    email;
    _id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.isActivated = model.isActivated;
    };
};

export default UserDto;