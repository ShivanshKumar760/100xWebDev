import express from "express";
const app=express();
const port=3000;

function httpReq_Res(req,res){
    res.send("Hello World");
}
app.get("/",httpReq_Res);

app.listen(port,()=>{
    console.log(`The express server is running on ${port}`);
});
