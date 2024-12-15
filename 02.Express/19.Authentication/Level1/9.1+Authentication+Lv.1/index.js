import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import mongoose from "mongoose";
import userCollection from "./collections/userCollections.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//Routing 
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const {body:{username,password}}=req;
  const newUser=new userCollection({
    email:username,
    password:password
  });

  userCollection.create(newUser)
  .then(()=>{
    //if they are registered then they can see the secrets page
    res.render("secrets.ejs");
  }).catch((err)=>{
    console.log(err);
    res.send("Sorry cannot create the user");
  });
});

app.post("/login", async (req, res) => {
  const {body:{username:email,password}}=req;//username get's assigned to email variable
  console.log(email);
  // userCollection.findOne({email:email}).then((result)=>{
  //   console.log(result);
  // })

  //or :

  userCollection.findOne({email}).then((result)=>{
    console.log(result);
    if(result)
    {
      if(result.password===password)
      {
        return res.render("secrets.ejs");
      }
      else{
        return res.send("Password is not valid!");
      }
    }
    else{
      return res.send("No user found!");
    }
  }).catch((err)=>{
    console.log(err);
    res.send("Cannot find user");
  });


});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("Connected to Database!");
}).then(()=>{
  app.listen(port, () => {
  console.log(`Server running on port ${port}`)});
}).catch((err)=>{
  console.log("Server crashed!");
});
