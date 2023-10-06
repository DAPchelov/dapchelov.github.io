import $api from "../http";
import { AxiosResponse } from "axios";
import { ICard } from "../models/ICard";

interface ICards {
    cards: [ICard],
}

class CardService {
    static async getCards(): Promise<AxiosResponse<ICards>> {
        return $api.get<ICards>('/cards');
    }
    static async checkCard(cardId: string, isCompleted: boolean): Promise<void> {
        return $api.post('/checkcard', { cardId, isCompleted });
    }
    static async postCard(todoMessage: string): Promise<void> {
        return $api.post('/postcard', { message: todoMessage });
    }
    static async removeCompletedCards() {
        return $api.post('/removecompleted');
    }
    static async removeOneCard(cardId: string) {
        return $api.post('/removeonecard', { cardId });
    }
}

export default CardService;