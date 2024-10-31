import express from "express";
const app=express();
const port=3000;

app.get("/",(req,res)=>{
    res.status(200).send("Hello Welcome to page");
});

app.post("/testPost",(req,res)=>{
    //now since post ,put,delete,path cannot be sent through browser 
    //and they are sent usng a event handler in js or from 
    //here since we are not doing any processing of data or apply-ing any 
    //functionality on received data we will use simple api tool to send post req
    res.json({msg:"post request received from api-tool"});
});

app.listen(3000,()=>{
    console.log("Server is running");
})