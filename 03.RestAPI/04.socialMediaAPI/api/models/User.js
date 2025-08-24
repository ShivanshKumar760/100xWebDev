import mongoose from "mongoose";
import UserSchema from "../schemas/usersSchema.js";
const User=mongoose.model("Users",UserSchema);

export default User;