import express from "express";
import {fileURLToPath} from "url";
import path from "path";
import { dirname } from "path";

const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);

app.use(express.urlencoded({extended:true}));//this is a middleware which will
//reload the whole server top to bottom as soon as a new request object comes in 
//and upadtae request body so we dont have to manually read file 
//from fs module and use .on("data") and .on("end") event handler to collect and 
//process incomming data from form

app.get("/",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"public","form.html"));
})

app.post("/submitForm",(req,res)=>{
    console.log(req.body);
    const {Name,Age}=req.body;
    console.timeLog(Name);
    console.log(Age);
    res.json({Name:Name,Age:Age});
    res.end();
})

app.listen(port,()=>{
    console.log("Server running");
})