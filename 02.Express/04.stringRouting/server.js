import express from "express";
const app=express();
const port=3000;

app.get("/",(req,res)=>{
    res.status(200).send(`<h1>Welcome to Home page you are on route / </h>`);
});

//1.This route path will match acd and abcd.
app.get('/ab?cd', (req, res) => {
    res.send('ab?cd')
})

// 2.This route path will match abcd, abbcd, abbbcd, and so on.
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})

//3.This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})

// 4.This route path will match /abe and /abcde.
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});

