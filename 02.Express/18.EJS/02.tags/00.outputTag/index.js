import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
let  day;
function getDay(req,res,next)
{
    day=new Date().getDay();
    next();
}
// getDay();
// console.log(day);
const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.status(200).render("index");
});

app.get("/day",(req,res)=>{
    let msg;
    if(day==0 || day==6)
    {
        msg="Its Weekend have fun!";
    }
    else{
        msg="It's Weekday work !";
    }
    res.status(200).render("index",{today:msg});
});

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});