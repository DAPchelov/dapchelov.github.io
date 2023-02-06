import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const TodoSchema = new Schema({
    isCompleted: { type: Boolean, required: true },
    message: { type: String, required: true },
})


const TodoListSchema = new Schema({
    userId: { type: String, unique: true, required: true },
    todos: [TodoSchema],
})

const TodoListModel = model('Todo', TodoListSchema);

export default TodoListModel;