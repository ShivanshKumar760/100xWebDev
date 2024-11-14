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

const fruit2=new FruitCollection({
    fruitName:"Kiwi",
    rating:9,
    review:"Pretty Solid and tasty!"
});
const fruit3=new FruitCollection({
    fruitName:"Banana",
    rating:10,
    review:"The best!"
});
const fruit4=new FruitCollection({
    fruitName:"Orange",
    rating:7,
    review:"Pretty Solid!"
});

FruitCollection.insertMany([fruit2,fruit3,fruit4])
.then((items/*array will be returned as value*/)=>{
    console.log(items);
})