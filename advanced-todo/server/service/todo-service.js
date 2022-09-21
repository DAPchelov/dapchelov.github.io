import TodoListModel from "../models/todoList-model";


class TodoService {
    async postNewTodo(reqUserId, postMessage) {
        const newTodo = {
            isCompleted: false,
            message: postMessage
        }
        await TodoListModel.updateOne({ userId: reqUserId }, { $push: { todos: newTodo } });
    }
    async removeCompletedTodos(reqUserId) {
        await TodoListModel.findOneAndUpdate({ userId: reqUserId }, { $pull: { todos: { isCompleted: true } } });
    }
};

export default new TodoService();