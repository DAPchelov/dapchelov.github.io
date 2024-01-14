import mongoose from 'mongoose';
import { CardSchema } from './cardsList-model';

const Schema = mongoose.Schema;
const model = mongoose.model;

const GroupSchema = new Schema({
    label: { type: String, unique: true, required: true },
    // cards: [CardSchema],
})

const GroupeModel = model('Group', GroupSchema);

export default GroupeModel;