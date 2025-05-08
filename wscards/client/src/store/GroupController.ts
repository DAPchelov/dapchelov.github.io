import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";
import { IUser } from "../models/IUser";
import { IOtherUser } from "../models/IOtherUser";
import { IGroup } from "../models/IGroup";

class NewGroupController {
    _id: string = '';
    label: string = '';
    ownerId: string = '';
    groupUsers: IOtherUser[] = [];

    allUsers: IOtherUser[] = [];

    allUserGroups: [IGroup] = {} as [IGroup];
    socket: Socket = {} as Socket;

    constructor(socket: Socket) {

        // this._id = _id;
        this.socket = socket;
        // this.label = label;
        // this.ownerId = ownerId;
        // this.groupUsers = groupUsers;

        this.socket.on('TakeUserAllGroups', (data: [IGroup]) => {
            this.allUserGroups = data;
        })

        this.socket.on('TakeAllUsers', (data: IUser[]) => {
            const allUsers = data.map((user: IUser) => {
                return ({
                    login: user.login,
                    userId: user._id,
                })
            });
            this.setAllUsers(allUsers);
        })

        makeAutoObservable(this);
    }

    setLabel(newCardLabel: string) {
        this.label = newCardLabel;
    }
    setGroupUsers(groupUsers: IOtherUser[]) {
        this.groupUsers = groupUsers;
    }
    setAllUsers(allUsers: IOtherUser[]) {
        this.allUsers = allUsers;
    }
    addUserToGroup(userId: string) {
        const user = this.allUsers.find((user) => (user.userId === userId));

        if (!this.groupUsers.find((user) => (user.userId === userId))) {
            user && this.groupUsers.push(user);
        }
    }
    removeUserFromGroup(removeUserId: IUser['userId']) {
        this.setGroupUsers(this.groupUsers.filter(user => user.userId !== removeUserId));
    }
    getLabel() {
        return (this.label);
    }
    getGroupUsers() {
        return (this.groupUsers);
    }
    getAllUsers() {
        return (this.allUsers);
    }

    clearForm() {
        this._id = '';
        this.label = '';
        this.groupUsers = [];
    }

    createGroup(userId: string) {
        const users = this.groupUsers.map((user) => { return ({ userId: user.userId, login: user.login }) });
        this.socket.emit('CreateNewGroup', { label: this.label, ownerId: this.ownerId, users: users, userId: userId });
        this.clearForm();

    }

    editGroup(userId: string) {
        const users = this.groupUsers.map((user) => { return ({ userId: user.userId, login: user.login }) });
        this.socket.emit('EditGroup', { _id: this._id, label: this.label, ownerId: this.ownerId, users: users, userId: userId });
        this.clearForm();
    }

    deleteGroup(userId: string) {
        this.socket.emit('DeleteGroup', { _id: this._id, userId: userId });
        this.clearForm();
    }

    receiveAllUsers(userId: string) {
        this.socket.emit('ReceiveAllUsers', { userId: userId });
    }
    setOwnerId(ownerId: string) {
        this.ownerId = ownerId;
    }

    async receiveGroupCards(groupId: string) {
        this.socket.emit('GetCards', { groupId });
    }

    setAllUserGroups(groups: [IGroup]) {
        this.allUserGroups = groups;
    }

    getAllUserGroups() {
        return this.allUserGroups;
    }

    redactGroup(_id: string) {
        const editableGroup = this.allUserGroups.find((group) => group._id === _id);
        if (editableGroup) {
            this._id = editableGroup._id;
            this.label = editableGroup.label;
            this.ownerId = editableGroup.ownerId;
            this.groupUsers = editableGroup.users;
        }
    }

    createNewGroup(label: string) {
        this.socket.emit('CreateNewGroup', { label: label });
    }
}

export default NewGroupController;