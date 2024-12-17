import mongoose from "mongoose";
import userSchema from "../Schema/userSchema.js";

const userCollection=mongoose.model("Users",userSchema);

export default userCollection;