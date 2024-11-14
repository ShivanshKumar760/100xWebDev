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

const fruit1=new FruitCollection({
    fruitName:"Apple",
    rating:8,
    review:"Pretty Solid!"
});

// fruit1.save().then((addedItem)=>{console.log(addedItem)});//async

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

// FruitCollection.insertMany([fruit2,fruit3,fruit4])
// .then((items/*array will be returned as value*/)=>{
//     console.log(items);
// }).then(()=>{
//     //we added find() in then() to schedule it after .insertMany()
//     //cause although all 3 are async saving and inserting takes more
//     //time then find()
//     FruitCollection.find().then((collection)=>{
//         console.log(collection);
//     })
// })

//accessing these item using find()

const fruit5=new FruitCollection({
    
    rating:7,
    review:"peeaches are good!"
});


// fruit5.save()
// .then((saveItem)=>{
//     console.log("Saved:",saveItem);
// });


// FruitCollection.findByIdAndUpdate("67353fedc8fef9f47d7f2f9f",{fruitName:"Peeach"},{new:true})
// .then((item)=>{
//     console.log("Updated:",item)
// });

FruitCollection.updateOne({_id:"67353fedc8fef9f47d7f2f9b"},
    {review:"Very nice"}
)
.then((item)=>{console.log(item)});