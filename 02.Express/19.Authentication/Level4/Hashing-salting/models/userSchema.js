import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import dotenv from "dotenv";
dotenv.config();
const userSchema=new mongoose.Schema({
    email:String,
    password:String
});

export default userSchema;