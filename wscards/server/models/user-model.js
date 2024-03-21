import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;


const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: true },
    activationLink: { type: String },
    socketId: {type: String, unique: true, required: true}
})

const UserModel = model('User', UserSchema);

export default UserModel;