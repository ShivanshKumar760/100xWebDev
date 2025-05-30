import express from "express";
import {body,query,validationResult,matchedData,checkSchema} from "express-validator";
import userRouter  from "./routes/user_route.js";
import productRouter from "./routes/productRoute.js";
import cookieParser from "cookie-parser"
import {dirname} from "path";
import { fileURLToPath } from "url";
const app=express();
const port=3000;
const __filenaeme=fileURLToPath(import.meta.url);
const __dirname=dirname(__filenaeme)
app.use(express.json());
app.use(express.urlencoded({extended:true}));//req.body will be parse here and then will be send to the router
app.use(cookieParser());
app.use(userRouter);
app.use(productRouter);

app.get("/",(req,res)=>{
    console.log(req.cookies);
    if(Object.keys(req.cookies).length!=0)
    {
       return res.status(200).send("User in");   
    }
    else{
        res.status(200).sendFile("./public/form.html",{root:__dirname});
    }
 
});

app.post("/",(req,res)=>{
    const{body:{name}}=req;
    res.cookie("name",name,{maxAge:60000});
    res.status(301).redirect("/");

});


app.get("/deleteUserInstance",(req,res)=>{
    res.clearCookie('name');
    res.redirect("/");
})

app.listen(port,()=>{
    console.log("Server is running");

});
