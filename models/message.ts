import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    message: { type: String, required: true },
    fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model('Message', messageSchema);