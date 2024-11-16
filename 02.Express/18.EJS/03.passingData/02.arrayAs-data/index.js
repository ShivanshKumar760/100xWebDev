import express from "express";
import {fileURLToPath} from "url"
import { dirname } from "path";
import path from "path";
const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const users=[
    {Name:"Shivansh Kumar",age:19},
    {Name:"Alex",age:20}
];
app.get("/",(req,res)=>{
    res.status(200).render("index",{Users:users});
});

app.post("/post",(req,res)=>{
    const {body}=req;
    users.push(body);
    res.status(201).render("index",{Users:users});
});

app.listen(port,()=>{console.log(`Server is running on port:${port}`)});