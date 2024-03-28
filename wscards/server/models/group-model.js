import mongoose from 'mongoose';
import { CardSchema } from './cardsList-model.js';

const Schema = mongoose.Schema;
const model = mongoose.model;

const GroupUserSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isLoggedIn: { type: Boolean, required: true, default: false },
})

const GroupSchema = new Schema({
    label: { type: String, unique: true, required: true },
    ownerId: { type: String, required: true },
    users: [GroupUserSchema],
    cards: [CardSchema],
})

const GroupeModel = model('Group', GroupSchema);

export default GroupeModel;