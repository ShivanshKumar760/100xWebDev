import express from "express";
import taskRouter from "./routes/task_route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import notFound from "./middleware/not-found.js";
dotenv.config();
const app=express();
const port=process.env.PORT||4000;
app.use(express.static("./public"))
app.use(express.json());
app.use("/",taskRouter);

app.use(notFound);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on ${port}!`);
    })
}).catch((err)=>{
    console.log(err);
    console.log("Sorry Couldnt connect with mongo atlas");
})