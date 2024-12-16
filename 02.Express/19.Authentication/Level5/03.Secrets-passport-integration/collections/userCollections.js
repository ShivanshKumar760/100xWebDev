import mongoose from "mongoose";
import userSchema from "../models/userSchema.js";

const userCollection=mongoose.model("Users",userSchema);

export default userCollection;