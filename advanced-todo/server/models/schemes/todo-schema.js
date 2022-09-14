import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    id: { type: String, unique: true, required: true },
    message: { type: String, unique: true, required: true },
    isCompleted: { type: Boolean, required: true },
})

export default TodoSchema;