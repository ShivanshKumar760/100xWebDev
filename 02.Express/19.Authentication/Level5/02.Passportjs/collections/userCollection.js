import mongoose from "mongoose";
import userSchema from "../Schemas/UserSchema.js";

const userCollection=mongoose.model("Users",userSchema);

export default userCollection;