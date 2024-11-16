import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import bodyParser from 'body-parser'
const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    const data={
        title:"EJS tag",
        seconds:new Date().getSeconds(),
        items:["apple","banana","cherry"],
        htmlContent:"<em>This is some em text</em>"
    }

    res.status(200).render("index",{data:data});
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});