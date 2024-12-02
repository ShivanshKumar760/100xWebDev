import express from "express";
import "express-async-errors";
import productsCollection from "./models/productSchema.js";
import mongooseInstance from "./db/mongoose.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";
import productRouter from "./routes/productsRoute.js";
import startServer from "./start/startServer.js";

const app=express();


app.use(express.json());
//Routes
app.get("/",async(req,res)=>{
    const result=await productsCollection.find();
    res.send(result);
})
//Product routes
app.use("/api/v1/products",productRouter);

//Error Handler
app.use(errorHandlerMiddleware);
app.use(notFound);

startServer(mongooseInstance,app);