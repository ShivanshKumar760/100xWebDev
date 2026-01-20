import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
    {
      username: {//required
        type: String,
        required: true,
        unique: true,
      },
      email: {//required
        type: String,
        required: true,
        unique: true,
      },
      country: {//required
        type: String,
        required: true,
      },
      img: {
        type: String,
      },
      city: {//required
        type: String,
        required: true,
      },
      phone: {//required
        type: String,
        required: true,
      },
      password: {//required
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
);

export default userSchema;