import mongoose from "mongoose";

const blogSchema= new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    createdAt:{type:Date,default:Date.now}
});
  
const blogCollection=mongoose.model("Blogs",blogSchema);

export default blogCollection;