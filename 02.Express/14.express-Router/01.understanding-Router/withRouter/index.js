import express from "express";
import {body,query,validationResult,matchedData,checkSchema} from "express-validator";
import userRouter  from "./routes/user_route.js";
import productRouter from "./routes/productRoute.js";
const app=express();
const port=3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));//req.body will be parse here and then will be send to the router
app.use(userRouter);
app.use(productRouter);


app.listen(port,()=>{
    console.log("Server is running");
});