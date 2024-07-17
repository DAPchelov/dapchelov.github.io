import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";
import { IUser } from "../models/IUser";

class NewGroupController {

    socket: Socket = {} as Socket;

    label: string = '';
    ownerId: string = '';

    groupUsers: IUser[] = [];
    allUsers: IUser[] = [];

    
    constructor(socket: Socket, label: string, ownerId: string, groupUsers: IUser[]) {

        this.socket = socket;

        this.socket.on('TakeAllUsers', (data) => {
            this.setAllUsers(data);
        })

        makeAutoObservable(this);
    }

    setLabel(newCardLabel: string) {
        this.label = newCardLabel;
    }
    setGroupUsers(groupUsers: IUser[]) {
        this.groupUsers = groupUsers;
    }
    setAllUsers(allUsers: IUser[]) {
        this.allUsers = allUsers;
    }
    addUserToGroup(userId: string) {
        const user = this.allUsers.find((user) => (user._id === userId));

        if (!this.groupUsers.find((user) => (user._id === userId))) {
            user && this.groupUsers.push(user);
            this.setAllUsers(this.allUsers.filter((user => (user._id !== userId))));
        }
    }
    removeUserFromGroup(removeUserId: IUser['_id']) {
        const user = this.groupUsers.find((user) => (user._id === removeUserId));
        if (user) {
            this.allUsers.push(user);
            this.setGroupUsers(this.groupUsers.filter(user => user._id !== removeUserId));
        }
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
        this.label = '';
        this.groupUsers = [];
    }

    createGroup() {
        try {
            const usersId = this.groupUsers.map((user) => { return ({ userId: user._id, email: user.email }) });
            this.socket.emit('CreateNewGroup', { label: this.label, users: usersId });
            this.clearForm();
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    receiveAllUsers() {
        this.socket.emit('ReceiveAllUsers');
    }
}

export default NewGroupController;