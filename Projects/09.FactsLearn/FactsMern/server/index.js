import express from 'express';
import startServer from './connection/serverConnection.js';
import { PORT,MONGO_URI } from './constants/constants.js';
import CORS from './middleware/cors.js';
import jsonParser from './middleware/json.js';

//routes

import factsRoutes from './routes/facts.routes.js';


//main app logic 
const app=express();
const port=PORT;
// console.log(CORS);
// console.log(jsonParser);

//mounting middlwares and routes
app.use(CORS);
app.use(jsonParser);


//testing routes
app.use("/api",factsRoutes);
app.get("/test",(req,res)=>{
    res.send("Hello World");
});


//starting server 
startServer(MONGO_URI,app,port);