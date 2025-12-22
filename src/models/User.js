import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    chatId: {
      type: Number,
      required: true,
      unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
