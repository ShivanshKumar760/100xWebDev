import express from "express";
const app=express();
app.get("/",(req,res)=>{
    res.status(200).send("<h1>Welcome to page");
})

app.get("/user",(req,res)=>{
    const {query:{name,age}}=req;
    res.status(200).json({name,age});
})

app.listen(3000,()=>{
    console.log("Server is running");
})