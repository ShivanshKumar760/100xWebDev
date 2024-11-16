import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";

const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.get("/",(req,res)=>{
    console.log(req.headers);
    console.log(req.body);
    res.status(200).render("index");
});
app.post("/post",(req,res)=>{
    console.log(req.body);
    const {body:{Name}}=req;  
    res.status(200).render("index",{Name:Name});
});
app
app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
});