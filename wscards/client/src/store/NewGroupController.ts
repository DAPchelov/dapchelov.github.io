import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";
import { IUser } from "../models/IUser";
import { IOtherUser } from "../models/IOtherUser";

class NewGroupController {

    socket: Socket = {} as Socket;

    label: string = '';
    ownerId: string = '';

    private groupUsers: IOtherUser[] = [];
    allUsers: IOtherUser[] = [];


    constructor(socket: Socket, label: string, ownerId: string, groupUsers: IOtherUser[]) {

        this.socket = socket;
        this.label = label;
        this.ownerId = ownerId;
        this.groupUsers = groupUsers;

        this.socket.on('TakeAllUsers', (data: IUser[]) => {
            const allUsers = data.map((user: IUser) => {
                return ({
                    email: user.email,
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
            this.setAllUsers(this.allUsers.filter((user => (user.userId !== userId))));
        }
    }
    removeUserFromGroup(removeUserId: IUser['userId']) {
        const user = this.groupUsers.find((user) => (user.userId === removeUserId));
        this.setGroupUsers(this.groupUsers.filter(user => user.userId !== removeUserId));
        if (user && !this.allUsers.find((user) => (user.userId === removeUserId))) {
            this.allUsers.push(user);
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
            const users = this.groupUsers.map((user) => { return ({ userId: user.userId, email: user.email }) });
            this.socket.emit('CreateNewGroup', { label: this.label, users: users });
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