import express from "express";
const app=express();
const port=3000;

app.get("/",(req,res)=>{
    console.log(req.url);
    res.status(200).send("<h1>Welcome to the Page");
});

// 1.this route path will match anything with an a in it.
app.get(/a/, (req, res) => {
  res.send('/a/');
});

//2.This route path will match anything that ends with fly 
//butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/');
});

app.listen(port,()=>{
    console.log(`Server is running on port:${3000}`);
});
