import TodoListModel from "../models/todoList-model";
import { v4 as uuidv4 } from 'uuid';


class TodoService {
    async postNewTodo(reqUserId, postMessage) {
        const newTodo = {
            isCompleted: false,
            message: postMessage
        }
        await TodoListModel.updateOne({ userId: reqUserId }, { $push: { todos: newTodo } });
    }
    async removeCompletedTodos(reqUserId) {
        await TodoListModel.updateOne({ userId: reqUserId }, { $pull: { todos: { isCompleted: true } } });
    }
    async setTodoCompleted(reqUserId, todoId, isCompleted) {
        await TodoListModel.updateOne({ userId: reqUserId, 'todos._id': todoId }, {$set: {"todos.$.isCompleted": isCompleted}});
    }
};

export default new TodoService();