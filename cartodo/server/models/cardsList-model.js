import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const TodoSchema = new Schema({
    isCompleted: { type: Boolean, required: true },
    message: { type: String, required: true },
})

const CardSchema = new Schema({
    isAccepted: { type: Boolean, required: true },
    isCompleted: { type: Boolean, required: true },
    message: { type: String, required: true },
    todos: [TodoSchema],
})


const CardsListSchema = new Schema({
    userId: { type: String, unique: true, required: true },
    cards: [CardSchema],
})

const CardsListModel = model('Card', CardsListSchema);

export default CardsListModel;