import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/FruitsDb");//async

//Create a schema :
const fruitSchema = new mongoose.Schema(
    {
        // fruitName:{
        //     type:String,
        //     required:[true,"name is required"]
        // },
        fruitName:String,
        rating:Number,
        review:String
});