import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
//importing routes file :
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

dotenv.config();

const app=express();
const port=process.env.PORT||3001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());//cors is mounted for icomming request from different url
app.use(cookieParser());
//using routing files to route
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// app.get("/",(req,res)=>{
//     res.send("helo");
// })
//error handling middleware:
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to DB");
}).then(()=>{
    app.listen(port,()=>{
        console.log("Server is running!");
    });
}).catch((err)=>{
    console.log("Error");
    console.log("Sorry Couldn't connect to db");
});
