import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const GroupUserSchema = new Schema({
    userId: { type: String, unique: false, required: true },
    isLoggedIn: { type: Boolean, required: true, default: false },
})

const GroupSchema = new Schema({
    label: { type: String, unique: true, required: true },
    ownerId: { type: String, required: true },
    users:[GroupUserSchema],
})

const GroupeModel = model('Group', GroupSchema);

export default GroupeModel;