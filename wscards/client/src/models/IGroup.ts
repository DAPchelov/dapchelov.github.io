import { ICard } from "./ICard";
import { IOtherUser } from "./IOtherUser";

export interface IGroup {
    _id: string;
    label: string;
    users: [IOtherUser];
    cards: ICard[];
    ownerId: string;
}