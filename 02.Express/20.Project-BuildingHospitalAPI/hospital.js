import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import users from "./database/db.js";
import home from "./routes/home.js";


const app=express();
const port=3000;
app.use(bodyParser.urlencoded({extended:true}));//can accept application/json, application/x-www-form-urlencoded, and multipart/form-data
app.use(home);
app.use(userRouter);

app.listen(port,()=>{
    console.log(`Server is running on port :${port}`);
});