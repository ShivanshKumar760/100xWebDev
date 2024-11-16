import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
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
const __dirname__=dirname(filename);
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.status(200).sendFile("index.html",{root:__dirname__});
});

app.post("/",caluclate,(req,res)=>{
    console.log(req.body);
   res.send(`<h1>${result}</h1>`);
});

app.listen(port);