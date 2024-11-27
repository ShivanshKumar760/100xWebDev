import express from "express";
import bodyParser from "body-parser";
import posts from "./data/db.js";
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";
import methodOverride from "method-override";
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

// GET all posts
app.get("/api/get/posts", (req, res) => {
  console.log(posts);
//   res.json(posts);
    res.status(200).render("index",{posts:posts});
});

// GET a specific post by id
app.get("/api/get/post/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
//   res.json(post);
    res.status(200).render("index",{posts:post});
});
app.get("/api/createPosts",(req,res)=>{
    res.render("add");
});

app.get("/api/patchPost/:id",(req,res)=>{
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.render("modify",{post:post});
})
// POST a new post
app.post("/api/createPosts", (req, res) => {
  const newId = posts[posts.length-1].id+1
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  posts.push(post);
//   res.status(201).json(post);
  res.status(201).json({msg:"Created"}).redirect("/api/get/posts");
});

// PATCH a post when you just want to update one parameter
app.patch("/api/patchPost/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

//   res.json(post);
    res.redirect("/api/get/posts");
});

// DELETE a specific post by providing the post id
app.delete("/api/deletePosts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
//   res.json({ message: "Post deleted" });
    res.redirect("/api/get/posts");
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
