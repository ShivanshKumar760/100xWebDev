import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import userCollection from "./models/userCollection.js";
import messageCollection from "./models/messageCollection.js";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/users",async (req,res)=>{
    console.log("Aggregate Pipeline in Process");
    const userIds=JSON.parse(req.query.userIds);
    console.log(userIds);
    const pipeline =
    [
        {
            '$match': {
                'user_id': {
                    '$in': userIds
                }
            }
        }
    ]
try {
   const foundUsers=await userCollection.aggregate(pipeline);
   console.log("Aggregate pipeline found user are:",foundUsers);
   res.send(foundUsers);
} catch (error) {
    console.log(error);
    }
});
app.post("/signup",async (req,res)=>{
    const saltRound=10;
    const {email,password}=req.body;
    const generatedUserId=uuidv4();
    if(typeof password==="number")
    {
       password=password.toString();
    }   
    // console.log(typeof password);
    const hashedPassword=await bcrypt.hash(password,saltRound);
    // console.log(hashedPassword);
    // console.log(typeof hashedPassword);
    try {
        const existingUser=await userCollection.findOne({email});
        if(existingUser)
        {
            return res.status(409).send("User already Exist,Please Login");
        }
        const sanitizedEmail=email.toLowerCase();
        const data={
            user_id:generatedUserId,
            email:sanitizedEmail,
            hashed_password:hashedPassword
        };
        const newUser=new userCollection(data);
        const insertUser=await userCollection.create(newUser);
        console.log("Inserted Data is :",insertUser);
        const payload={insertUser,sanitizedEmail};
        const maxAge = 3 * 24 * 60 * 60;
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:maxAge
        });
        res.status(201).json({token, userId: generatedUserId,email:sanitizedEmail});


    } catch (error) {
        console.log(error);
    }
    
});


app.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try{
        const result=await userCollection.findOne({email});
        let comparePass_Result
        if (result)
        {
            comparePass_Result=await bcrypt.compare(password,result.hashed_password);
            console.log(comparePass_Result);
        }
        let user=result;
        if(user && comparePass_Result)
        {
            const payload={user,email};
            const maxAge = 3 * 24 * 60 * 60;
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:maxAge
            });
            return res.status(201).json({token,userId:user.user_id,email});
        }
        res.status(400).send("Invalid Credentials");
    }catch(err){
        console.log(err);
    }
});

app.get("/user",async (req,res)=>{
    const userId=req.query.userId;
    console.log("Received user id is :",userId);
    try{
        const query={user_id:userId};
        const user=await userCollection.findOne(query);
        res.send(user);
    }catch(err)
    {
        console.log(err);
    }

})
app.patch("/user",async (req,res)=>{
    const formData=req.body.formData;
    console.log("This is patch method !");
    console.log(formData);
    try {
        const query={user_id:formData.user_id};
        const updateDocument = {
            $set: {
                first_name: formData.first_name,
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity: formData.gender_identity,
                gender_interest: formData.gender_interest,
                url: formData.url,
                about: formData.about,
                matches: formData.matches
            },
        }
        const updatedUser=await userCollection.updateOne(query,updateDocument);
        res.send(updatedUser);
    } catch (error) {
        console.log(error);
    }
});

app.get("/gendered-users",async (req,res)=>{
    const {gender}=req.query;
    console.log("Gender interest is :",gender);
    try {
        const query={gender_identity:{$eq:gender}};
        const foundUser=await userCollection.find(query);
        console.log("This the found users that belong to this gender:",foundUser);
        res.send(foundUser);
    } catch (error) {
        console.log(error);
    }

});

app.patch("/addMatch",async (req,res)=>{
    console.log("Request comming to add match");
    const {userId,matchedUserId}=req.body;
    console.log(userId,matchedUserId);
    try {
        const query={user_id:userId};
        const patchedDocument={
            $push:{matches:{user_id:matchedUserId}}
        };

        const user=await userCollection.updateOne(query,patchedDocument);
        console.log(user);
        res.send(user);
    } catch (error) {
        console.log(error);
    }

});


app.get("/messages",async (req,res)=>{
    const {userId, correspondingUserId} = req.query
    try{
        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }
        const foundMessages=await messageCollection.find(query);
        console.log("Found messages are :",foundMessages);
        res.send(foundMessages);
    }catch(error){
        console.log(error);
    }
});

app.post("/message",async (req,res)=>{
    const message=req.body.message;
    try {
        const newMessage=new messageCollection(message);
        const result=await messageCollection.create(newMessage);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database connected!");
}).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is Running on Port:${process.env.PORT}`);
    });
}).catch((err)=>{
    console.log(err);
    console.log("Sorry Connection Failed ,restart the Server")
});