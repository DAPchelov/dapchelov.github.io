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
        await TodoListModel.updateOne({ userId: reqUserId }, { $pull: { todos: { isCompleted: true } } });
    }
    async setTodoCompleted(reqUserId, todoId, isCompleted) {
        await TodoListModel.updateOne({ userId: reqUserId, 'todos._id': todoId }, {$set: {"todos.$.isCompleted": isCompleted}});
    }
    async removeOneTodo(reqUserId, todoId) {
        await TodoListModel.updateOne({ userId: reqUserId }, { $pull: { todos: { _id: todoId } } });
    }
};

export default new TodoService();