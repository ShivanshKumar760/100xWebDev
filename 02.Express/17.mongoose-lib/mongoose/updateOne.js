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

const fruit5=new FruitCollection({
    
    rating:7,
    review:"peeaches are good!"
});


// fruit5.save()
// .then((saveItem)=>{
//     console.log("Saved:",saveItem);
// });


FruitCollection.findByIdAndUpdate("673662815620ab18f1c96ddc",{fruitName:"Peeach"},{new:true})
.then((item)=>{
    console.log("Updated:",item)
});


// or

FruitCollection.updateOne({_id:"673662815620ab18f1c96ddc"},
    {review:"Very nice"}
)
.then((item)=>{console.log(item)});