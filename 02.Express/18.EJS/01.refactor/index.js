import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
let result;
function caluclate(req,res,next) {
    const {body:{var1,var2,opr}}=req;
    if(opr==="+")
    {
        result=parseInt(var1)+parseInt(var2);
    }
    next();
}
const app=express();
const port=3000;
const filename=fileURLToPath(import.meta.url);
const __dirname=dirname(filename);
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.status(200).render("index");
});

app.post("/",caluclate,(req,res)=>{
    res.status(201).render("index",{result:result});
});


app.listen(port);