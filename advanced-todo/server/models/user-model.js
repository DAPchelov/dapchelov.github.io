import mongoose from 'mongoose';
import TodoSchema from './schemes/todo-schema';

const Schema = mongoose.Schema;
const model = mongoose.model;


const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    todos: { type: [TodoSchema], default: [] },
})

const UserModel = model('User', UserSchema);

export default UserModel;