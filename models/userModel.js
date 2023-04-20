import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    role: {
      type: Number,
      default: 0,
    },address:{
      type: String,
      required:true,
      default: ''
    }
  },
  { timestamps: true }
);
export default mongoose.model("users", userSchema);
