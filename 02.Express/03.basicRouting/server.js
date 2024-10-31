import express from "express";
const app=express();
const port=3000;

app.get("/",(req,res)=>{
    res.status(200).send(`<h1>Welcome to Home page you are on route / </h><br>
    <h2>If you want to explore server our server provide  different route us</h2>
    <br>
    <ul>
        <li>/about</li>
        <li>/server-protocol</li>
    </ul>`);
});

app.get("/about",(req,res)=>{
    res.status(200).write("This is a demo server to showcase basic routing");
    res.end();
});

app.get("/server-protocol",(req,res)=>{
    res.status(200).write("This server is accessible using http protocol")
    res.end();
});

app.listen(port,()=>{
    console.log(`Server is running on port:${port}`);
});

