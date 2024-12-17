import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/authRoute.js";
import {fileURLToPath} from "url";
import path, { dirname } from "path";
import { requireAuth } from "./middleware/authChecker.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port=process.env.PORT||3001;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use("/",router);
// view engine
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth,(req,res)=>{
  res.render("smoothies");
});

mongoose.connect(process.env.MONGO_URL)
  .then((result) => {
    console.log("Connected to database");
    console.log(result);
    app.listen(port,()=>{console.log("Server is running")})
})
.catch((err) => console.log(err));

// app.listen(port,()=>{console.log("Server is running")})