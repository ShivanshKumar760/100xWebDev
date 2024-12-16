import dotenv from "dotenv";
import { CustomAPIError } from "../errors/custom-error.js";
import jwt from "jsonwebtoken";
dotenv.config();
const login=async (req,res)=>{
    //in real world application both login and register route will be different but for 
    //simplicity sake let's say for now they both are same 
    const{username,password}=req.body;
    //validating username and password in controller :
    if(!username||!password)
    {
        throw new CustomAPIError("Please provide username and password",400);
    }
    console.log(username,password);
    //Noramlly id is provided by database but here since we are not connecting to db
    //we will provide demo:
    const id=new Date().getDate();

    //the smaller the payload the better for the user 
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:"30d"});
    // res.send("Login/Register Route!");
    res.status(200).json({msg:"user created",token});
};

const dashboard=async (req,res)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        throw new CustomAPIError("No token provided",401);
    }
    const extracted_token=authHeader.split(" ")[1];
    const token=extracted_token;
    console.log(token);
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        const luckyNumber=Math.floor(Math.random()*100);
        res.status(200).json({
            msg:`Hello,${decoded.username}`,
            secret:`Here is Your authorised data,your lucky number is :${luckyNumber}`
        })
    } catch (error) {
        throw new CustomAPIError("Not authorized to access data!",401);
    }
};

export {login,dashboard};