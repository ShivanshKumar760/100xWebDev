import express from "express";

const app=express();
const port=3000;


app.get("/",function(req,res){
    res.json({msg:"Welcome !"});
});

app.listen(port,()=>{
    console.log("Server is running!");
})