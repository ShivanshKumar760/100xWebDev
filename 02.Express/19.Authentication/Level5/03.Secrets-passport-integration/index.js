import express from "express";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import mongoose from "mongoose";
import userCollection from "./collections/userCollections.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import "./strategies/localStrategy.js";
import MongoStore from "connect-mongo";

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
app.use(session({
  secret:process.env.SESSION_SECRET,
  saveUninitialized:false,
  resave:true,
  cookie:{
      secure:false,//if set true can only be used over http and not https
      maxAge:60000*60//1 hr
  },
  store:MongoStore.create({
      // client:mongoose.connection.getClient()
      mongoUrl:process.env.MONGO_URL
  })
}));

app.use(passport.initialize());
app.use(passport.session());

//Routing 
app.get("/", (req, res) => {
  let flag;
  if(req.user)
  {
    flag=true;
  }
  else{
    flag=false;
  }
  res.render("home.ejs",{flag:flag});
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets",(req,res)=>{
  if(req.isAuthenticated())
  {
    userCollection.find({"secret":{$ne:null}}).then((foundUser)=>{
      return res.render("secrets.ejs",{userWith_Secret:foundUser});
    })
    
  }
  else{
    return res.redirect("/login");
  }
})
app.get("/submit",(req,res)=>{
  if(req.isAuthenticated())
  {
    return res.render("submit.ejs");
  }
  else{
    return res.redirect("/login");
  }
});
app.post("/register", async (req, res) => {
  const {body:{username,password}}=req;
  bcrypt.hash(password,saltRounds)
  .then((hashPassword)=>{
    const newUser=new userCollection({
      email:username,
      password:hashPassword
    });
    userCollection.create(newUser)
    .then(()=>{
      //if they are registered then they can see the secrets page
      res.redirect("/login");
    }).catch((err)=>{
      console.log(err);
      res.send("Sorry cannot create the user");
    });
  })
  
  
});

app.post("/login",passport.authenticate("local"),(req, res) => {
  console.log("Inside Login Route For authentication!");
  if(req.user){//if authenticated!
    return res.redirect("/secrets")
  }
  else{
    return res.status(401).send("Un-authorised!");
  }
});

app.post("/submit",(req,res)=>{
  const {body:{secret}}=req;
  userCollection.findById(req.user.id)
  .then((resultedUser)=>{
    resultedUser.secret=secret;
    resultedUser.save().then(()=>{
      res.redirect("/secrets");
    }).catch((err)=>{
      console.log(err);
      res.send("Cannot save the changes  done to user!");
    })
  }).catch((err)=>{
    console.log(err);
    res.send("Cannot find the user with the id!");
  })
});

app.post("/logout",(req,res)=>{
  req.logOut(()=>{
    console.log("Logged out!");
  });
  res.redirect("/");
})

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