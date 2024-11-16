import express from "express";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
const app=express();
const port=3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.status(200).render("index");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
