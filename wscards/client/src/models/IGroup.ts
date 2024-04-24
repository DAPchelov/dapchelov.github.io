import { ICard } from "./ICard";
import { IUser } from "./IUser";

export interface IGroup {
    _id: string;
    label: string;
    users: [{
        userId: string,
        isLoggedIn: boolean,
        _id: string,
    }];
    cards: ICard[];
    ownerId: IUser;
}