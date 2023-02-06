import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;


const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
})

const UserModel = model('User', UserSchema);

export default UserModel;