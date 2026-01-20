import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const saltRound=10;
const secret=process.env.SECRET;

const signUpController=async (req,res)=>{
    console.log("sign up request comming in");
    const {body:{username,name,email,password}}=req;
    console.log(req.body);
    const emailExist=await userModel.findOne({email:email});
    if(emailExist){
        console.log("Email already exists");
        return res.json({ success: false, message: "Email already exists" });
    }
    else{
        console.log("Email does not exist creating new account..");
        const hashPassword=bcrypt.hashSync(password,saltRound);
        const newUser=new userModel({...req.body,password:hashPassword});
        await userModel.create(newUser);
        return res.json({ success: true, message: "User created successfully" });
    }
};

const loginController=async (req,res)=>{
    console.log("Incomming Login request...");
    console.log(req.body);
    const {email, password } = req.body;
    console.log("The new user email is :",email);
    let user = await userModel.findOne({email:email});
    console.log("The new User info is:",user);
    if(user)
    {
        const matchPass=bcrypt.compareSync(password,user.password);
        if(matchPass)
        {
            let token = jwt.sign({ email: user.email, userId: user._id }, secret);
            return res.json({ success: true, message: "User logged in successfully", token: token, userId: user._id });
        }
        else{
            return res.json({ success: false, message: "Invalid email or password" });
        }
    }
    else{
        return res.json({ success: false, message: "User not found!" });
    }
};

const getUserDetailController=async (req,res)=>{
    const {userId}=req.body;
    let user = await userModel.findOne({ _id: userId });
    if (user) 
    {
        return res.json({ success: true, message: "User details fetched successfully", user: user });
    } 
    else {
        return res.json({ success: false, message: "User not found!" });
    }
};   

export {signUpController,loginController,getUserDetailController};