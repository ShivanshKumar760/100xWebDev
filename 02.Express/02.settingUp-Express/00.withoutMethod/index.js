import express from "express";
const app=express();
const port=3000;

app.listen(port,()=>{
    console.log(`The express server is running on ${port}`);
});

//Now this is very simple http serve that we have set up now if from our browser we will
//try to hit or send a request to localhost:3000 our server will respond with a default
//message cannot GET/ this is because our server by default request to this "/" endpoint 
//which means home page and Browser send GET request only so when it send a get request 
//to localhost:3000/ our server do not have any route handler bind which binds the 
//method ans route or endpoint 