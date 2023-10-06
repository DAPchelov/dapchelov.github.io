import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: { type: String, required: true },
})

const TokenModel = model('Token', TokenSchema);

export default TokenModel;