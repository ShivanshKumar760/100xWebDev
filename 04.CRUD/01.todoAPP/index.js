import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const todoSchema= new mongoose.Schema({
    todo:String,
    todoStatus:String
});

const todoCollection=mongoose.model("Todos",todoSchema);
app.get("/",(req,res)=>{
    todoCollection.find()
    .then(function(todoCollection_Array)
    {
        res.status(200).render("index",{todos:todoCollection_Array});
    }).catch(function(err){
        res.status(401).json({errorMsg:"Cannot fetch todo"});
    });
    
});
app.post("/post",(req,res)=>{
    const {body}=req;
    const newTodo=new todoCollection(body);
    todoCollection.create(newTodo).then(function()
    {
        res.redirect("/");
    }).catch(function(err)
    {
        res.status(401).json({errorMsg:"Cannot save Todo"});
    });
    
});
app.post("/patch/:_id",(req,res)=>{
    console.log("This is post-patch")
    console.log(req.body);
    const {_id}=req.body;
    console.log(_id);
    res.status(200).render("patch",{_id:_id});
});
app.patch("/patch/:_id",(req,res)=>{
    const{body,params:{_id}}=req;
    console.log(body);
   todoCollection.findByIdAndUpdate(_id,{$set:body},{new:true})
   .then(function(fixArticle)
   {
    res.status(201).json(fixArticle);
   }).catch((err)=>{
        res.json({errorMsg:err});
    });
    
});

app.delete("/delete/:_id",(req,res)=>{
    const {params:{_id}}=req;
    console.log(_id);
    todoCollection.findByIdAndDelete(_id)
    .then(function(deletedRecord)
    {
        res.status(204).json(deletedRecord);
    }).catch(function(err)
    {
        res.json({errorMsg:err});
    })
    
});


mongoose.connect("mongodb://localhost:27017/todoDB").then(function()
    {
        app.listen(port,()=>{
            console.log("Server is running");
        });
}).catch((err)=>{console.log("Couldn't connect with mongodb try again!")});