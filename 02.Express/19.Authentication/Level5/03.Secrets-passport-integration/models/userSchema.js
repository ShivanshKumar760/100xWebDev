import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    secret:String
});

export default userSchema;