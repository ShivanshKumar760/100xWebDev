import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import mongoose from "mongoose";
import userCollection from "./collections/userCollections.js";
import dotenv from "dotenv";
// import md5 from "md5";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();
const port = 3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
const saltRounds=10;
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
  // const hashPassword=md5(password);
  bcrypt.hash(password,saltRounds)
  .then((hashPassword)=>{
    const newUser=new userCollection({
      email:username,
      password:hashPassword
    });
    userCollection.create(newUser)
    .then(()=>{
      //if they are registered then they can see the secrets page
      res.render("secrets.ejs");
    }).catch((err)=>{
      console.log(err);
      res.send("Sorry cannot create the user");
    });
  })
  
  
});

app.post("/login", async (req, res) => {
  const {body:{username:email,password}}=req;//username get's assigned to email variable
  console.log(email);
  // userCollection.findOne({email:email}).then((result)=>{
  //   console.log(result);
  // })

  //or :
  // const hashPass_log=md5(password);
  userCollection.findOne({email}).then((foundUser)=>{
    console.log(foundUser);
    if(foundUser)
    {
      bcrypt.compare(password,foundUser.password)
      .then((result)=>{
        console.log(result);
        if(result)
        {
          return res.render("secrets.ejs");
        }
      })
    }
    else{
      return res.send("No user found!");
    }
  }).catch((err)=>{//this will work when there is a problem in db
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


// console.log(typeof process.env.MONGO_ENCRYPT_SECRET);