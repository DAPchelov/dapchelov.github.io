import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

// const crossedDocSchema = new Schema({
//     docDecNum: { type: String, required: true, unique: true },
//     docName: { type: String, required: true },
//     prodName: { type: String },
// })

const DocSchema = new Schema({
    creatorId: { type: String },
    docDecNum: { type: String, required: true, unique: true },
    docName: { type: String, required: true },
    prodName: { type: String },
    folderNum: { type: String, required: true },
    crossedDocs: [{ type: String }],
})

const DocModel = model('Doc', DocSchema);

export default DocModel;