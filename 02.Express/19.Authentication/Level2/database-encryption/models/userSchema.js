import mongoose from "mongoose";
import encrypt from "mongoose-encryption";
import dotenv from "dotenv";
dotenv.config();
const userSchema=new mongoose.Schema({
    email:String,
    password:String
});

const secret=process.env.MONGO_ENCRYPT_SECRET
userSchema.plugin(encrypt,{secret:secret,encryptedFields:['password']});
export default userSchema;