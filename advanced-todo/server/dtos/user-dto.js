class UserDto {
    email;
    id;
    isActivated;
    todos;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.todos = model.todos;
    };
};

export default UserDto;