import express from "express";
const app=express();

//Now express although is based on http module
//it does not provide recursive call back which call itself every time a new endpoint is hit
//so unlike createServer we can wrap different route in one function 
//so express let us define multiple route with route handler methods

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/about",(req,res)=>{
    // express unlike createServer which do not support res.send()
    //express() support res.write()
    res.write("Welcome to the about section of the website");
    res.write("This is a testing page");
    res.end();
})

app.get("/contact",(req,res)=>{
    res.write("Phone Number");
    res.write("1234567890");
    res.end();
})

app.listen(3000,()=>{
    console.log("Express server running");
})