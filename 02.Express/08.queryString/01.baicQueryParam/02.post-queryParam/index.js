import express from "express";
const app=express();
const db=[]
app.get("/",(req,res)=>{
    res.status(200).send("<h1>Welcome to page");
})

app.get("/user",(req,res)=>{
    const {query:{name,age}}=req;
    res.status(200).json({name,age});
})

app.post("/postUser",(req,res)=>{
    //we cant use browser to send this query request cause browser will send get request 
    //only we will use api-tool
    const {query:{name,age}}=req;
    db.push({name,age});
    res.send("Created");
})

app.get("/getUser",(req,res)=>{
    res.status(200).json(db);
})

app.listen(3000,()=>{
    console.log("Server is running");
})