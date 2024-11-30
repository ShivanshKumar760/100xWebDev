import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";
import methodOverride from "method-override";
import mongoose from "mongoose";
const app = express();
const port = 3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename)
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

const blogSchema= new mongoose.Schema({
  title:String,
  content:String,
  author:String,
  createdAt:{type:Date,default:Date.now}
});

const blogCollection=mongoose.model("Blogs",blogSchema);
// GET all posts
app.get("/api/get/posts", (req, res) => {
  blogCollection.find().then((posts)=>{
    res.status(200).render("index",{posts:posts});
  }).catch((err)=>{
    console.log(err);
    res.status(400).json({errorMessage:"Cannot fetch data from server !"});
  });
    
});

// GET a specific post by id
app.get("/api/get/post/:_id", (req, res) => {
    const {params:{_id}}=req;
    blogCollection.findById(_id).then((post)=>{
      res.status(200).render("index",{posts:post});
    }).catch((err)=>{
      console.log(err);
      res.status(400).json({errorMessage:"Cannot fetch blog-post from server !"});
    });
    
});
app.get("/api/createPosts",(req,res)=>{
    res.render("add");
});

app.get("/api/patchPost/:_id",(req,res)=>{
    const {params:{_id}}=req;
    let post;
    blogCollection.findById(_id).then((postItem)=>{
      post=postItem
      res.render("modify",{post:post});
    }).catch((err)=>{
      console.log(err);
      res.status(400).json({errorMessage:"Cannot fetch blog-post from server !"});
    });
})
// POST a new post
app.post("/api/createPosts", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: new Date(),
  };
  const newPost=new blogCollection(post);
  blogCollection.create(newPost).then(()=>{
    res.redirect("/api/get/posts");
  }).catch((err)=>{
    console.log(err);
      res.status(401).json({errorMessage:"Cannot create blog-post!"});
  });
});

// PATCH a post when you just want to update one parameter
app.patch("/api/patchPost/:_id", (req, res) => {
  const {params:{_id}}=req;
  const {body}=req;
  blogCollection.findByIdAndUpdate(_id,{$set:body},{new:true})
   .then(function(fixArticle)
   {
    // res.status(201).json(fixArticle);
    res.redirect("/api/get/posts");
   }).catch((err)=>{
        res.json({errorMsg:err});
    });
});

// DELETE a specific post by providing the post id
app.delete("/api/deletePosts/:_id", (req, res) => {
    const {params:{_id}}=req;
    blogCollection.findByIdAndDelete(_id).then(()=>{
      res.redirect("/api/get/posts");
    }).catch((err)=>{
      res.json({errorMsg:err});
    });
    
});


mongoose.connect("mongodb://localhost:27017/blogDB").then(function()
    {
        app.listen(port,()=>{
            console.log("Server is running");
        });
}).catch((err)=>{console.log("Couldn't connect with mongodb try again!")});