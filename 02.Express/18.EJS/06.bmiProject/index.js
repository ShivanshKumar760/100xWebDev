import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
import path from "path";

const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
let bmi=0;
function bmiCalculator(req,res,next)
{
    let height=req.body.height;
    let weight=req.body.weight;
    bmi=weight/(height*height);
    next();
}
app.get("/",function(req,res){
    res.status(200).render("index");
});

app.post("/calcBmi",bmiCalculator,function(req,res)
{
    console.log(req.body);
    console.log(bmi);
    // res.send(`Your Bmi is ${bmi}`);
    res.status(201).render("index",{bmi:bmi});
});

app.listen(port,()=>{console.log("Server is running");});
