import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app=express();
const port=process.env.PORT||4000;

mongoose.connect(process.env.MONGO_URL).then(()=>{
   console.log("Connected to atlas db");
}).then(()=>{app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})}).catch((error)=>{
    console.log(error);
    console.log("Sorry could not connect to the atlas-db");
});
