import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app=express();
const port=3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const url="mongodb://localhost:27017/";
const dbName="myDB";
const client=new MongoClient(url);
let db;


client.connect().then(()=>{
     console.log("Mongodb connected successfully");
     db=client.db(dbName);
     app.listen(port,()=>{console.log("Server");});
});

app.get("/",async (req,res)=>{
    const bookCollections=db.collection('books');
    // bookCollections.find().toArray().then((item)=>{
    //     res.json(item);
    // })

    const item=await bookCollections.find().toArray();
    res.status(200).json(item);
});

app.get("/books",async(req,res)=>{
    const {query:{sort}}=req;
    let booksRec=[];
    if(sort==="asc")
    {
        // db.collection("books")
        // .find()
        // .sort({author:1})
        // .forEach(book => {booksRec.push(book);})
        // .then(()=>{
        //    return res.status(200).json(booksRec);
        // })
        await db.collection("books").find().sort({author:1}).forEach(books=>booksRec.push(books));
        return res.status(200).json(booksRec);
    }
    else{
        // db.collection("books")
        // .find()
        // .sort({author:-1})
        // .forEach(book => {booksRec.push(book);})
        // .then(()=>{
        //    return res.status(200).json(booksRec);
        // })

        await db.collection("books").find().sort({author:-1}).forEach(books=>booksRec.push(books));
        return res.status(200).json(booksRec);
    }
});

app.get("/books/get/:id",async (req,res)=>{
    
    const {params:{id}}=req;
    if(ObjectId.isValid(id)){//will check 24 character hex
        // db.collection("books").findOne({_id:new ObjectId(id)})
        // .then((bookDoc)=>{
        //     res.status(200).json(bookDoc);
        // });
        const docs=await db.collection("books").findOne({_id:new ObjectId(id)});
        res.status(200).json(docs);
    }
    else{
        res.status(500).json({err:"Not Vaid id"});
    }
})

app.post("/books/add",async (req,res)=>{
    const {body:{title,author,rating}}=req;
    // db.collection("books").findOne({title})
    // .then((docs)=>{
    //     if(docs)
    //     {
    //         return res.send("Already Present");
    //     }
        
    //     db.collection("books").insertOne({
    //         title:title,
    //         author:author,
    //         rating:rating})
    //     .then((result)=>{res.status(200).send(result)});
    // });

    const existingDoc=await db.collection("books").findOne({title});
    if(existingDoc)
    {
        return res.send("Already Present");
    }
    const result=await db.collection("books").insertOne({title,author,rating});
    return  res.status(200).send(result);
   
});

app.delete("/books/remove/:id",async (req,res)=>{
    const {params:{id}}=req;
    if(ObjectId.isValid(id)){//will check 24 character hex
        // db.collection("books").deleteOne({_id:new ObjectId(id)})
        // .then((result)=>{
        //     res.status(200).json(result);
        // });
        const result=await db.collection("books").deleteOne({_id:new ObjectId(id)});
        res.status(200).json(result);
    }
    else{
        res.status(500).json({err:"Not Vaid id"});
    }
})