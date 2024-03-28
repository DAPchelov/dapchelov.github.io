import mongoose from 'mongoose';
import { CardSchema } from './cardsList-model.js';

const Schema = mongoose.Schema;
const model = mongoose.model;

const GroupUserSchema = new Schema({
    userId: { type: String, unique: false, required: false },
    isLoggedIn: { type: Boolean, required: false, default: false },
})

const GroupSchema = new Schema({
    label: { type: String, unique: true, required: true },
    ownerId: { type: String, required: true },
    users:[GroupUserSchema]
})

const GroupeModel = model('Group', GroupSchema);

export default GroupeModel;