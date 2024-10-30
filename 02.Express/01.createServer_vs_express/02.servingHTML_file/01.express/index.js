import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
const app=express()
//unlike createrServer of node:http module to serve a html is not that difficult we dont need
//fs module to read file and render it on browser 
//instead we need file path 

const __filepath=fileURLToPath(import.meta.url);//this will give file path of index.js so we need to remove index.js for that we will use dirname
console.log(__filepath);
const __dirname=dirname(__filepath);
console.log(__dirname);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})


app.get("/about",(req,res)=>{
    res.sendFile(__dirname+"/public/about.html");
})

app.listen(3000,()=>{
    console.log("Express server running");
})
