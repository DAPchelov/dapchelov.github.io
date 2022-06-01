import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
});

const Message = mongoose.model('Message', messageSchema);


