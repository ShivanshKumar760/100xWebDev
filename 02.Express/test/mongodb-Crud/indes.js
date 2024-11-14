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

app.get("/",(req,res)=>{
    const bookCollections=db.collection('books');
    bookCollections.find().toArray().then((item)=>{
        res.json(item);
    })
});

app.get("/books",(req,res)=>{
    const {query:{sort}}=req;
    let booksRec=[];
    if(sort==="asc")
    {
        db.collection("books")
        .find()
        .sort({author:1})
        .forEach(book => {booksRec.push(book);})
        .then(()=>{
           return res.status(200).json(booksRec);
        })
    }
    else{
        db.collection("books")
        .find()
        .sort({author:-1})
        .forEach(book => {booksRec.push(book);})
        .then(()=>{
           return res.status(200).json(booksRec);
        })
    }
});

app.get("/books/get/:id",(req,res)=>{
    
    const {params:{id}}=req;
    if(ObjectId.isValid(id)){//will check 24 character hex
        db.collection("books").findOne({_id:new ObjectId(id)})
        .then((bookDoc)=>{
            res.status(200).json(bookDoc);
        });
    }
    else{
        res.status(500).json({err:"Not Vaid id"});
    }
})

app.post("/books/add",(req,res)=>{
    const {body:{title,author,rating}}=req;
    db.collection("books").findOne({title})
    .then((docs)=>{
        if(docs)
        {
            return res.send("Already Present");
        }
        
        db.collection("books").insertOne({
            title:title,
            author:author,
            rating:rating})
        .then((result)=>{res.status(200).send(result)});
    });
   
});

app.delete("/books/remove/:id",(req,res)=>{
    const {params:{id}}=req;
    if(ObjectId.isValid(id)){//will check 24 character hex
        db.collection("books").deleteOne({_id:new ObjectId(id)})
        .then((result)=>{
            res.status(200).json(result);
        });
    }
    else{
        res.status(500).json({err:"Not Vaid id"});
    }
})