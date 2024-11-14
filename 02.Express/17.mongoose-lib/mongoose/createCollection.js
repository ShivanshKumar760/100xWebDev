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

const FruitCollection = mongoose.model("Fruit",fruitSchema);

//add document into the collection:

const fruit1=new FruitCollection({
    fruitName:"Apple",
    rating:8,
    review:"Pretty Solid!"
});

fruit1.save().then((addedItem)=>{console.log(addedItem)});//async