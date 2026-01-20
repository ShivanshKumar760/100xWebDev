import mongoose from "mongoose";
import userSchema from "../schema/userSchema.js";

const userCollection=mongoose.model("Users",userSchema);

export default userCollection