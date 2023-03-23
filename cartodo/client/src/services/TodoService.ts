import $api from "../http";

class TodoService {

    static async checkTodo(cardId: string, todoId: string) {
        return $api.post('/checktodo', { cardId, todoId });
    }

    static async removeTodo(cardId: string, todoId: string) {
        return $api.post('/removetodo', { cardId, todoId });
    }
}

export default TodoService;