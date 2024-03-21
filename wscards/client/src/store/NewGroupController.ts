import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";
import { IUser } from "../models/IUser";

class NewGroupController {

    label: string = '';
    groupUsers: IUser[] = [];
    ownerId: string = '';
    allUsers: IUser[] = [];

    socket: Socket = {} as Socket;

    constructor(ownerId: string, socket: Socket) {

        this.ownerId = ownerId;
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

        if(!this.groupUsers.find((user) => (user._id === userId))){
            user && this.groupUsers.push(user);
        }
    }
    removeUserFromGroup(removeUserId: IUser['_id']) {
        this.setGroupUsers(this.groupUsers.filter(user => user._id !== removeUserId));
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
            this.socket.emit('CreateNewGroup', { group: { label: this.label, users: this.groupUsers, ownerId: this.ownerId } });
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