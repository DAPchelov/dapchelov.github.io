import { ICard } from "./ICard";
import { IUser } from "./IUser";

export interface IGroup {
    _id: string;
    label: string;
    users: [{
        userId: string,
        email: string,
    }];
    cards: ICard[];
    ownerId: string;
}