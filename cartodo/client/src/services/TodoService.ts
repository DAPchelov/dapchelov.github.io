import $api from "../http";

class TodoService {

    static async checkTodo(todoId: string, isCompleted: boolean): Promise<void> {
        return $api.post('/setcompleted', { todoId, isCompleted });
    }

    static async removeTodo(cardId: string, todoId: string) {
        return $api.post('/removetodo', { cardId, todoId });
    }
}

export default TodoService;