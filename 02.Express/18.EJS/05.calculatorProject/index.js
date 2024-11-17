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
let result;
function calculate(req,res,next)
{
    const {body:{val1,val2,opr}}=req;
    if(opr==="+")
    {
        result=parseInt(val1)+parseInt(val2);
    }
    else if(opr==='-')
    {
        
        result=parseInt(val1)-parseInt(val2);
    }
    else if(opr==="*")
    {
        
        result=parseInt(val1)*parseInt(val2);
    }
    else if(opr==="/")
    {
        
        result=parseInt(val1)/parseInt(val2);
    }
    else if(opr==="%")
    {
        
        result=parseInt(val1)%parseInt(val2);
    }
    next();
}

app.get("/",(req,res)=>{
    res.status(200).render("index");
});

app.post("/calc",calculate,(req,res)=>{
    res.status(200).render("index",{res:result});
});

app.listen(port,()=>{
    console.log(`Server is running on port :${port}`);
})