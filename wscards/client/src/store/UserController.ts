import { makeAutoObservable } from "mobx";
import { Socket } from "socket.io-client";
import { IUser } from "../models/IUser";

class WSUserController {
    socket: Socket = {} as Socket;

    user: IUser = {} as IUser;

    constructor(socket: Socket ) {

        this.socket = socket;
        this.socket.on('TakeUserData', (user: IUser) => {
            this.user = user;
        })
        makeAutoObservable(this);
    }

    receiveUserAllGroups() {
        this.socket.emit('ReceiveUserAllGroups', { userId: this.user._id });
    }
}

export default WSUserController;