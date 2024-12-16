import express from "express";
import {body,query,validationResult,matchedData,checkSchema} from "express-validator";
import userRouter  from "./routes/user_route.js";
import productRouter from "./routes/productRoute.js";
import cookieParser from "cookie-parser"
import {dirname} from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import mongoose from "mongoose";
import userSchema from "./Schemas/UserSchema.js";
import userCollection from "./collections/userCollection.js";
import "./strategies/localStrategy.js";
import passport from "passport";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();
const app=express();
const port=process.env.PORT||3001;

const __filenaeme=fileURLToPath(import.meta.url);
const __dirname=dirname(__filenaeme)
app.use(express.json());
app.use(express.urlencoded({extended:true}));//req.body will be parse here and then will be send to the router
app.use(cookieParser());



app.use(session({
    secret:"This is a secret key to decode session",
    saveUninitialized:false,
    resave:true,
    cookie:{
        secure:false,//if set true can only be used over http and not https
        maxAge:60000*60//1 hr
    },
    // store:MongoStore.create({
    //     // client:mongoose.connection.getClient()
    //     mongoUrl:process.env.MONGO_URL
    // })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(userRouter);
app.use(productRouter);

app.get("/",(req,res)=>{
    // console.log(req.cookies);
    // if(Object.keys(req.cookies).length!=0)
    if(req.user)//this will show that user is logged in or not 
    {
        console.log(req);
        // req.session.visited="true";
        // req.session.token="route:/";
        console.log("This is the session object in request header:",req.session);
        console.log("Session id is :",req.sessionID);
        console.log("This is the user object:",req.user)
       return res.status(200).send("User in");
       
    }
    else{
        res.status(200).sendFile("./public/form.html",{root:__dirname});
    }
 
});

app.post("/",passport.authenticate("local"),(req,res)=>{
    console.log("Inside post route")
    if(req.user)
    {
        console.log("Sending Success Response to the client ...");
        return res.status(200).send(req.user);
    }
    console.log("Sending un-succesful response to client!");
    return res.status(401).send("Not Authenticated");
    
});

app.get("/failauth",(req,res)=>{
    // console.log(req.session);

    res.send("Authentication Failed re-check email and password!");
})


app.get("/deleteUserInstance",(req,res)=>{
    res.clearCookie('name');
    res.redirect("/");
})



// const me={firstname:"Shivansh"};
// const {firstname:name}=me
// console.log(name);

// app.listen(port,()=>{
//     console.log("Server is running");

// });

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected!");
    console.log("Connecting to server...");
}).then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    
    });
});