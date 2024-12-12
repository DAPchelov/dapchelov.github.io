import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;


const DocSchema = new Schema({
    creatorId: { type: String },
    docDecNum: { type: String, required: true, unique: true },
    docName: { type: String, required: true },
    prodName: { type: String },
    folderNum: {type: String, required: true },
})

const DocModel = model('Doc', DocSchema);

export default DocModel;