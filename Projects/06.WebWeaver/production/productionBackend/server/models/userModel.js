import mongoose from "mongoose";
import userSchema from "../schemas/userSchema.js";

const  userModel=mongoose.model('User', userSchema);

export default  userModel;