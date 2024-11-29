import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import methodOverride from "method-override";
import blogRouter from "./routes/blogs.js";

const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));



app.get('/', (req, res) => {//working
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use(blogRouter);
  
  // 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});



mongoose.connect("mongodb://localhost:27017/blogDB").then(function()
{
  app.listen(port,()=>{
    console.log("Server is running");
  });
}).catch((err)=>{console.log("Couldn't connect with mongodb try again!")});