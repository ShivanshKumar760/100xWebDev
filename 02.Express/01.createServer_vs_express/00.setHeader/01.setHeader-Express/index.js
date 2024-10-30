import express from "express";

const app=express()

app.get("/",(req,res)=>{
    //instead of res.writeHead in express we use 
    //res.set()
    res.set("Content-type","text/plain");
    res.send("<h1>Hello World</h1>")

})

app.listen(3000,()=>{
    console.log("Server is running");
})