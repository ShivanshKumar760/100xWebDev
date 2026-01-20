import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import projectRoute from "./routes/project.js";
dotenv.config();

const app = express();
const port=process.env.PORT;



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', userRoute);
app.use('/', projectRoute);




mongoose.connect(process.env.MONGO_URL_LOCAL)
.then(()=>{
  console.log("Connected To MongoDB Server!")
})
.then(()=>{
  app.listen(port,()=>{
  console.log(`Server is running on port:${port}`);
  })
  
}).catch((err)=>{
  console.log(err);
  console.log("Oops sorry could not connected to the database or server crashed")
})