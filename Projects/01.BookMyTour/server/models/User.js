import mongoose from "mongoose";
import userSchema from "../schema/userSchema.js";

const User=mongoose.model("Users", userSchema);

export default User;