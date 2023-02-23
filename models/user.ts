import mongoose, { Schema} from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
});

export default mongoose.models.User || mongoose.model('User', userSchema);



