import { ICard } from "./ICard";
import { IUser } from "./IUser";

export interface IGroup {
    _id: string;
    label: string;
    users: IUser[];
    cards: ICard[];
    ownerId: IUser;
}