import $api from "../http";
import { AxiosResponse } from "axios";
import { ICard } from "../models/ICard";

interface ICards {
    cards: [ICard],
}

class UserService {
    static async getCards(): Promise<AxiosResponse<ICards>> {
        return $api.get<ICards>('/cards');
    }
    static async checkCard(cardId: string, isCompleted: boolean): Promise<void> {
        return $api.post('/setcompleted', { cardId, isCompleted });
    }
    static async postTodo(todoMessage: string): Promise<void> {
        return $api.post('/posttodo', { message: todoMessage });
    }
    static async removeCompletedTodos() {
        return $api.post('/removecompleted');
    }
    static async removeOneTodo(todoId: string) {
        return $api.post('/removeonetodo', { todoId });
    }
}

export default UserService;