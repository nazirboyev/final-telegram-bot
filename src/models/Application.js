import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  fio: String,
  course: String,
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
